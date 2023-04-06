const fs = require("fs")
const util = require("util")
const readFile = util.promisify(fs.readFile)

module.exports = class UserHandler {
  constructor(db) {
    this.db = db
  }

  readDb() {
    return readFile(this.db)
  }

  getByUserName(json, uname) {
    const parsed = JSON.parse(json)
    const user = parsed.filter(e => e.username === uname)
    return user[0]
  }

  updateRating(rating) {
    readFile(this.db, (e, data) => {
      if (e) {
        console.log(e)
        return
      }
      const parsedData = JSON.parse(data)

      // update email
      parsedData.forEach((e) => {
        if (e.username === uname) e.rating = rating
      })

      writeFile(this.db, JSON.stringify(parsedData, null, 2), (e) => {
        if (e) {
          console.log("Failed to write updated data to file", e)
          return
        }
        console.log("Updated file successfully")
      })
    })
  }

  updateVerified(verified) {
    readFile(this.db, (e, data) => {
      if (e) {
        console.log(e)
        return
      }
      const parsedData = JSON.parse(data)

      // update email
      parsedData.forEach((e) => {
        if (e.username === uname) e.verified = verified
      })

      writeFile(this.db, JSON.stringify(parsedData, null, 2), (e) => {
        if (e) {
          console.log("Failed to write updated data to file", e)
          return
        }
        console.log("Updated file successfully")
      })
    })
  }

  updateEmail(uname) {
    readFile(this.db, (e, data) => {
      if (e) {
        console.log(e)
        return
      }
      const parsedData = JSON.parse(data)

      // update email
      parsedData.forEach((e) => {
        if (e.username === uname) e.email = email
      })

      writeFile(this.db, JSON.stringify(parsedData, null, 2), (e) => {
        if (e) {
          console.log("Failed to write updated data to file", e)
          return
        }
        console.log("Updated file successfully")
      })
    })
  }

  updateItemsSold(items) {
    readFile(this.db, (e, data) => {
      if (e) {
        console.log(e)
        return
      }
      const parsedData = JSON.parse(data)

      // update email
      parsedData.forEach((e) => {
        if (e.username === uname) e.items_sold += items
      })

      writeFile(this.db, JSON.stringify(parsedData, null, 2), (e) => {
        if (e) {
          console.log("Failed to write updated data to file", e)
          return
        }
        console.log("Updated file successfully")
      })
    })
  }
}
