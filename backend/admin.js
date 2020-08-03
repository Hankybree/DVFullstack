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

                    if (request.body.articleType === 'article') {
                        imagePath = 'http://localhost:5000/' + request.file.path
                        ingress = request.body.articleIngress
                        body = request.body.articleBody
                    } else {
                        videoUrl = 'https://www.youtube.com/embed/' + request.body.articleVideo
                    }

                    database.run('INSERT INTO articles (articleType, articleImage, articleVideo, articleHeader, articleIngress, articleBody, articleAuthor, articleDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                        [
                            request.body.articleType,
                            imagePath,
                            videoUrl,
                            request.body.articleHeader,
                            ingress,
                            body,
                            request.body.articleAuthor,
                            moment().format('YYYY-MM-DD')
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

    app.patch('/artiklar/:id', (request, response) => {

    })

    app.delete('/artiklar/:id', (request, response) => {
        console.log('Called')
        authenticate(request.get('Token'))
            .then((user) => {
                if (user !== -1) {
                    database.all('SELECT * FROM articles WHERE articleId=?', [request.params.id])
                        .then((articles) => {

                            database.run('DELETE FROM articles WHERE articleId=?', [request.params.id])
                                .then(() => {

                                    if (articles[0].articleImage !== undefined && articles[0].articleImage !== null) {

                                        const imgUrl = articles[0].articleImage.replace('http://localhost:5000/', '')

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

                                database.run('INSERT INTO sessions (sessionUserId, sessionToken) VALUES (?, ?)',
                                    [
                                        userId,
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