import React, { PropTypes } from 'react';
import classNames from 'classnames';

class Card extends React.Component {
  render() {
    const { data, onClick, onTransitionEnd } = this.props;
    const className = classNames({
      Card: true,
      'is-backShown': this.props.face === 'back',
      'is-ready': this.props.ready,
      'is-animatable': this.props.animatable,
    });

    return (
      <div className={className} onClick={onClick} onTransitionEnd={onTransitionEnd}>
        <div className="Card-front">{data.front}</div>
        <div className="Card-back">{data.back}</div>
      </div>
    );
  }
}

Card.defaultProps = {
  data: {
    id: '',
    front: '',
    back: '',
  },
  onClick: () => {},
  onTransitionEnd: () => {},
  face: 'front',
  ready: true,
  animatable: false,
};

export default Card;
