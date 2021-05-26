import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import { pfxCls } from '../../config';
import '../../config';
import './style/index.scss';

const defaultOptions = {
  type: 'default', // success, danger, warning, default
  duration: 'default', // short, default, long, infinite, customNumbers: 100,200,300...
  position: 'top', // top, bottom, center, topLeft, topRight
  animation: 'none', // none, fade, slide
};

const durationTimeMap = {
  short: 1500,
  default: 3000,
  long: 5000,
}

const animationDuration = parseFloat(getComputedStyle(document.body).getPropertyValue('--popup-open-close-animation-duration')) * 1000;

class Popup extends Component {
  static propTypes = {
    type: PropTypes.string,
    duration: PropTypes.oneOfType([String, Number]),
    position: PropTypes.oneOf(['top', 'bottom', 'center', 'topLeft', 'topRight']),
    animation: PropTypes.oneOf(['none', 'fade', 'slide']),
    content: PropTypes.any,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      classPrefix: `${pfxCls}-popup`,
      display: true,
    }
  }

  componentDidMount() {
    const { duration } = this.props
    console.log(duration, durationTimeMap[duration]);
    // 挂载的同时创建一个定时器，根据props中的duration进行动画控制
    if (duration !== 'infinite') {
      this.popupTimeout = setTimeout(() => {
        this.setState({ display: false });
        this.animationTimeout = setTimeout(() => {
        }, animationDuration);
      }, typeof duration === 'string' ? durationTimeMap[duration] - animationDuration : duration - animationDuration);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.popupTimeout);
    clearTimeout(this.animationTimeout);
    this.removePopupListContainer();
  }

  removePopupListContainer = () => {
    // 清除其他的 Popup 遍历body子元素
    const bodyChildren = [...document.body.children];
    // options 中的必需变量提取
    if (bodyChildren.length) {
      bodyChildren.forEach(child => {
        if (child.classList.contains('rain-design-popup-list')) {
          let unmountResult = ReactDOM.unmountComponentAtNode(child);
          if (unmountResult && child.parentNode) {
            child.parentNode.removeChild(child);
          }
        }
      });
    }
  }

  render() {
    const { display, classPrefix } = this.state;
    const { type, position, content, style, animation } = this.props;
    return (
      <div
        className={classNames(
          `${classPrefix}`,
          `${classPrefix}-${type}`,
          `${classPrefix}-${position}`,
          `${classPrefix}-${animation}`,
          display ? `${classPrefix}-show` : `${classPrefix}-hide`,
        )}
        style={style}
      >
        {content}
      </div>
    );
  }
}

// 实例化使用函数
Popup.show = (content, options = {}) => {
  const defaultOption = cloneDeep(defaultOptions);
  const totalOptions = Object.assign(defaultOption, options);
  const { duration } = totalOptions;
  // 首先创建一个 Popup 实例
  const popupContainer = document.createElement('div');
  // 清除其他的 Popup 遍历body子元素
  const bodyChildren = [...document.body.children];
  // options 中的必需变量提取
  if (bodyChildren.length) {
    bodyChildren.forEach(child => {
      if (child.classList.contains('rain-design-popup-list')) {
        let unmountResult = ReactDOM.unmountComponentAtNode(child);
        console.log(unmountResult);
        if (unmountResult && child.parentNode) {
          child.parentNode.removeChild(child);
        }
      }
    });
  }
  // 用来删除的标记
  popupContainer.classList.add('rain-design-popup-list');
  document.body.appendChild(popupContainer);
  // 将新的 Popup 挂载至新结点
  ReactDOM.render(
    <Popup content={content} popupContainer={popupContainer} {...totalOptions} />,
    popupContainer
  );
  // 根据 duration 进行销毁实例的事件，动画效果的控制在 componentDidMount 中进行设置
  if (duration !== 'infinite') {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(popupContainer);
    }, typeof duration === 'string' ? durationTimeMap[duration] : duration);
  }
};

export default Popup;