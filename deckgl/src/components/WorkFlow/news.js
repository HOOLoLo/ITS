import React, {Component} from "react";
function loadStyle(code){
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(code));
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
}


export default class App extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    debugger
        var code='        html,body{margin:0;padding:0;overflow-y:hidden;}\n' +
            '        li {\n' +
            '            list-style: none;\n' +
            '            float: left;\n' +
            '            width: 100%;/*三列图片排列*/\n' +
            '            height: 50%;\n' +
            '            margin: 0 ;\n' +
            '            overflow: hidden;/*超出隐藏*/\n' +
            '            font-size: 0;\n' +
            '        }\n' +
            '        li img {\n' +
            '            width: 100%;\n' +
            '            height: 100%\n' +
            '        }\n' +
            '        li video{\n' +
            '            width: 100%;\n' +
            '            height: 100%\n' +
            '        }\n' +
            '        ul{\n' +
            '            margin:0;padding:0\n' +
            '        }'
        loadStyle(code);
    }

    render() {

        return <ul style={{overflow:"hidden",clear:"both;"}}>
            <li>
                <video src="/content/workflow/news.mp4" autoPlay muted="muted" loop="loop"></video>
            </li>
            <li>
                <img src="/content/workflow/news_down.jpg"/>
            </li>
        </ul>

    }

}
