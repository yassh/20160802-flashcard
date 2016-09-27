import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

class LoadingScreen extends React.Component {
  render() {
    const { currentScreen } = this.props;

    return (
      <div className={classNames('Screen', 'LoadingScreen', { 'is-shown': currentScreen === 'Loading' })}>読み込み中</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentScreen: state.currentScreen,
  };
}

export default connect(mapStateToProps)(LoadingScreen);
