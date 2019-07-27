import React, { Component } from "react"
import Routes from "./src/routes"
import reducers from "./src/reducers/decks.js"
import middleware from "./src/middleware"
import { createStore } from "redux"
import { Provider } from "react-redux"

const store = createStore(reducers, middleware)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}

export default App
