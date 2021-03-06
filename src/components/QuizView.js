import { Switch } from "native-base"
import React, { Component } from "react"
import { TouchableOpacity, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { connect } from "react-redux"
import {
  clearLocalNotification,
  setLocalNotification,
} from "../../uitils/helpers"
import {
  specialStyles,
  SwitchContainer,
  TextContainer,
  ViewContainer,
} from "./sharedStyle/styledComponents"

class QuizView extends Component {
  state = {
    switchVal: false,
    rightAns: 0,
    wrongAns: 0,
    cardPos: 0,
  }

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
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
            <TextContainer>Result:</TextContainer>
            <TextContainer>
              {this.state.rightAns}/{totalQsNum} are correct.{" "}
            </TextContainer>
            <TextContainer>
              Score is {((this.state.rightAns / totalQsNum) * 100).toFixed(2)}%
            </TextContainer>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.restartQuiz()}
              style={specialStyles.button}
            >
              <TextContainer>Restart the quiz</TextContainer>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.pop()}
              style={specialStyles.button}
            >
              <TextContainer>Back to deck</TextContainer>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return (
      <View>
        <View>
          <TextContainer>
            {this.state.cardPos}/{totalQsNum}
          </TextContainer>
          <ViewContainer>
            {!this.state.switchVal ? (
              <TextContainer>{currentQs.qs}</TextContainer>
            ) : (
              <TextContainer>{currentQs.ans}</TextContainer>
            )}
          </ViewContainer>
        </View>

        <SwitchContainer>
          <TextContainer>Show answer:</TextContainer>
          <Switch
            onValueChange={this.toggleSwitch}
            value={this.state.switchVal}
          />
        </SwitchContainer>

        <View>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                cardPos: this.state.cardPos + 1,
                rightAns: this.state.rightAns + 1,
                switchVal: false,
              })
            }
            style={specialStyles.button}
          >
            <TextContainer>Correct</TextContainer>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                cardPos: this.state.cardPos + 1,
                wrongAns: this.state.wrongAns + 1,
                switchVal: false,
              })
            }
            style={specialStyles.button}
          >
            <TextContainer>Incorrect</TextContainer>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return { decks: state.decks[ownProps.deckKey] }
}

export default connect(mapStateToProps)(QuizView)
