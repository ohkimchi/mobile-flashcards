import { getDecks, saveCardToDeck, saveDecks } from "../../uitils/storage";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_NEW_DECK = "ADD_NEW_DECK";
export const ADD_NEW_CARD = "ADD_NEW_CARD";

export function loadDeckList() {
  return dispatch => {
    getDecks().then(results => {
      dispatch({
        type: RECEIVE_DECKS,
        payload: results
      });
    });
  };
}

export function addNewDeck(title) {
  let newDeck = {};
  newDeck[title] = {
    title: title,
    qss: []
  };
  saveDecks(newDeck);
  return {
    type: ADD_NEW_DECK,
    payload: newDeck
  };
}

export function addCardToDeck(decKey, card) {
  return dispatch => {
    saveCardToDeck(decKey, card).then(() => {
      dispatch({
        type: ADD_NEW_CARD,
        payload: { decKey, card: card }
      });
    });
  };
}
