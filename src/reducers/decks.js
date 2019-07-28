import { ADD_NEW_CARD, ADD_NEW_DECK, RECEIVE_DECKS } from "../actions/decks"

const initialState = {
  AnnaKarenina: {
    title: "Anna Karenina",
    qss: [
      {
        qs: "What is the heroine of the book?",
        ans: "Anna Karenina",
      },
      {
        qs: "What is the name of Anna Karenina's husband?",
        ans: "Alexei Alexandrovich Karenin",
      },
    ],
  },
}

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.payload,
      }
    case ADD_NEW_DECK:
      return {
        ...state,
        ...action.payload,
      }
    case ADD_NEW_CARD:
      const { decKey, card } = action.payload
      return {
        ...state,
        [decKey]: {
          ...state[decKey],
          qss: state[decKey].qss.concat(card),
        },
      }
    default:
      return state
  }
}
