import { combineReducers } from 'redux';

function cards(state = [], action) {
  switch (action.type) {
    case 'FETCH_CARDS':
      return action.cards;
    case 'ADD_CARD':
      return [...state, action.card];
    case 'REMOVE_CARD':
      return state.filter((card) => card.id !== action.id);
    default:
      return state;
  }
}

const initialCurrentCard = { id: "", front: "", back: "" };
function currentCard(state = initialCurrentCard, action) {
  if (!action.type.startsWith('currentCard:')) return state;

  switch (action.type) {
    case 'currentCard:FETCH_CARDS':
      return action.cards[0] ? action.cards[0] : state;
    case 'currentCard:CHANGE_CARD':
      return action.card;
  }
}

function currentScreen(state = 'Loading', action) {
  switch (action.type) {
    case 'CHANGE_SCREEN':
      return action.screenName;
    default:
      return state;
  }
}

export default combineReducers({
  cards,
  currentCard,
  currentScreen,
});
