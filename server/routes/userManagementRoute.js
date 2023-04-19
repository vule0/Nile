const express = require("express")
const { userQuery } = require("../utils/enum")
const router = express.Router()

module.exports = (params) => {
  const { userHandler } = params
  router.get("/", async (req, res) => {res.send('Nothing to show in this route...')})

  router.post("/", async (req, res) => {
    // open file
    const data = req.body
    const query = data.query
    console.log(data)
    userHandler.readDb().then((json) => {
    let response = {status: '-2',message: 'no corresponding query'}

    // here we can mimic the database additions/updates
    if (query === userQuery.getAllUsers) {
      response = userHandler.getAllUsers(json)
    } else if (query === userQuery.getByUserName) {
      response = userHandler.getByUserName(json, data.username)
    } else if (query === userQuery.filterByRating) {
      response = userHandler.filterByRating(json, data.descending, data.threshold)
    } else if (query === userQuery.filterByItemsSold) {
      response = userHandler.filterByItemsSold(json, data.descending, 100)
    } else if (query === userQuery.filterByVerified) {
      response = userHandler.filterByVerified(json, data.isVerified)
    } else if (query === userQuery.filterByName) {
      response = userHandler.filterByName(json, data.name)
    } else if (query === userQuery.insert) {
      response = userHandler.createUser(json, data.name, data.username, data.email, data.password)
    } else if (query === userQuery.updateRating) {
      response = userHandler.updateRating(json, data.username, data.rating)
    } else if (query === userQuery.updateVerified) {
      response = userHandler.updateVerified(json, data.username, data.isVerified)
    } else if (query === userQuery.updateEmail) {
      response = userHandler.updateEmail(json, data.username, data.email)
    } else if (query === userQuery.updateItemsSold) {
      response = userHandler.updateItemsSold(json, data.username, data.itemsSold)
    } else if (query === userQuery.deleteUser) {
      response = userHandler.deleteUser(json, data.username)
    } else if (query === userQuery.logIn){
      response = userHandler.logIn(json, data.username, data.password)
    } else if (query === userQuery.updatePassword){
      response = userHandler.updatePassword(json, data.username, data.password)
    } else if (query === userQuery.updateImageUrl){
      response = userHandler.updateImageUrl(json, data.username, data.imageurl)
    }

    


    // send response to the browser
    res.json(response)
  })
})
return router
}
