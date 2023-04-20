const fs = require("fs")
const util = require("util")
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

module.exports = class ProductHandler {
  constructor(db) {
    this.db = db
  }

  // we read asynchronously, this method is promisified
  readDb() {
    return readFile(this.db)
  }

  // heplers
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
  }

  compareFunc(e, i, descending = false, feature) {
    if (descending) {
      if (e["seller"][feature] < i["seller"][feature]) return 1
      else if (e["seller"][feature] === i["seller"][feature]) return 0
      else return -1
    } else {
      if (e["seller"][feature] < i["seller"][feature]) return -1
      else if (e["seller"][feature] === i["seller"][feature]) return 0
      else return 1
    }
  }

  // retrievals
  getByProductId(json, productId) {
    const parsed = JSON.parse(json)
    const result = parsed.filter((e) => e.id === productId)

    if (result.length === 0)
      return [
        {
          status: 100,
          message: "No Product Found",
        },
      ]
    console.log(result)
    return result
  }

  getRecommended(json) {
    const parsed = JSON.parse(json)
    let i0 = Math.floor(Math.random() * (parsed.length - 6))
    let i1 = i0 + 6
    let response = []
    while (i0 < i1) {
      response.push(parsed[i0])
      i0++
    }
    return response
  }

  getAllProducts(json) {
    const parsed = JSON.parse(json)
    const products = parsed.filter((e) => e)
    return products
  }

  getByUserName(json, uname) {
    const parsed = JSON.parse(json)
    const products = parsed.filter((e) => e.seller.username === uname)

    if (products.length === 0)
      return {
        status: 100,
        message:
          "No user with the specified information exists in the database",
      }
    else {
      return products
    }
  }

  // filters
  filterByRating(json, descending, threshhold) {
    if (descending === undefined) descending = false
    if (threshhold === undefined) threshhold = 0
    const parsedJson = JSON.parse(json)
    const parsed = parsedJson.filter((e) => e.seller.rating >= threshhold)

    parsed.sort((e, i) => this.compareFunc(e, i, descending, "rating"))

    if (parsed.length === 0)
      return {
        status: 100,
        message: "Empty database",
      }

    return parsed
  }

  filterByCategory(json, category) {
    if (category === "Miscellaneous") return this.getAllProducts(json)
    const parsedJson = JSON.parse(json)
    const parsed = parsedJson.filter((e) => e.category === category)

    if (parsed.length === 0)
      return {
        status: 100,
        message: "Not a valid category",
      }

    return parsed
  }

  filterByVerified(json, isVerified) {
    if (isVerified === undefined) isVerified = true
    const parsed = JSON.parse(json)
    let data = []
    if (isVerified) data = parsed.filter((e) => e.seller.verified)
    else data = parsed.filter((e) => !e.seller.verified)

    if (data.length === 0)
      return {
        status: 100,
        message: "Empty database",
      }

    return data
  }

  //inserts
  createProduct(
    json,
    id = undefined,
    productName = "",
    description = "",
    category,
    price,
    condition,
    name,
    uname,
    rating,
    verified,
    imageurl
  ) {
    if (!id) id = "P" + String(this.getRandomInt(0, 10000))
    const parsed = JSON.parse(json)
    let response = {}

    if (!verified)
      return {
        status: -1,
        message:
          "Not a verified user. Not allowed to sell product in our platform yet. Check your verification status to obtain information about your verfication process",
      }
    if (!(category && price && condition && name && uname && rating >= 0))
      return {
        status: -2,
        message:
          "Not sufficient data provided to create post.\nMake sure you complete all the required fields.",
      }
    // create user
    const newProduct = {
      id: id,
      "product name": productName,
      description: description,
      category: category,
      price: price,
      condition: condition,
      seller: {
        name: name,
        username: uname,
        rating: rating,
        verified: verified,
      },
      imageurl: imageurl,
    }
    console.log(newProduct.imageurl)

    let exists = {}
    parsed.filter((e, i) => {
      if (e.id === id) exists = { idx: i, el: e }
    })

    // check if product already exists, update it
    if (exists.idx && exists.el) {
      console.log("Already exists")
      parsed[exists.idx] = newProduct
    }
    // otherwise, add a new product
    else {
      // add new user to parent object
      parsed.push(newProduct)
    }

    // add new user to json file
    writeFile(this.db, JSON.stringify(parsed, null, 2), (e) => {
      if (e) {
        response = {
          status: -1,
          message: "Failed to write updated data to file",
        }
        return
      }
    })

    if (Object.keys(response).length === 0)
      response = {
        status: 200,
        message: "OK",
      }

    return response
  }

  // updates
  updatePrice(json, id, price) {
    const parsed = JSON.parse(json)
    let flag = true
    let response = {}
    // update rating
    parsed.forEach((e) => {
      if (e.id === id) {
        e.price = price
        flag = false
      }
    })

    if (flag) {
      return {
        status: 100,
        message: "Product id not found",
      }
    }

    // update json file
    writeFile(this.db, JSON.stringify(parsed, null, 2), (e) => {
      if (e) {
        response = {
          status: -1,
          message: "Failed to write updated data to file",
        }
        return
      }
    })

    if (Object.keys(response).length === 0)
      response = {
        status: 200,
        message: "OK",
      }

    return response
  }

  updateCategory(json, id, category) {
    const parsed = JSON.parse(json)
    let flag = true
    let response = {}
    // update verified
    parsed.forEach((e) => {
      if (e.id === id) {
        e.category = category
        flag = false
      }
    })

    if (flag) {
      return {
        status: 100,
        message: "Product id not found",
      }
    }

    // update json file
    writeFile(this.db, JSON.stringify(parsed, null, 2), (e) => {
      if (e) {
        response = {
          status: -1,
          message: "Failed to write updated data to file",
        }
        return
      }
    })

    if (Object.keys(response).length === 0)
      response = {
        status: 200,
        message: "OK",
      }

    return response
  }

  updateCondition(json, id, condition) {
    const parsed = JSON.parse(json)
    let flag = true
    let response = {}
    // update email
    parsed.forEach((e) => {
      if (e.id === id) {
        e.condition = condition
        flag = false
      }
    })

    if (flag) {
      return {
        status: 100,
        message: "Product id not found",
      }
    }

    // update json file
    writeFile(this.db, JSON.stringify(parsed, null, 2), (e) => {
      if (e) {
        response = {
          status: -1,
          message: "Failed to write updated data to file",
        }
        return
      }
    })

    if (Object.keys(response).length === 0)
      response = {
        status: 200,
        message: "OK",
      }

    return response
  }

  // deletions
  deletePost(json, id) {
    const parsed = JSON.parse(json)
    let response = {}
    // delete from parent object
    const result = parsed.filter((e) => e.id !== id)

    if (result.length === parsed.length) {
      return {
        status: 100,
        message: "Product id not found",
      }
    }

    // delete from json file
    writeFile(this.db, JSON.stringify(result, null, 2), (e) => {
      if (e) {
        response = {
          status: -1,
          message: "Failed to write updated data to file",
        }
        return
      }
    })

    if (Object.keys(response).length === 0)
      response = {
        status: 200,
        message: "OK",
      }

    return response
  }
}
