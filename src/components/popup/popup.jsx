import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './style/index.scss'
import { cloneDeep } from 'lodash';

const defaultOptions = {
  type: 'default', // success, danger, warning, default
  duration: 'default', // short, default, long, infinite, customNumbers: 100,200,300...
  position: 'top', // top, bottom, center, topLeft, topRight
  animation: 'none', // none, fade, slide
};

const durationTimeMap = {
  short: 300,
  default: 1500,
  long: 3000,
}

class Popup extends Component {
  static propTypes = {
  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      classPrefix: 'rain-design',
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
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
          console.log(unmountResult);
          if (unmountResult && child.parentNode) {
            child.parentNode.removeChild(child);
          }
        }
      });
    }

  }

  render() {
    const { type, position, content, style, animation } = this.props;
    return (
      <div
        className={classNames(
          `rain-design-popup`,
          `rain-design-popup-${type}`,
          `rain-design-popup-${position}`,
          `rain-design-popup-${animation}`,
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
  const { duration } = options;
  const defaultOption = cloneDeep(defaultOptions);
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
  // 将新的Toast挂载至新结点
  ReactDOM.render(
    <Popup content={content} popupContainer={popupContainer} {...Object.assign(defaultOption, options)} />,
    popupContainer
  );
  // 根据 duration 进行销毁实例的事件，如果有动画效果，则需要考虑动画效果的时间长度
  if (duration !== 'infinite')
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(popupContainer);
    }, typeof duration === 'string' ? durationTimeMap[duration] : duration);
};

export default Popup;