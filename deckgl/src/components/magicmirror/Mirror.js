import React from 'react';
import 'antd/dist/antd.css';
import Clock from './Clock'
import Navi from './Navi'
import Weather from './Weather'

class Mirror extends React.Component {
  constructor(props) {
      super(props);
      this.state ={
        height:  window.document.body.clientHeight
      }
  }
  reloadHeight = () => {
    this.setState({height: window.document.body.clientHeight})
  };
  componentDidMount() {
    window.addEventListener('resize', this.reloadHeight);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.reloadHeight)
  }
  render() {

    return (
      <div style={{
        background: 'black',
        color: 'white',
        height: '3880px',
        width: '2180px',
        overflow: 'hidden'
      }}>

        <Weather />
        <Clock />
        <Navi />
    
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '100px',
          'line-height': '2em',
          'font-size': '6em',
        }}>
          你好！欢迎来到浙江大学计算社会科学研究中心！
        </div>
      </div>
    )
  }
}

export default Mirror;