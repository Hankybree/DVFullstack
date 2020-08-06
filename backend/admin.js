module.exports = function (app, database) {

    const moment = require('moment')
    const { v4: uuidv4 } = require('uuid')

    // Used for handling images

    const multer = require('multer')
    const upload = multer({
        dest: 'uploads/',
        fileFilter: function (req, file, cb) {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return cb(new Error('Only image files are allowed!'));
            }
            cb(null, true);
        }
    })
    const fs = require('fs')

    app.post('/artiklar', upload.single('articleImage'), (request, response) => {

        authenticate(request.get('Token'))
            .then((user) => {
                if (user !== -1) {

                    let imagePath = null
                    let ingress = null
                    let body = null
                    let videoUrl = null

                    let articleAttributes = {}

                    if (request.body.articleType === 'article') {

                        if (request.file === undefined) {
                            response.send(JSON.stringify({ message: 'You must fill out the entire form', status: 3 }))
                            return
                        }

                        articleAttributes = {
                            articleHeader: request.body.articleHeader,
                            articleImage: request.file.path,
                            articleIngress: request.body.articleIngress,
                            articleBody: request.body.articleBody
                        }

                        imagePath = 'http://dagensvibe.se:5000' + request.file.path
                        ingress = request.body.articleIngress
                        body = request.body.articleBody
                    } else {

                        articleAttributes = {
                            articleHeader: request.body.articleHeader,
                            articleVideo: request.body.articleVideo
                        }

                        videoUrl = 'https://www.youtube.com/embed/' + request.body.articleVideo
                    }

                    for (let key in articleAttributes) {
                        if(articleAttributes[key] === null || articleAttributes[key] === '' || articleAttributes[key] === undefined) {
                            response.send(JSON.stringify({ message: 'You must fill out the entire form', status: 3 }))
                            return
                        }
                    }

                    database.run('INSERT INTO articles (articleType, articleImage, articleVideo, articleHeader, articleIngress, articleBody, articleAuthor, articleDate, articleUpdatedTime, articleUpdatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [
                            request.body.articleType,
                            imagePath,
                            videoUrl,
                            request.body.articleHeader,
                            ingress,
                            body,
                            request.body.articleAuthor,
                            moment().format('YYYY-MM-DD'),
                            null,
                            null
                        ]).then(() => {
                            response.status(201).send(JSON.stringify({ message: 'Article published', status: 1 }))
                        }).catch((error) => {
                            response.send(error)
                        })
                } else {
                    response.send(JSON.stringify({ message: 'Unauthorized', status: 2 }))
                }
            })
    })

    app.patch('/artiklar/:id', upload.single('articleImage'), (request, response) => {

        authenticate(request.get('Token'))
            .then((user) => {
                if (user !== -1) {
                    database.all('SELECT * FROM articles WHERE articleId=?', [request.params.id])
                        .then((articles) => {
                            let updatedArticle = {
                                articleUpdatedTime: moment().format('YYYY-MM-DD')
                            }
                    
                            if(request.file === undefined) {
                                request.body['articleImage'] = ''
                            } else {
                                if (articles[0].articleImage !== undefined && articles[0].articleImage !== null) {

                                    const imgUrl = articles[0].articleImage.replace('http://dagensvibe.se:5000', '')

                                    fs.unlink(imgUrl, () => {
                                        console.log('File deleted')
                                    })
                                }

                                request.body['articleImage'] = 'http://dagensvibe.se:5000' + request.file.path
                            }

                            let videoUrl = null

                            if (request.body['articleVideo']) {
                                videoUrl = 'https://www.youtube.com/embed/' + request.body.articleVideo
                            }
                    
                            for (let key in request.body) {
                                if (request.body[key] !== null && request.body[key] !== undefined && request.body[key] !== '') {
                                    updatedArticle[key] = request.body[key]
                                }
                            }
                    
                            const newArticle = Object.assign(articles[0], updatedArticle)

                            database.run('UPDATE articles SET articleImage=?, articleVideo=?, articleHeader=?, articleIngress=?, articleBody=?, articleUpdatedTime=?, articleUpdatedBy=? WHERE articleId=?', 
                            [
                                newArticle.articleImage,
                                videoUrl,
                                newArticle.articleHeader,
                                newArticle.articleIngress,
                                newArticle.articleBody,
                                newArticle.articleUpdatedTime,
                                newArticle.articleUpdatedBy,
                                request.params.id
                            ]).then(() => {
                                response.send(JSON.stringify({ message: 'Article updated', status: 1 }))
                            }).catch((error) => {
                                response.send(error)
                            })
                        })
                } else {
                    response.send(JSON.stringify({ message: 'Unauthorized', status: 2 }))
                }
            })
    })

    app.delete('/artiklar/:id', (request, response) => {
        
        authenticate(request.get('Token'))
            .then((user) => {
                if (user !== -1) {
                    database.all('SELECT * FROM articles WHERE articleId=?', [request.params.id])
                        .then((articles) => {

                            database.run('DELETE FROM articles WHERE articleId=?', [request.params.id])
                                .then(() => {

                                    if (articles[0].articleImage !== undefined && articles[0].articleImage !== null) {

                                        const imgUrl = articles[0].articleImage.replace('http://dagensvibe.se:5000', '')

                                        fs.unlink(imgUrl, () => {
                                            console.log('File deleted')
                                        })
                                    }

                                    response.send(JSON.stringify({ message: 'Article deleted', status: 1 }))

                                }).catch(error => {
                                    response.send(error)
                                })
                        })
                } else {
                    response.send(JSON.stringify({ message: 'Unauthorized', status: 2 }))
                }
            })
    })

    app.post('/login', (request, response) => {

        database.all('SELECT * FROM users WHERE userName=?', [request.body.userName])
            .then((users) => {

                if (users[0] === undefined) {
                    response.send(JSON.stringify({ message: 'Incorrect username or password', status: 2 }))
                    return
                }

                if (users[0].userPassword === request.body.userPassword) {

                    database.all('SELECT * FROM sessions WHERE sessionUserId=?', [users[0].userId])
                        .then((sessions) => {
                            if (sessions[0] === undefined) {

                                const token = uuidv4()
                                const userId = users[0].userId
                                const userName = users[0].userName

                                database.run('INSERT INTO sessions (sessionUserId, sessionUserName, sessionToken) VALUES (?, ?, ?)',
                                    [
                                        userId,
                                        userName,
                                        token
                                    ]).then(() => {
                                        response.send(JSON.stringify({ user: userId, token: token, message: 'Logged in', status: 1 }))
                                    })
                            } else {
                                response.send(JSON.stringify({ message: 'Already logged in', status: 3 }))
                            }
                        })
                } else {
                    response.send(JSON.stringify({ message: 'Incorrect username or password', status: 2 }))
                }
            })
    })

    app.delete('/logout', (request, response) => {

        if (request.get('Token')) {

            database.run('DELETE FROM sessions WHERE sessionToken=?', [request.get('Token')])
                .then(() => {
                    response.send(JSON.stringify({ message: 'Logged out', status: 1 }))
                })

        } else {
            response.send(JSON.stringify({ message: 'You are not logged in', status: 2 }))
        }
    })

    app.get('/session', (request, response) => {
        authenticate(request.get('Token'))
            .then((user) => {
                if (user !== -1) {
                    database.all('SELECT * FROM sessions WHERE sessionUserId=?', [user])
                        .then((sessions) => {
                            response.send(JSON.stringify({ userName: sessions[0].sessionUserName, status: 1 }))
                        })
                } else {
                    response.send(JSON.stringify({ message: 'Unauthorized', status: 2 }))
                }
            })
    })

    function authenticate(token) {
        return new Promise((resolve, reject) => {
            if (token) {

                database.all('SELECT * FROM sessions WHERE sessionToken=?', [token])
                    .then((sessions) => {
                        if (!sessions[0]) {
                            resolve(-1)
                        } else {
                            resolve(sessions[0].sessionUserId)
                        }
                    })

            } else {

                resolve(-1)
            }
        })
    }
}