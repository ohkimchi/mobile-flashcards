import { AsyncStorage } from "react-native"

export const FLASHCARD_STORAGE_KEY = "MobileFlashcards:flashcards"

const dataStore = {
  Resurrection: {
    title: "Resurrection",
    qss: [
      {
        qs: "Who is the writer of <Resurrection>?",
        ans: "Leo Tolstoy"
      }
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(response => JSON.parse(response))
    .then(response => {
      return response !== null ? response : dataStore
    })
}

export function saveDecks(newDeck) {
  AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((deckStored) => {
      const decksJSON = JSON.parse(deckStored)
      const mergeDecks = { ...decksJSON, ...newDeck }
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(mergeDecks),
        () => { AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(loggerResults)})
    })
}

export function saveCardToDeck(decKey, card) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
  .then((decksStored) => {
    const decks = JSON.parse(decksStored)
    decks[decKey].qss.push(card)
    AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks))
  })
}

export function clearStorage() {
  AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, "")
}

export function loggerResults(results) {
  console.log("New decks stored [deckResults]: ", JSON.parse(results))
}
