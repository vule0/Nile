const express = require('express')

const router = express.Router()


module.exports = params => {
    router.get('/', async (req, res) => {
        // here we can mimic the database retrievals
    })

    router.post('/', async (req, res) => {
        // here we can mimic the database additions
    })
    
    return router
}
