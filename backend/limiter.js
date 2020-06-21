module.exports = function() {

    const rateLimit = require('express-rate-limit')
    const slowDown = require('express-slow-down')

    return {

        // Articles

        articleSlower: slowDown({
            windowMs: 15 * 60 * 1000, // 15 minutes
            delayAfter: 100,
            delayMs: 500
        }),
        articleLimiter: rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 150,
            message: JSON.stringify({ message: 'Request limit reached', status: 2 })
        }),
        
        // Contact

        mailSlower: slowDown({
            windowMs: 5 * 60 * 1000, // 5 minutes
            delayAfter: 5,
            delayMs: 2000
        }),
        mailLimiter: rateLimit({
            windowMs: 5 * 60 * 1000, // 5 minutes
            max: 10,
            message: JSON.stringify({ message: 'Request limit reached', status: 2 })
        })
    }
}