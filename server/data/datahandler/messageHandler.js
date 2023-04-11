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

  // retrievals
  getOtherParties(json) {
    const parsed = JSON.parse(json)
    const messages = parsed.map((e) => e.to.name)
    return messages.flat()
  }

  getByOtherParty(json, otherParty) {
    const parsed = JSON.parse(json)
    const result = parsed.filter((e) => e.to.name === otherParty)
    let messages = result.map((e) => e.messages).flat()
    return messages
  }

  //inserts
  createMessage(json, text, date, self, name, uname, rating) {
    const id = "wjebdb"
    const parsed = JSON.parse(json)
    let response = {}
    let flag = false

    const newMessage = {
      date: date,
      self: self,
      text: text,
    }
    const newUser = {
      name: name,
      username: uname,
      rating: rating,
      verified: true,
      email: "email@example.com",
      items_sold: 100,
    }
    // if previous conversations with the "to" user, add new message to the convo
    parsed.forEach((e, i) => {
      if (e.to.name === newUser.name) {
        console.log("User found")
        e.messages.push(newMessage)
        flag = true
      }
    })

    // otherwise, create message
    if (!flag) {
      console.log("User not found...creating message")
      const newConvo = {
        to: newUser,
        messages: [newMessage],
      }

      // add new conversation to parent object
      parsed.push(newConvo)
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
}
