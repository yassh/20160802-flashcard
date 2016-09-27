import React from 'react';
import { Router } from 'director';
import { connect } from 'react-redux';
import { changeScreen, changeCard, fetchCards } from './actions.js';
import { testApi } from './api.js';
import LoadingScreen from './screens/LoadingScreen.jsx';
import AuthScreen from './screens/AuthScreen.jsx';
import CardScreen from './screens/CardScreen.jsx';
import CardNewScreen from './screens/CardNewScreen.jsx';
import NotFoundScreen from './screens/NotFoundScreen.jsx';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    const router = new Router({
      '/': () => {
        const { cards } = this.props;

        if (cards.length) {
          location.hash = `/cards/${cards[0].id}`;
        } else {
          location.hash = '/cards/new';
        }
      },
      '/cards/new': () => {
        dispatch(changeScreen('CardNew'));
      },
      '/cards/:id': (id) => {
        const { cards } = this.props;

        const card = cards.find((card) => card.id === id);
        if (card) {
          dispatch(changeCard(card));
          dispatch(changeScreen('Card'));
        } else {
          dispatch(changeScreen('NotFound'));
        }
      },
      '/auth': () => {
        dispatch(changeScreen('Auth'));
      },
      '*': () => {
        dispatch(changeScreen('NotFound'));
      },
    }).configure({ strict: false });

    dispatch(fetchCards()).then(() => {
      router.init('/');
    }).catch((err) => {
      router.init('/auth');
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <LoadingScreen />
        <AuthScreen />
        <CardScreen />
        <CardNewScreen />
        <NotFoundScreen />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cards,
  };
}

export default connect(mapStateToProps)(App);
