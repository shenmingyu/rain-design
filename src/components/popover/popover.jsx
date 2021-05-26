import React from 'react';
import PropTypes from 'prop-types';

import { pfxCls } from '../../config';
import './style/index.scss';

// const directionToFlex = {
//   'top': 'column-reverse',
//   'bottom': 'column',
//   'left': 'row-reverse',
//   'right': 'row'
// }
const directionToFlex = {
  'top': '',
  'topLeft': '',
  'topRight': '',
  'bottom': '',
  'bottomLeft': '',
  'bottomRight': '',
  'left': '',
  'leftTop': '',
  'leftBottom': '',
  'right': '',
  'rightTop': '',
  'rightBottom': '',
}


export default class Popover extends React.Component {
  static propTypes = {
    trigger: PropTypes.oneOf(['click', 'hover']),
    content: PropTypes.node,
    direction: PropTypes.oneOf([
      'top', 'topLeft', 'topCenter', 'topRight',
      'bottom', 'bottomLeft', 'bottomCenter', 'bottomRight',
      'left', 'leftTop', 'leftCenter', 'leftBottom',
      'right', 'rightTop', 'rightCenter', 'rightBottom']),
    bulletStyle: PropTypes.object,
    mainStyle: PropTypes.object,
    arrow: PropTypes.bool,
    arrowColor: PropTypes.string,
    popoverBorder: PropTypes.bool,
  };

  static defaultProps = {
    trigger: 'hover',
    direction: 'top',
    arrowColor: '#FFFFFF',
    arrow: true,
    popoverBorder: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      pfxCls: `${pfxCls}-popover`,
      display: false
    };

    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.ref = React.createRef();
  }

  componentWillUnmount() {
    this.bulletBox && this.bulletBox.destroy();
  }

  onClick() {
    const { trigger } = this.props;
    if (trigger !== 'click') {
      return;
    }
    this.setState(prevState => ({ display: !prevState.display }));
  }

  onMouseEnter(e) {
    const { trigger, onMouseEnter } = this.props;
    if (trigger !== 'hover') {
      return;
    }
    this.setState({ display: true });
    typeof onMouseEnter === 'function' && onMouseEnter(e);
  }

  onMouseLeave(e) {
    const { trigger, onMouseLeave } = this.props;
    if (trigger !== 'hover') {
      return;
    }
    this.setState({ display: false });
    typeof onMouseLeave === 'function' && onMouseLeave(e);
  }

  render() {
    const { pfxCls, display } = this.state;
    const { children, content, direction, arrow, bulletStyle, mainStyle, arrowColor } = this.props;
    const checkTop = /^top/i;
    const checkBottom = /^bottom/i;
    const checkLeft = /^left/i;
    const checkRight = /^right/i;
    return (
      <div
        className={pfxCls}
        onClick={this.onClick}
        ref={this.ref}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {display && arrow && content ?
          <React.Fragment>
            <div className={`${pfxCls}-arrow`} data-direction={`${direction}`}
              style={{
                borderColor:
                  !checkTop.test(direction) ?
                    !checkRight.test(direction) ?
                      !checkBottom.test(direction) ?
                        !checkLeft.test(direction) ?
                          null
                          : `transparent transparent transparent ${arrowColor}`
                        : `transparent transparent ${arrowColor} transparent`
                      : `transparent ${arrowColor} transparent transparent`
                    : `${arrowColor} transparent transparent transparent`
              }}>
            </div>
            <div className={`${pfxCls}-shadow`} data-direction={`${direction}`}></div>
          </React.Fragment>
          : null
        }
        { children}
        <div
          style={{ display: display ? 'flex' : 'none', flexDirection: directionToFlex[direction], ...bulletStyle }}
          className={`${pfxCls}-bulletbox`}
          data-direction={`${direction}`}
        >
          <div className={`${pfxCls}-bulletbox-top`} data-direction={`${direction}`}></div>
          <div className={`${pfxCls}-bulletbox-main`} data-direction={`${direction}`} style={{ ...mainStyle }}>
            {content}
          </div>
        </div>
      </div >
    );
  }
}