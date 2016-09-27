import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { changeScreen, fetchCards } from '../actions.js';
import { auth } from '../api.js';
import Fieldset from '../components/Fieldset.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import Hr from '../components/Hr.jsx';

const initialState = {
  apiUrl: '',
  apiKey: '',
  apiSecret: '',
  submitted: false,
};

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { apiUrl, apiKey, apiSecret } = this.state;

    this.setState({ submitted: true });
    auth(apiUrl, apiKey, apiSecret).then(() => {
      alert('APIとの接続に成功しました。');
      this.setState(initialState);

      dispatch(changeScreen('Loading'));
      dispatch(fetchCards()).then(() => {
        location.hash = '/';
      }).catch((err) => {
        alert('カードの読み込みに失敗しました。');
        console.log(err);
      });
    }).catch((err) => {
      alert('APIとの接続に失敗しました。');
      this.setState({ submitted: false });
      console.log(err);
    });
  }

  render() {
    const { currentScreen } = this.props;
    const { apiUrl, apiKey, apiSecret, submitted } = this.state;

    return (
      <div className={classNames('Screen', 'AuthScreen', { 'is-shown': currentScreen === 'Auth' })}>
        <form className="AuthScreen-form" onSubmit={(e) => this.onSubmit(e)}>
          <Fieldset legend="API URL">
            <Input type="text" value={apiUrl} onChange={(e) => this.setState({ apiUrl: e.target.value })} />
          </Fieldset>
          <Fieldset legend="API key (必要なら)">
            <Input type="text" value={apiKey} onChange={(e) => this.setState({ apiKey: e.target.value })} />
          </Fieldset>
          <Fieldset legend="API secret (必要なら)">
            <Input type="password" value={apiSecret} onChange={(e) => this.setState({ apiSecret: e.target.value })} />
          </Fieldset>
          <Hr />
          <Fieldset>
            <Button type="submit" disabled={submitted}>接続</Button>
          </Fieldset>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentScreen: state.currentScreen,
  };
}

export default connect(mapStateToProps)(AuthScreen);
