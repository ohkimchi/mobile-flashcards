import React, { Component } from "react"
import { TouchableOpacity, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { connect } from "react-redux"
import { alertMsg } from "../../uitils/helpers"
import {
  specialStyles,
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
        <TouchableOpacity
          onPress={() => Actions.addCard({ deckKey })}
          style={specialStyles.button}
        >
          <TextContainer>Add Card</TextContainer>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            decks.qss.length <= 0
              ? alertMsg(
                  "Oh no..",
                  "There is no card in this deck yet. ",
                  () => false
                )
              : Actions.quizView({ deckKey })
          }}
          style={specialStyles.button}
        >
          <TextContainer>Take Quiz</TextContainer>
        </TouchableOpacity>
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
