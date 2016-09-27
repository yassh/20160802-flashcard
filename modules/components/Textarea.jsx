import React, { PropTypes } from 'react';

class Textarea extends React.Component {
  render() {
    return (
      <textarea
        className="Textarea"
        rows={this.props.rows}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

Textarea.propTypes = {
  rows: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Textarea.defaultProps = {
  rows: '2',
  value: '',
  onChange: () => {},
};

export default Textarea;
