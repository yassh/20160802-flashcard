import React, { PropTypes } from 'react';

class Input extends React.Component {
  render() {
    return (
      <input
        className="Input"
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => {},
};

export default Input;
