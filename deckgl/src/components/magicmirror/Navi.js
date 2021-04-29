import React from 'react';
import { Menu , Button} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined, 
    PictureOutlined,
    CalendarOutlined,
    ControlOutlined,
  } from '@ant-design/icons';
import St from './St';
import Appo from './Appo'
import {Panel} from '../panel/control'
  


export default class Navi extends React.Component {

    state = {
        collapsed: false,
        key: 1,
    };

    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };

    changeStyle = function (elem, name, value) {
        elem.style[name] = value;
    }

    handleClick = e => {
        console.log('点击事件', 1)
        this.setState({
            key: e.key
        })
    };

    render() {
        return (
            <div style={{
                position: 'absolute',
                top: '300px',
                left: '20px',
                width: '100%'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    }}>
                    {/* <Button type="primary" onClick={this.toggleCollapsed} size='large' style={{ marginBottom: 16 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button> */}
                    <Menu
                        className='menu'
                        onClick={this.handleClick}
                        defaultSelectedKeys={['1']}
                        theme="dark"
                        mode="vertical"
                        inlineCollapsed="true">
                        <Menu.Item key="1" icon={<PictureOutlined />}>
                            风格迁移
                        </Menu.Item>
                        <Menu.Item key="2" icon={<CalendarOutlined />}>
                            参观预约
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ControlOutlined />}>
                            控制面板       
                        </Menu.Item> 
                    </Menu>
                </div>

                <div style = {{
                    position: 'absolute',
                    top: '300px',
                    left: '300px',
                    width: '800px',
                }}>
                    {
                        this.state.key == 1?
                            (<div className='b1'> 
                                <St />
                            </div>)
                            :
                            this.state.key == 2?
                                (<div className='b2'>
                                    <Appo />
                                </div>)
                                :
                                (<div style={{
                                    position: 'absolute',
                                    top: '40px',
                                    left: '280px'
                                }}>
                                    <Panel />
                                </div>)
                    }
                </div>
                
            </div>
        )
    }
}