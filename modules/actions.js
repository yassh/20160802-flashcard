import uniqid from 'uniqid';
import arrayShuffle from 'array-shuffle';
import { getCards, postCard, deleteCard } from './api.js';

export function changeScreen(screenName) {
  return { type: 'CHANGE_SCREEN', screenName };
}

export function changeCard(card) {
  return { type: 'CHANGE_CARD', card };
}

export function prevCard() {
  return (dispatch, getState) => {
    const cards = getState().cards;
    const currentCard = getState().currentCard;
    const i = cards.findIndex((card) => card.id === currentCard.id);

    const prevCard = cards[i - 1] || cards[cards.length - 1];
    location.hash = `/cards/${prevCard.id}`;
  };
}

export function nextCard() {
  return (dispatch, getState) => {
    const cards = getState().cards;
    const currentCard = getState().currentCard;
    const i = cards.findIndex((card) => card.id === currentCard.id);

    const nextCard = cards[i + 1] || cards[0];
    location.hash = `/cards/${nextCard.id}`;
  };
}

export function fetchCards() {
  return (dispatch) => {
    return getCards().then((cards) => {
      cards = arrayShuffle(cards.filter((card) => card.id));
      dispatch({ type: 'FETCH_CARDS', cards });
    });
  };
}

export function addCard(data) {
  return (dispatch) => {
    const card = data;
    card.id = uniqid();

    return postCard(card).then(() => {
      dispatch({ type: 'ADD_CARD', card });
    });
  };
}

export function removeCard(id) {
  return (dispatch, getState) => {
    const cards = getState().cards;
    const currentCard = getState().currentCard;
    const i = cards.findIndex((card) => card.id === currentCard.id);

    return deleteCard(id).then(() => {
      dispatch({ type: 'REMOVE_CARD', id });

      const cards = getState().cards;
      if (cards[i]) {
        location.hash = `/cards/${cards[i].id}`;
      } else {
        location.hash = `/`;
      }
    });
  };
}
