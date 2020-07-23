module.exports = function (app, database) {

    const moment = require('moment')
    const { v4: uuidv4 } = require('uuid')

    // Used for handling images

    const multer = require('multer')
    const upload = multer({ dest: 'uploads/' })
    const fs = require('fs')
    app.use('/uploads', express.static('uploads'))

    app.post('/artiklar', upload.single('articleImage'), (request, response) => {

        let videoUrl = 'https://www.youtube.com/embed/' + request.body.articleVideo

        database.run('INSERT INTO articles (articleType, articleImage, articleVideo, articleHeader, articleIngress, articleBody, articleAuthor, articleDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                request.body.articleType,
                request.body.articleImage,
                videoUrl,
                request.body.articleHeader,
                request.body.articleIngress,
                request.body.articleBody,
                request.body.articleAuthor,
                moment().format('YYYY-MM-DD')
            ]).then(() => {
                response.status(201).send({ message: 'Created', status: 1 })
            }).catch((error) => {
                response.send(error)
            })
    })

    app.patch('/artiklar/:id', (request, response) => {

    })

    app.delete('artiklar/:id', (request, response) => {

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