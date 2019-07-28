import React, { Component } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import styled from "styled-components"
import * as DeckActions from "../actions/decks"

function Deck({ title, cardsNum }) {
  return (
    <TouchableOpacity>
      <ViewContainer>
        <TextContainer>{title}</TextContainer>
        <TextContainer>{cardsNum} Cards</TextContainer>
      </ViewContainer>
    </TouchableOpacity>
  )
}

class DeckList extends Component {
  componentWillMount() {
    this.props.loadDeckList()
  }

  renderItem = ({ item }) => {
    return (
      <Deck
        key={item.key}
        deckKey={item.key}
        title={item.title}
        cardsNum={item.qss.length}
      />
    )
  }

  render() {
    const { decks } = this.props
    const data = Object.keys(decks).map(key => {
      return { key, ...decks[key] }
    })

    return (
      <View>
        <FlatList data={data} renderItem={this.renderItem} />
        <TouchableOpacity onPress={() => Actions.newDeck()}>
          <TextButton>"+"</TextButton>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { decks: state.decks }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DeckActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList)

const ViewContainer = styled.View`
  height: 100px;
  background-color: #81d8d0;
  margin: 10px;
`

const TextContainer = styled.Text`
  font-size: 20px;
`

const TextButton = styled.Text`
  font-size: 20px;
  background-color: #81d8d0;
  margin: 10px;
`
