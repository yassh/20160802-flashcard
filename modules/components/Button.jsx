import React, { PropTypes } from 'react';

class Button extends React.Component {
  render() {
    return (
      <button
        className="Button"
        type={this.props.type}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
};

export default Button;
