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

module.exports.fecthData = async (route, data, callback, dimension = 9) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
  const response = await fetch(route, options)
  const resolved = await response.json()
  if (dimension === 1) callback(resolved)
  else callback(createPagination(resolved, dimension))
}

module.exports.filterByPrice = (
  dArray,
  threshholdL,
  threshholdR,
  descending = false
) => {
  const oneDimensionalArray = dArray.flat()
  const result = oneDimensionalArray.filter(
    (e) => e.price >= threshholdL && e.price <= threshholdR
  )

  if (result.length === 0) {
    return []
  }
  result.sort((e, i) => compareFunc(e, i, descending, "price"))

  return createPagination(result, 9)
}

module.exports.filterByRating = (dArray, threshhold) => {
  const oneDimensionalArray = dArray.flat()
  const result = oneDimensionalArray.filter(
    (e) => e.seller.rating >= threshhold
  )

  if (result.length === 0) {
    return []
  }

  return createPagination(result, 9)
}
