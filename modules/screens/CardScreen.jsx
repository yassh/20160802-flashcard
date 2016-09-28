import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { prevCard, nextCard, removeCard } from '../actions.js';
import Card from '../components/Card.jsx';
import DeauthButton from '../components/DeauthButton.jsx';

const initialState = {
  prevEnabled: true,
  nextEnabled: true,
  cardReady: true,
  cardAnimatable: false,
  cardFace: 'front',
};

class CardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  prev() {
    if (!this.state.prevEnabled) return;
    this.setState({
      prevEnabled: false,
      nextEnabled: false,
      cardReady: false,
    });

    const { dispatch } = this.props;
    const { cardContainers } = this.refs;
    const onTransitionEnd = () => {
      this.setState(initialState);
      cardContainers.classList.remove('is-animatable', 'is-rightShifted');
      cardContainers.removeEventListener('transitionend', onTransitionEnd);
    };

    dispatch(prevCard());
    cardContainers.addEventListener('transitionend', onTransitionEnd);
    cardContainers.classList.add('is-animatable', 'is-rightShifted');
  }

  next() {
    if (!this.state.nextEnabled) return;
    this.setState({
      prevEnabled: false,
      nextEnabled: false,
      cardReady: false,
    });

    const { dispatch } = this.props;
    const { cardContainers } = this.refs;
    const onTransitionEnd = () => {
      this.setState(initialState);
      cardContainers.classList.remove('is-animatable', 'is-leftShifted');
      cardContainers.removeEventListener('transitionend', onTransitionEnd);
    };

    dispatch(nextCard());
    cardContainers.addEventListener('transitionend', onTransitionEnd);
    cardContainers.classList.add('is-animatable', 'is-leftShifted');
  }

  remove() {
    const { dispatch } = this.props;
    const { currentCard } = this.props;

    if (confirm('このカードを削除しますか？')) {
      dispatch(removeCard(currentCard.id)).then(() => {
        alert('カードを削除しました。');
        this.setState(initialState);
      }).catch((err) => {
        alert('カードの削除に失敗しました。');
        console.log(err);
      });
    }
  }

  onCardClick() {
    this.setState({
      prevEnabled: false,
      nextEnabled: false,
      cardAnimatable: true,
      cardFace: this.state.cardFace === 'front' ? 'back' : 'front',
    });
  }

  onCardTransitionEnd() {
    this.setState({
      prevEnabled: true,
      nextEnabled: true,
      cardAnimatable: false,
    });
  }

  render() {
    const { currentScreen, currentCard } = this.props;
    const { cardReady, cardFace, cardAnimatable } = this.state;

    return (
      <div className={classNames('Screen', 'CardScreen', { 'is-shown': currentScreen === 'Card' })}>
        <div className="CardScreen-cardContainers" ref="cardContainers">
          <div className="CardScreen-cardContainer">
            <Card />
          </div>
          <div className="CardScreen-cardContainer">
            { currentCard ?
              <Card
                data={currentCard}
                face={cardFace}
                ready={cardReady}
                animatable={cardAnimatable}
                onClick={() => this.onCardClick()}
                onTransitionEnd={() => this.onCardTransitionEnd()}
              />
            : '' }
          </div>
          <div className="CardScreen-cardContainer">
            <Card />
          </div>
        </div>
        <span className="CardScreen-prevBtn" onClick={() => this.prev()}></span>
        <span className="CardScreen-nextBtn" onClick={() => this.next()}></span>
        <span className="CardScreen-removeButton" onClick={() => this.remove()}></span>
        <a className="CardScreen-cardNewBtn" href="#/cards/new">カード追加</a>
        <DeauthButton />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentScreen: state.currentScreen,
    currentCard: state.currentCard,
  };
}

export default connect(mapStateToProps)(CardScreen);
