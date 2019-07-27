import { Text, View } from "native-base"
import React, { Component } from "react"
import { Actions } from "react-native-router-flux"
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity"
import TextInput from "react-native-web/src/exports/TextInput"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { alertMsg } from "../../uitils/helpers"
import * as DecksActions from "../actions/decks"

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
      alertMsg(`A new card is added to ${deckKey}`, () => Actions.pop())
    } else {
      alertMsg("Your question or answer cannot be empty.", () => false)
    }
  }

  render() {
    return (
      <View>
        <Text>{this.props.deckKey}</Text>
        <View>
          <TextInput
            placeholder="Enter your question..."
            value={this.state.qs}
            onChangeText={qs => this.setState({ qs })}
          />
          <TextInput
            placeholder="Enter your answer..."
            value={this.state.ans}
            onChangeText={ans => this.setState({ ans })}
          />
          <TouchableOpacity onPress={() => this.onSubmit(this.props.deckKey)}>
            <Text>Save card</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DecksActions, dispatch)
}

export default connect(mapDispatchToProps)(AddCard)
