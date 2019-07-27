import { Switch, Text, View } from "native-base"
import React, { Component } from "react"
import { Actions } from "react-native-router-flux"
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity"
import { connect } from "react-redux"

class QuizView extends Component {
  state = {
    switchVal: false,
    rightAns: 0,
    wrongAns: 0,
    cardPos: 0,
  }

  toggleSwitch = value => {
    this.setState({ switchVal: value })
  }

  restartQuiz = () => {
    this.setState({
      switchVal: false,
      rightAns: 0,
      wrongAns: 0,
      cardPos: 0,
    })
  }

  render() {
    const { decks } = this.props
    const totalQsNum = decks.qss.length
    const currentQs = decks.qss[this.state.cardPos]

    if (this.state.cardPos >= totalQsNum) {
      return (
        <View>
          <View>
            <Text>Result:</Text>
            <Text>
              {this.state.rightAns}/{totalQsNum} are correct.{" "}
            </Text>
            <Text>
              Score is {((this.state.rightAns / totalQsNum) * 100).toFixed(2)}%
            </Text>
          </View>
          <View>
            <TouchableOpacity
              title="Restart the quiz"
              onPress={() => this.restartQuiz()}
            />
            <TouchableOpacity
              title="Back to deck"
              onPress={() => Actions.pop()}
            />
          </View>
        </View>
      )
    }

    return (
      <View>
        <View>
          <Text>
            {this.state.cardPos}/{totalQsNum}
          </Text>
          <View>
            {!this.state.switchVal ? (
              <Text>{currentQs.qs}</Text>
            ) : (
              <Text>{currentQs.ans}</Text>
            )}
          </View>
        </View>

        <View>
          <Text>Show answer:</Text>
          <Switch
            onValueChange={this.toggleSwitch}
            value={this.state.switchVal}
          />
        </View>

        <View>
          <TouchableOpacity
            title="Correct"
            onPress={() =>
              this.setState({
                cardPos: this.state.cardPos + 1,
                rightAns: this.state.rightAns + 1,
                switchVal: false,
              })
            }
          />{" "}
          <TouchableOpacity
            title="Incorrect"
            onPress={() =>
              this.setState({
                cardPos: this.state.cardPos + 1,
                wrongAns: this.state.wrongAns + 1,
                switchVal: false,
              })
            }
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return { decks: state.decks[ownProps.deckKey] }
}

export default connect(mapStateToProps)(QuizView)
