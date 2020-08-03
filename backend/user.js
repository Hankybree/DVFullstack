module.exports = function(app, database) {

    const nodemailer = require('nodemailer')
    const secret = require('./secret.js')

    const limiter = require('./limiter.js')

    app.use('/artiklar', limiter().articleLimiter, limiter().articleSlower)
    app.use('/kontakta', limiter().mailLimiter, limiter().mailSlower)
    
    app.get('/artiklar', (request, response) => {
        
        database.all('SELECT * FROM articles')
            .then((articles) => {
                response.send(articles)
            })
    })
    
    app.get('/artiklar/:id', (request, response) => {
    
        database.all('SELECT * FROM articles WHERE articleId=?', [request.params.id])
            .then((articles) => {
                response.send(articles[0])
            })
    })

    app.post('/kontakta', (request, response) => {
        contactUs(request.body.subject, request.body.mail, request.body.body, response)
    })

    function contactUs(subject, mailAddress, body, response) {
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
                response.send(JSON.stringify({ message: 'Fel uppstod. Meddelande är ej skickat', status: 2 }))
            } else {
                response.send(JSON.stringify({ message: 'Meddelande skickat', status: 1 }))
            }
        })
    }
}