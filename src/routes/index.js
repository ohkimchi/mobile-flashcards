import React, { Component } from "react"
import { Router, Scene } from "react-native-router-flux"

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="deckList" title="Deck List" initial />
          <Scene key="newDeck" title="New Deck" />
          <Scene key="deckView" title="Deck View" />
          <Scene key="addCard" title="Add Card" />
          <Scene key="quizView" title="Quiz View" />
        </Scene>
      </Router>
    )
  }
}
