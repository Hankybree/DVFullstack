const express = require('express')
const cors = require('cors')
const app = express()

const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

const { v4: uuidv4 } = require('uuid')

const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const fs = require('fs')

app.use(cors())

app.listen(5000, () => {
    console.log('Listening on port 5000')
})

