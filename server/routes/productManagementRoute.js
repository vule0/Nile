const express = require("express")
const { productQuery } = require("../utils/enum")
const router = express.Router()

module.exports = (params) => {
  const { productHandler } = params
  router.get("/", async (req, res) => {
    const data = req.body.data // object containing user information
    const query = data.query // browser provides which query to perform
    // const query = productQuery.deletePost // browser provides which query to perform
    // const data = {
    //   id: "P1001",
    //   productName: "Leather Handbag",
    //   description: "A stylish and spacious handbag made of genuine leather.",
    //   category: "Clothing",
    //   price: 149000000000.99,
    //   condition: "New",
    //   name: "Jose Lopez",
    //   username: "oanderson",
    //   rating: 5.0,
    //   isVerified: true,
    //   threshold: 3
    // } // object containing user information

    // open file
    productHandler.readDb().then((json) => {
      // here we can mimic the database retrievals/filters
      let response = { status: "-2", message: "no corresponding query" }

      if (query === productQuery.getAllProducts) {
        response = productHandler.getAllProducts(json)
      } else if (query === productQuery.getByUserName) {
        response = productHandler.getByUserName(json, data.username)
      } else if (query === productQuery.filterByRating) {
        response = productHandler.filterByRating(
          json,
          data.descending,
          data.threshold
        )
      } else if (query === productQuery.filterByVerified) {
        response = productHandler.filterByVerified(json, data.isVerified)
      }
      
      // send response to the browser
      res.json(response)
    })
  })

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
      }
      else if (query === productQuery.insert) {
        response = productHandler.createProduct(
          json,
          data.productName,
          data.description,
          data.category,
          data.price,
          data.condition,
          data.name,
          data.username,
          0,
          false
        )
      } else if (query === productQuery.updatePrice) {
        response = productHandler.updatePrice(json, data.id, data.price)
      } else if (query === productQuery.updateCategory) {
        response = productHandler.updateCategory(json, data.id, data.category)
      } else if (query === productQuery.updateCondition) {
        response = productHandler.updateCondition(json, data.id, data.condition)
      } else if (query === productQuery.deletePost) {
        response = productHandler.deletePost(json, data.id)
      }

      // send response to the browser
      res.json(response)
    })
    else res.end()
  })

  return router
}
