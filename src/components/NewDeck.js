import React, { Component } from "react"
import { TouchableOpacity, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { alertMsg } from "../../uitils/helpers"
import * as DeckActions from "../actions/decks"
import {
  TextButton,
  TextContainer,
  TextInputArea,
} from "./sharedStyle/styledComponents"

class NewDeck extends Component {
  state = {
    title: "",
  }

  onSubmit = () => {
    const { title } = this.state
    const { addNewDeck } = this.props
    if (title.length < 1) {
      alertMsg("Your deck title cannot be empty", () => false)
    } else {
      addNewDeck(title)
      alertMsg("A new deck is added", () =>
        Actions.deckView({ deckKey: title })
      )
    }
  }

  render() {
    return (
      <View>
        <TextContainer>What is the title of your new deck?</TextContainer>
        <View>
          <TextInputArea
            placeholder="New Deck Title"
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
          <TouchableOpacity onPress={() => this.onSubmit()}>
            <TextButton>Save Deck</TextButton>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DeckActions, dispatch)
}

export default connect(mapDispatchToProps)(NewDeck)
