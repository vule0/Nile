const express = require("express")

const router = express.Router()

const userManagementRoute = require("./userManagementRoute")

const productManagementRoute = require("./productManagementRoute")

const messageManagementRoute = require("./messageManagementRoute")

module.exports = (params) => {
  router.get("/", (req, res) => {
    res.send("Nothing in the root...")
  })

  // pass down to respective route handler
  router.use("/user-management", userManagementRoute(params))

  router.use("/product-management", productManagementRoute(params))

  router.use("/message-management", messageManagementRoute(params))

  return router
}
