import { Button } from "native-base"
import React, { Component } from "react"
import { Text, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { connect } from "react-redux"
import { alertMsg } from "../../uitils/helpers"

class DeckView extends Component {
  render() {
    const { deckKey, decks } = this.props
    return (
      <View>
        <View>
          <Text>{decks.title}</Text>
          <Text>{decks.qss.length} Cards</Text>
        </View>
        <Button onPress={() => Actions.addCard({ deckKey })} />
        <Button
          onPress={() => {
            decks.qss.length <= 0
              ? alertMsg("There is no card in this deck yet. ", () => false)
              : Actions.quizView({ deckKey })
          }}
        />
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