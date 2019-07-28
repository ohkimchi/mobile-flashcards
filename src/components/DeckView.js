import { View } from "react-native"
import React, { Component } from "react"
import { Actions } from "react-native-router-flux"
import { connect } from "react-redux"
import { alertMsg } from "../../uitils/helpers"
import {
  TextButton,
  TextContainer,
  ViewContainer,
} from "./sharedStyle/styledComponents"

class DeckView extends Component {
  render() {
    const { deckKey, decks } = this.props
    return (
      <View>
        <ViewContainer>
          <TextContainer>{decks.title}</TextContainer>
          <TextContainer>{decks.qss.length} Cards</TextContainer>
        </ViewContainer>
        <TextButton onPress={() => Actions.addCard({ deckKey })}>
          Add Card
        </TextButton>
        <TextButton
          onPress={() => {
            decks.qss.length <= 0
              ? alertMsg("There is no card in this deck yet. ", () => false)
              : Actions.quizView({ deckKey })
          }}
        >
          Take Quiz
        </TextButton>
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    decks: state.decks[ownProps.deckKey],
  }
}

export default connect(mapStateToProps)(DeckView)
