const express = require("express")
const { messageQuery } = require("../utils/enum")
const router = express.Router()

module.exports = (params) => {
  const { messageHandler } = params
  router.get("/", async (req, res) => {})

  router.post("/", async (req, res) => {
    const data = req.body // object containing user information
    const query = data.query // browser provides which query to perform
    // console.log(data)
    // console.log(query)
    // open file
    if (query !== undefined)
      messageHandler.readDb().then((json) => {
        let response = { status: "-2", message: "no corresponding query" }

        // here we can mimic the database additions/updates
        if (query === messageQuery.getByOtherParty) {
          response = messageHandler.getByOtherParty(json, data.otherParty)
        } else if (query === messageQuery.createMessage) {
          response = messageHandler.createMessage(json, data.text, data.date, data.self, data.name, data.username, data.rating)
        } 
        else if (query === messageQuery.getOtherParties) {
          response = messageHandler.getOtherParties(json)
        } 

        // send response to the browser
        console.log(response)
        res.json(response)
      })
    else res.end()
  })

  return router
}
