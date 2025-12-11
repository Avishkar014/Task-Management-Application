import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "../store"
import Login from "../pages/Login"

test("login form validation shows errors for short inputs", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  )

  const username = screen.getByPlaceholderText(/your.username/i)
  const password = screen.getByPlaceholderText(/•+/i) || screen.getByPlaceholderText(/password/i)
  const submit = screen.getByRole("button", { name: /sign in/i })

  await userEvent.clear(username)
  await userEvent.type(username, "ab")
  await userEvent.clear(password)
  await userEvent.type(password, "123")
  await userEvent.click(submit)

  expect(await screen.findByText(/string must contain at least 3 character/i)).toBeInTheDocument()
})