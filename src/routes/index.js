import React, { Component } from "react"
import { Router, Scene } from "react-native-router-flux"
import AddCard from "../components/AddCard"
import DeckList from "../components/DeckList"
import DeckView from "../components/DeckView"
import NewDeck from "../components/NewDeck"
import QuizView from "../components/QuizView"

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="deckList"
            component={DeckList}
            title="Deck List"
            initial
          />
          <Scene key="newDeck" component={NewDeck} title="New Deck" />
          <Scene key="deckView" component={DeckView} title="Deck View" />
          <Scene key="addCard" component={AddCard} title="Add Card" />
          <Scene key="quizView" component={QuizView} title="Quiz View" />
        </Scene>
      </Router>
    )
  }
}
