module.exports = function(app, database) {

    const moment = require('moment')
    
    app.get('/artiklar', (request, response) => {

        database.all('SELECT * FROM articles')
            .then((articles) => {
                response.send(articles)
            })
    })
    
    app.get('/artiklar/:artikel', (request, response) => {
    
        database.all('SELECT * FROM articles WHERE articleId=?', [request.params.artikel])
            .then((articles) => {
                response.send(articles[0])
            })
    })
    
    app.post('/artiklar', (request, response) => {
    
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
}