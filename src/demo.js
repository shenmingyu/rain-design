import React, { Component } from 'react';
import Button from './components/button';
import './demo.scss';

export default class Demo extends Component {
  render() {
    console.log('aaa')
    return (
      <div className="demo">
        <div className="demo-card">
          <div className="demo-card-title"></div>
          <div className="demo-buttons">
            <Button type="primary" plain={true} round="4px" dashed>首要</Button>
            <Button type="secondary" plain={true}>次要</Button>
            <Button type="default" plain={true}>默认</Button>
            <Button type="ghost" plain={true}>信息</Button>
            <Button type="primary" plain={false} dashed>首要</Button>
            <Button type="secondary" plain={false} round="4px">次要</Button>
            <Button type="default" plain={false}>默认</Button>
            <Button type="ghost" plain={false}>信息</Button>
          </div>
        </div>
      </div>
    )
  }
}