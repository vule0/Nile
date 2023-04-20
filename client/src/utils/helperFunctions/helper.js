const createPagination = (obj, ITEMS_PER_PAGE) => {
  let paginatedArray = []

  obj.forEach((e, i) => {
    if (i % ITEMS_PER_PAGE == 0) paginatedArray[i / ITEMS_PER_PAGE] = []
    paginatedArray[Math.floor(i / ITEMS_PER_PAGE)].push(e)
  })

  return paginatedArray
}

const compareFunc = (e, i, descending, feature) => {
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

module.exports.fecthData = async (
  route,
  data,
  callback = undefined,
  dimension = 9
) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
  const response = await fetch(route, options)
  let resolved = await response.json()

  if (dimension !== 1) resolved = createPagination(resolved, dimension)

  if (callback !== undefined) {
    callback(resolved)
  }
  // console.log("Fetched")
  return resolved
}

module.exports.filterByPrice = (
  dArray,
  threshholdL,
  threshholdR,
  descending = false
) => {
  if (!threshholdL) threshholdL = 0
  if (!threshholdR) threshholdR = 1000
  const oneDimensionalArray = dArray.flat()
  const result = oneDimensionalArray.filter(
    (e) => e.price >= threshholdL && e.price <= threshholdR
  )

  if (result.length === 0) return []

  result.sort((e, i) => compareFunc(e, i, descending, "price"))

  return createPagination(result, 9)
}

module.exports.filterByRating = (dArray, threshhold) => {
  if (!threshhold) threshhold = 0
  const oneDimensionalArray = dArray.flat()
  const result = oneDimensionalArray.filter(
    (e) => e.seller.rating >= threshhold
  )

  if (result.length === 0) return []

  return createPagination(result, 9)
}

module.exports.getInitials = (name) => {
  const split = String(name).split(" ")
  if (split.length === 1) return split[0][0]
  return `${split[0][0]}${split[1][0]}`
}

module.exports.validateEmail = (email) => {
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  
  if (email.match(validRegex)) {
    console.log("Great!")
    return true
  } else {
    console.log("Invalid email address!")
    return false
  }
}