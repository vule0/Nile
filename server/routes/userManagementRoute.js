const express = require('express')

const router = express.Router()

const util = require("util")

const UserHandler = require('../data/datahandler/userHandler')

module.exports = params => {
    const {userHandler} = params

    console.log(userHandler)
     router.get('/', async (req, res) => {
        // here we can mimic the database retrievals
        userHandler.readDb()
        .then((json) => {
            const data = userHandler.getByUserName(json, 'oanderson')
            res.json({user: data})
        })

       
        
        
        
    })

    router.post('/', async (req, res) => {
        // here we can mimic the database additions
    })
    
    return router
}