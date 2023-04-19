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

  await user.click(screen.getByTestId('username'))
  await user.keyboard("pepe")
  await user.click(screen.getByTestId('password'))
  await user.keyboard("1234")
  // ...assertions...
  expect(screen.getByTestId('username').value).toBe('pepe')
  expect(screen.getByTestId('password').value).toBe('1234')
  await user.click(screen.getByTestId("login-submit"))
  // expect(screen.getByTestId('login-submit').value).toBe('1234')

  
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
