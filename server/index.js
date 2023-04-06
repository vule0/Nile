// dependencies
const express = require("express")

const path = require("path")

const routes = require("./routes")

const UserHandler = require("./data/datahandler/userHandler")

const userHandler = new UserHandler(
  path.join(__dirname, "data/userMockData.json")
)

const ProductHandler = require("./data/datahandler/productHandler")

const productHandler = new ProductHandler(
  path.join(__dirname, "data/productMockData.json")
)

// express server setup
const app = express()

const PORT = 3001

// express server hookup
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => console.log(`App listening at port: ${PORT}`))

app.use("/", routes({ userHandler, productHandler })) // down to routes
