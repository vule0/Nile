module.exports.userQuery = {
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
    getAllUsers: 11
}

module.exports.productQuery = {
    insert: 0,
    getAllProducts: 1,
    getByUserName: 2,
    filterByRating: 3,
    filterByVerified: 4,
    updatePrice: 5,
    updateCategory: 6,
    updateCondition: 7,
    deletePost: 8
}