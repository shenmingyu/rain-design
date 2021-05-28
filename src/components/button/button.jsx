import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { pfxCls } from '../../config';

import './style/index.scss';

class Button extends Component {
  static propTypes = {
    children: PropTypes.any,
    type: PropTypes.oneOf([
      // 常用
      'primary',
      'secondary',
      'default',
      'ghost',
      // 变化类
      // 不常用
      'success',
      'warning',
    ]),
    size: PropTypes.oneOf([
      'large',
      'big',
      'normal',
      'small',
      'tiny',
      'customize'
    ]),
    style: PropTypes.object,
    round: PropTypes.string,
    mimetic: PropTypes.bool,  // 暂不考虑，后期增加拟态颜色后再修改
    disabled: PropTypes.bool,
    danger: PropTypes.bool,
    loading: PropTypes.bool,
    circle: PropTypes.bool,
    spread: PropTypes.bool,
    plain: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    type: 'primary',
    size: 'normal',
    style: {},
    round: '0px',
    mimetic: false,
    disable: false,
    danger: false,
    loading: false,
    circle: false,
    spread: false,
    plain: false,
    onClick: () => { },
  }

  constructor(props) {
    super(props);
    this.state = {
      pfxCls: `${pfxCls}-button`,
    }
  }

  // 点击函数
  onClick(event) {
    const { onClick } = this.props;
    typeof onClick === 'function' && onClick(event);
  }

  // ？ 触碰函数
  onHover(event) {

  }

  render() {
    const { pfxCls } = this.state;
    const { children, type, size, style, round, mimetic, disabled, danger, loading, circle, spread, plain, dashed } = this.props;
    return (
      <div
        className={classNames(pfxCls, {
          [`${pfxCls}-${type}`]: !!type,
          [`${pfxCls}-${size}`]: !!size,
          [`${pfxCls}-loading`]: loading,
          [`${pfxCls}-danger`]: danger, // danger 属性生效时，会强制当前按钮颜色为红色
          [`${pfxCls}-dashed`]: dashed,   // dashed 属性生效时，会将边框设置为虚线
          [`${pfxCls}-circle`]: circle,
          [`${pfxCls}-mimetic`]: mimetic,
          [`${pfxCls}-disabled`]: disabled,
          [`${pfxCls}-spread`]: spread, // 当 spread 属性生效时，添加点击时的博文扩散效果
        })}
        data-plain={plain}
        style={{ ...style, borderRadius: round }}
        onClick={(event) => this.onClick(event)}
      >
        {
          loading ?
            (<i class="fa fa-spinner" aria-hidden="true"></i>,
              children)
            : children
        }
      </div>
    )
  }
}

export default Button;