import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

class NotFoundScreen extends React.Component {
  render() {
    const { currentScreen } = this.props;

    return (
      <div className={classNames('Screen', 'NotFoundScreen', { 'is-shown': currentScreen === 'NotFound' })}>Not Found</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentScreen: state.currentScreen,
  };
}

export default connect(mapStateToProps)(NotFoundScreen);
