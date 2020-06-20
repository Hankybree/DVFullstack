// Used for handling server and http-requests

const express = require('express')
const cors = require('cors')
const app = express()
const articles = require('./articles.js')

// Used for handling database

const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

// Used for generating tokens and dates

const { v4: uuidv4 } = require('uuid')

// Used for handling images

const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const fs = require('fs')

// Used for sending e-mails

const nodemailer = require('nodemailer')
const secret = require('./secret.js')

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.listen(5000, () => {
    console.log('Listening on port 5000')
})

const authenticate = function (token) {
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
const contactUs = function(subject, mailAddress, body, response) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: secret().mail,
            pass: secret().pw
        }
    })
    const mailOptions = {
        from: secret().mail,
        to: [secret().mail],
        subject: subject,
        text: mailAddress + '\n\n' + body 
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            response.send(JSON.stringify({ message: 'There was an error sending the message', status: 2 }))
        } else {
            response.send(JSON.stringify({ message: 'Message sent', status: 1 }))
        }
    })
}

var database

sqlite
    .open({ driver: sqlite3.Database, filename: 'database.sqlite'})
    .then((database_) => {
        database = database_

        articles(app, database)
    })

app.post('/kontakta', (request, response) => {
    contactUs(request.body.subject, request.body.mail, request.body.body, response)
})