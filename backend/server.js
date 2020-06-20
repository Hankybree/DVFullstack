const express = require('express')
const cors = require('cors')
const app = express()

const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

const { v4: uuidv4 } = require('uuid')
const moment = require('moment')

const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const fs = require('fs')

app.use(cors())

app.listen(5000, () => {
    console.log('Listening on port 5000')
})

var database

sqlite
    .open({ driver: sqlite3.Database, filename: 'database.sqlite'})
    .then((database_) => {
        database = database_
    })

app.get('/artiklar', (request, response) => {

    database.all('SELECT * FROM artiklar')
        .then((articles) => {
            response.send(articles)
        })
})

app.post('/artiklar', (request, response) => {

    console.log(request.body)

    database.run('INSERT INTO artiklar (articleType, articleImage, articleVideo, articleHeader, articleIngress, articleBody, articleAuthor, articleDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [
        request.body.articleType,
        request.body.articleImage,
        request.body.articleVideo,
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