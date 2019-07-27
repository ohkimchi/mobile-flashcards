import { Text } from "expo"
import React, { Component } from "react"
import { FlatList } from "react-native-web"
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity"
import View from "react-native-web/dist/exports/View"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as DeckActions from "../actions/decks"

function Deck({ title, cardsNum }) {
  return (
    <TouchableOpacity>
      <View>
        <Text>{title}</Text>
        <Text>{cardsNum} Cards</Text>
      </View>
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
      <div>
        <FlatList data={data} renderItem={this.renderItem} />
        <TouchableOpacity onPress={() => Actions.newDeck()}>
          <Text>"+"</Text>
        </TouchableOpacity>
      </div>
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
