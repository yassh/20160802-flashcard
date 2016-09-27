import React, { PropTypes } from 'react';
import { deauth } from '../api.js';

class DeauthButton extends React.Component {
  onClick() {
    if (confirm('APIとの接続を解除しますか？')) {
      deauth();
      location.hash = '/auth';
    }
  }

  render() {
    return (
      <button className="DeauthButton" onClick={() => this.onClick()}></button>
    );
  }
}

export default DeauthButton;
