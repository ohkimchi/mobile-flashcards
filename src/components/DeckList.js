import React, { Component } from "react"
import { FlatList, View, TouchableOpacity } from "react-native"
import { Actions } from "react-native-router-flux"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as DeckActions from "../actions/decks"
import {
  TextContainer,
  ViewContainer,
  ViewFlatList,
  specialStyles,
} from "./sharedStyle/styledComponents"

function Deck({ deckKey, title, cardsNum }) {
  return (
    <TouchableOpacity onPress={() => Actions.deckView({ deckKey })}>
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
        <ViewFlatList>
          <FlatList
            data={data}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={true}
          />
        </ViewFlatList>
        <TouchableOpacity
          onPress={() => Actions.newDeck()}
          style={specialStyles.button}
        >
          <TextContainer>Create New Deck</TextContainer>
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
