import React, { Component } from "react"
import { TouchableOpacity, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { alertMsg } from "../../uitils/helpers"
import * as DecksActions from "../actions/decks"
import {
  specialStyles,
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
      alertMsg("Oh no...", "Your deck title cannot be empty", () => false)
    } else {
      addNewDeck(title)
      alertMsg("Success!", "A new deck is added", () =>
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
          <TouchableOpacity
            onPress={() => this.onSubmit()}
            style={specialStyles.button}
          >
            <TextContainer>Save Deck</TextContainer>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DecksActions, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(NewDeck)
