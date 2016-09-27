import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { addCard } from '../actions.js';
import Fieldset from '../components/Fieldset.jsx';
import Textarea from '../components/Textarea.jsx';
import Button from '../components/Button.jsx';
import Hr from '../components/Hr.jsx';
import DeauthButton from '../components/DeauthButton.jsx';

const initialState = {
  front: '',
  back: '',
  submitted: false,
};

class CardNewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onSubmit(e) {
    e.preventDefault();
    const { dispatch, currentCard } = this.props;

    const front = this.state.front.trim();
    if (!front) {
      alert('表を記入してください。');
      return;
    }

    const back = this.state.back.trim();
    if (!back) {
      alert('裏を記入してください。');
      return;
    }

    this.setState({ submitted: true });
    dispatch(addCard({ front, back })).then(() => {
      alert('カードを追加しました。');
      this.setState(initialState);
      location.hash = `/cards/${currentCard.id}`;
    }).catch((err) => {
      alert('カードの追加に失敗しました。');
      this.setState({ submitted: false });
      console.log(err);
    });
  }

  render() {
    const { currentScreen } = this.props;
    const { front, back, submitted } = this.state;

    return (
      <div className={classNames('Screen', 'CardNewScreen', { 'is-shown': currentScreen === 'CardNew' })}>
        <form className="CardNewScreen-form" onSubmit={(e) => this.onSubmit(e)}>
          <Fieldset legend="表">
            <Textarea value={front} onChange={(e) => this.setState({ front: e.target.value })} />
          </Fieldset>
          <Fieldset legend="裏">
            <Textarea value={back} onChange={(e) => this.setState({ back: e.target.value })} />
          </Fieldset>
          <Hr />
          <Fieldset>
            <Button type="submit" disabled={submitted}>追加</Button>
          </Fieldset>
        </form>
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

export default connect(mapStateToProps)(CardNewScreen);
