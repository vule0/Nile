const fs = require("fs")
const util = require("util")
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

module.exports = class UserHandler {
  constructor(db) {
    this.db = db
  }

  // we read asynchronously, this method is promisified
  readDb() {
    return readFile(this.db)
  }

  // compare function
  compareFunc(e, i, descending = false, feature) {
    if (descending) {
      if (e[feature] < i[feature]) return 1
      else if (e[feature] === i[feature]) return 0
      else return -1
    } else {
      if (e[feature] < i[feature]) return -1
      else if (e[feature] === i[feature]) return 0
      else return 1
    }
  }

  // User Login
  logIn(json, username, password) {
    const parsedJson = JSON.parse(json)
    const user = parsedJson.filter(
      (e) => e.username === username && e.password === password
    )
    if (user.length) {
      return user[0]
    } else
      return {
        status: 100,
        message: "User not found",
      }
  }

  // retrievals
  getAllUsers(json) {
    const parsed = JSON.parse(json)
    const user = parsed.filter((e) => e)
    if (user.length === 0) return {status: 100, message: 'Empty Users Database'}
    return user
  }

  getByUserName(json, uname) {
    const parsed = JSON.parse(json)
    const user = parsed.filter((e) => e.username === uname)
    if (user.length > 1)
      return {
        status: 800,
        message:
          "ALERT!!!! there are more than one users with the same username",
      }
    else if (user.length === 0)
      return {
        status: 100,
        message:
          "No user with the specified information exists in the database",
      }
    else return user[0]
  }

  // filters
  filterByName(json, name) {
    return {
      status: 1000000000000000000000,
      message: "Needs implementation",
    }
  }

  filterByRating(json, descending, threshhold) {
    if (descending === undefined) descending = false
    if (threshhold === undefined) threshhold = 0
    const parsedJson = JSON.parse(json)
    const parsed = parsedJson.filter((e) => e.rating >= threshhold)

    parsed.sort((e, i) => this.compareFunc(e, i, descending, "rating"))

    if (parsed.length === 0)
      return {
        status: 100,
        message: "No filters matching rating criteria",
      }

    return parsed
  }

  filterByItemsSold(json, descending, threshhold) {
    if (descending === undefined) descending = false
    if (threshhold === undefined) threshhold = 0
    const parsedJson = JSON.parse(json)
    const parsed = parsedJson.filter((e) => e.items_sold >= threshhold)
    parsed.sort((e, i) => this.compareFunc(e, i, descending, "items_sold"))

    if (parsed.length === 0)
      return {
        status: 100,
        message: "No filters matching items_sold criteria",
      }

    return parsed
  }

  filterByVerified(json, isVerified) {
    if (isVerified === undefined) isVerified = true
    const parsed = JSON.parse(json)
    let data = []
    if (isVerified) data = parsed.filter((e) => e.verified)
    else data = parsed.filter((e) => !e.verified)

    if (data.length === 0)
      return {
        status: 100,
        message: "No filters matching verified criteria",
      }

    return data
  }

  //inserts
  createUser(json, name, uname, email, password) {
    const parsed = JSON.parse(json)
    let flag = false
    let response = {}
    parsed.forEach((e) => {
      if (e.username === uname) flag = true
    })

    if (flag) {
      return {
        status: 100,
        message: "User already has an account",
      }
    }

    // create user
    const newUser = {
      name: name,
      username: uname,
      rating: 0,
      verified: false,
      email: email,
      items_sold: 0,
      password: password,
    }

    // add new user to parent object
    parsed.push(newUser)

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
  updateRating(json, uname, rating) {
    const parsed = JSON.parse(json)
    let flag = true
    let response = {}
    // update rating
    parsed.forEach((e) => {
      if (e.username === uname) {
        e.rating = rating
        flag = false
      }
    })

    if (flag) {
      return {
        status: 100,
        message: "User not found",
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

  updateVerified(json, uname, verified) {
    const parsed = JSON.parse(json)
    let flag = true
    let response = {}
    // update verified
    parsed.forEach((e) => {
      if (e.username === uname) {
        e.verified = verified
        flag = false
      }
    })

    if (flag) {
      return {
        status: 100,
        message: "User not found",
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
        message: "OK Updated verification",
      }

    return response
  }


  updateImageUrl(json, uname, imageurl) {
    const parsed = JSON.parse(json)
    let flag = true
    let response = {}
    // update verified
    parsed.forEach((e) => {
      if (e.username === uname) {
        e.imageurl = imageurl
        flag = false
      }
    })

    if (flag) {
      return {
        status: 100,
        message: "User not found",
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
        message: "OK Updated imageurl",
      }

    return response
  }

  updateEmail(json, uname, email) {
    const parsed = JSON.parse(json)
    let flag = true
    let response = {}
    // update email
    parsed.forEach((e) => {
      if (e.username === uname) {
        e.email = email
        flag = false
      }
    })

    if (flag) {
      return {
        status: 100,
        message: "User not found",
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
    console.log(response)
    return response
  }

  updatePassword(json, uname, password) {
    const parsed = JSON.parse(json)
    let flag = true
    let response = {}
    // update password
    parsed.forEach((e) => {
      if (e.username === uname) {
        e.password = password
        flag = false
      }
    })

    if (flag) {
      return {
        status: 100,
        message: "User not found",
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

    console.log(response)
    return response
  }

  updateItemsSold(json, uname, items) {
    const parsed = JSON.parse(json)
    let flag = true
    let response = {}
    // update items sold
    parsed.forEach((e) => {
      if (e.username === uname) {
        e.items_sold += items
        flag = false
      }
    })

    if (flag) {
      return {
        status: 100,
        message: "User not found",
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
  deleteUser(json, uname) {
    const parsed = JSON.parse(json)
    let response = {}
    // delete from parent object
    const result = parsed.filter((e) => e.username !== uname)

    if (result.length === parsed.length) {
      return {
        status: 100,
        message: "User not found",
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
