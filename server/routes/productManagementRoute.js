const express = require("express")
const { productQuery } = require("../utils/enum")
const router = express.Router()

module.exports = (params) => {
  const { productHandler } = params
  router.get("/", async (req, res) => {})

  router.post("/", async (req, res) => {
    const data = req.body // object containing user information
    const query = data.query // browser provides which query to perform
    // const query = undefined
    console.log(data)
    // open file
    if (query !== undefined)
      productHandler.readDb().then((json) => {
        let response = { status: "-2", message: "no corresponding query" }

        // here we can mimic the database additions/updates
        if (query === productQuery.getAllProducts) {
          response = productHandler.getAllProducts(json)
        } else if (query === productQuery.getByUserName) {
          response = productHandler.getByUserName(json, data.username)
        } else if (query === productQuery.getRecommended) {
          response = productHandler.getRecommended(json)
        } else if (query === productQuery.filterByVerified) {
          response = productHandler.filterByVerified(json, data.isVerified)
        } else if (query === productQuery.updatePrice) {
          response = productHandler.updatePrice(json, data.id, data.price)
        } else if (query === productQuery.updateCategory) {
          response = productHandler.updateCategory(json, data.id, data.category)
        } else if (query === productQuery.deletePost) {
          response = productHandler.deletePost(json, data.id)
        } else if (query === productQuery.getByProductId) {
          response = productHandler.getByProductId(json, data.productId)
        } else if (query === productQuery.filterByCategory) {
          response = productHandler.filterByCategory(json, data.category)
        } else if (query === productQuery.filterByRating) {
          response = productHandler.filterByRating(
            json,
            data.descending,
            data.threshold
          )
        } else if (query === productQuery.updateCondition) {
          response = productHandler.updateCondition(
            json,
            data.id,
            data.condition
          )
        } else if (query === productQuery.insert) {
          response = productHandler.createProduct(
            json,
            data.id,
            data.productName,
            data.description,
            data.category,
            data.price,
            data.condition,
            data.name,
            data.username,
            data.rating,
            data.isVerified,
            data.imageurl
          )
        }

        // send response to the browser
        console.log(response)
        console.log('******************************************')
        res.json(response)
      })
    else res.end()
  })

  return router
}
