import React, { PropTypes } from 'react';

class Fieldset extends React.Component {
  render() {
    return (
      <div className="Fieldset">
        {this.props.legend ?
          <div className="Fieldset-legend">{this.props.legend}</div>
        : ''}
        <div className="Fieldset-controls">{this.props.children}</div>
      </div>
    );
  }
}

Fieldset.propTypes = {
  legend: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Fieldset;
