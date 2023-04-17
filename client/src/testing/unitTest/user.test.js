const { fecthData } = require("../../utils/helperFunctions/helper")

const { mockUsers } = require("../data/testData")

import renderer from "react-test-renderer"

import { cleanup, fireEvent, render, screen } from "@testing-library/react"

import userEvent from "@testing-library/user-event"

import Signin from "../../components/Signin/Signin"

afterEach(cleanup)

// inlining
test('displays "Incorrect user credentials." when suitable ', async () => {
  const user = userEvent.setup()
  const el = render(<Signin setUser={console.log()} setMenu={console.log()} />)

  await user.click(screen.getAllByRole('textbox')[0], {name: /Username/i})
  await user.keyboard("pepe")
  await user.click(screen.getAllByRole('textbox')[1])
  await user.keyboard("1234")
  await user.click(screen.getByRole("button", { name: /Login/i }))

  // ...assertions...
  expect(screen.getAllByRole('textbox')[0].value).toStrictEqual('pepe') // username
  expect(screen.getAllByRole('textbox')[1].value).toStrictEqual('123') // password
  
})

// for (const user of mockUsers) {
//   let data = {
//     query: userQueryCodes.getByUserName,
//     username: user.username,
//   }
//   test(`fetch user`, async () => {
//     const response = await fecthData(routes.postUser, data, undefined, 1)
//     expect(response).toStrictEqual(user)
//   })
// }

// // // test all getAllUsers
// let data = {
//     query: userQueryCodes.getAllUsers,
// }
// test(`fetch user`, async () => {
//   const response = await fecthData(routes.postUser, data, undefined, 1)
//   expect(response).toStrictEqual(mockUsers)
// })

// // // test updateRating
// for (const user of mockUsers) {
// let data = {
//     query: userQueryCodes.updateRating,
//     username: user.username,
//     rating: 2
// }
//   data.rating = 2
//   test(`fetch user`, async () => {
//     const response = await fecthData(routes.postUser, data, undefined, 1)
//     expect(response).toStrictEqual({
//       status: 200,
//       message: "OK",
//     })
//   })
// }
