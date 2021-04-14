
import {Component} from 'react';
import React,{Fragment} from 'react';

import {Slider} from 'antd'

const style = {
    display: 'inline-block',
    height: 200,
    width: 300,
    marginLeft: 70,
};

const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
        style: {
            color: '#f50',
        },
        label: <strong>100°C</strong>,
    },
};

export default class Panel extends Component{
    constructor(props){
        super();
    }
    componentDidMount() {

    }
    render() {
        return (
            <container>
                <div style={style}>
                    <Slider vertical defaultValue={30} />
                </div>
            </container>
        )
    }
}
