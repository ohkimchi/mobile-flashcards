import React, { Component } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { alertMsg } from "../../uitils/helpers"
import * as DeckActions from "../actions/decks"

class NewDeck extends Component {
  state = {
    title: "",
  }

  onSubmit = () => {
    const { title } = this.state
    if (title.length < 1) {
      alertMsg("Your deck title cannot be empty", () => false)
    } else {
      this.props.addNewDeck(this.state.title)
      alertMsg("A new deck is added", () =>
        Actions.deckView({ deckKey: title })
      )
    }
  }

  render() {
    return (
      <View>
        <Text>What is the title of your new deck?</Text>
        <View>
          <TextInput
            placeholder="New Deck Title"
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
          <TouchableOpacity onPress={this.onSubmit}>
            <Text>Save Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  bindActionCreators(DeckActions, dispatch)
}

export default connect(mapDispatchToProps)(NewDeck)
