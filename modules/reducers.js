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

function currentCard(state = null, action) {
  switch (action.type) {
    case 'FETCH_CARDS':
      return action.cards[0] ? action.cards[0] : state;
    case 'CHANGE_CARD':
      return action.card;
    default:
      return state;
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
