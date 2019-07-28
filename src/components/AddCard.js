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

class AddCard extends Component {
  state = {
    qs: "",
    ans: "",
  }

  onSubmit = deckKey => {
    const { qs, ans } = this.state
    const { addCardToDeck } = this.props
    if (qs.length > 0 && ans.length > 0) {
      addCardToDeck(deckKey, this.state)
      alertMsg("Success", `A new card is added to ${deckKey}`, () =>
        Actions.pop()
      )
    } else {
      alertMsg(
        "Oh no...",
        "Your question or answer cannot be empty.",
        () => false
      )
    }
  }

  render() {
    return (
      <View>
        <TextContainer>{this.props.deckKey}</TextContainer>
        <View>
          <TextInputArea
            placeholder="Enter your question..."
            value={this.state.qs}
            onChangeText={qs => this.setState({ qs })}
          />
          <TextInputArea
            placeholder="Enter your answer..."
            value={this.state.ans}
            onChangeText={ans => this.setState({ ans })}
          />
          <TouchableOpacity
            onPress={() => this.onSubmit(this.props.deckKey)}
            style={specialStyles.button}
          >
            <TextContainer>Save card</TextContainer>
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
)(AddCard)
