// Used for handling server and http-requests

const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')

const user = require('./user.js')
const admin = require('./admin.js')

// Used for handling database

const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

app.use(express.json())
app.use(cors())
app.use(helmet())

app.listen(5000, () => {
    console.log('Listening on port 5000')
})

var database

sqlite
    .open({ driver: sqlite3.Database, filename: 'database.sqlite'})
    .then((database_) => {
        database = database_

        user(app, database)
        admin(app, database)
    })