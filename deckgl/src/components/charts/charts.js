import { Bar } from '@antv/g2plot';
import { Line } from '@antv/g2plot';
import {Component} from 'react';
import React,{Fragment} from 'react';






let data = [
];


const background={
    width: "300px",
    margin: "30px auto",
    backgroundColor: "#FFFFFF",  //驼峰法
    minHeight: "50px",
    boxSizing: "border-box",
    position: "fixed",
    top: "400px"

};

export default class Charts extends Component{
    constructor(props){
        super(props);
        data=props.data;
    }

    componentDidMount() {
        const line = new Line('line', {
            data,
            xField: 'time',
            yField: 'speed',
        });

        line.render();
    }

    render() {
        return (
            <container>
                <div id={'background'} style ={background}>
                    <div id={'line'}/>
                </div>
            </container>
        )
    }
}
