
import React, {Component} from "react";

const width = 4500;
const height = 1920;
// const margin = { top: 20, right: 200, bottom: 65, left: 150 };

const circle=[[10,100],[200,300],[400,300],[300,500]];

export default class App extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {

        return <video src="/content/workflow/conclusion.mp4" autoPlay muted loop id="video"/>

    }

}
