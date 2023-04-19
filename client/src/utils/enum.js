module.exports.menus = {
  home: 0,
  user: 1,
  messages: 2,
  showcase: 3,
  detailed: 4,
  signin: 5,
  signup: 6,
  sell: 7,
  administrator: 8
}

module.exports.productCategory = {
  misc: "Miscellaneous",
  fashion: "Fashion",
  jewelry: "Jewelry",
  electronics: "Electronics",
  home: "Home",
  fitness: "Fitness",
  watches: "Watches",
  kitchen: "Kitchen",
}

module.exports.userQueryCodes = {
  insert: 0,
  filterByRating: 1,
  filterByItemsSold: 2,
  filterByVerified: 3,
  filterByName: 4,
  updateRating: 5,
  updateVerified: 6,
  updateEmail: 7,
  updateItemsSold: 8,
  deleteUser: 9,
  getByUserName: 10,
  getAllUsers: 11,
  logIn: 12,
  updatePassword: 13,
  updateImageUrl: 14
}

module.exports.productQueryCodes = {
  insert: 0,
  getAllProducts: 1,
  getByUserName: 2,
  filterByRating: 3,
  filterByVerified: 4,
  updatePrice: 5,
  updateCategory: 6,
  updateCondition: 7,
  deletePost: 8,
  filterByCategory: 9,
  getRecommended: 10,
  getByProductId: 11
}

module.exports.messageQueryCodes = {
  createMessage: 0,
  getByOtherParty: 1,
  getOtherParties: 2
}

module.exports.routes = {
  postProduct: 'http://localhost:3001/product-management',
  postUser: 'http://localhost:3001/user-management',
  postMessage: 'http://localhost:3001/message-management',
}

