import React from 'react';
import 'antd/dist/antd.css';
import Clock from './Clock'
import Navi from './Navi'
import Weather from './Weather'

class Mirror extends React.Component {
  
  render() {
    return (
      <div className='fullscreen'>
        <Weather />
        <div className='time'>
          <Clock />
        </div>
        <div className='weather'>
        </div>
        <div className='bot'>
          <Navi />
        </div>
        <div className='wel'>
          你好！欢迎来到浙江大学计算社会科学研究中心！
        </div>
      </div>
    )
  }
}

export default Mirror;