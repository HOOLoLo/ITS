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
        // 动态加载 css
        debugger
        var code='  html,body{margin:0;padding:0;overflow-y:hidden;}\n' +
            '    li {\n' +
            '        list-style: none;\n' +
            '        float: left;\n' +
            '        width: 16.666%;/*三列图片排列*/\n' +
            '        height: 100%;\n' +
            '        margin: 0;\n' +
            '        overflow: hidden;/*超出隐藏*/\n' +
            '\t\tfont-size: 0;\n' +
            '\n' +
            '    }\n' +
            '    li img {\n' +
            '        width: 100%;\n' +
            '        height: 100%\n' +
            '    }\n' +
            '    ul{\n' +
            '        margin:0;padding:0\n' +
            '    } '
        loadStyle(code);

    }

    render() {

        return <ul style={{overflow:"hidden",clear:"both;"}}>
            <li><img src="/content/wallpaper/6.png"/></li>
            <li><img src="/content/wallpaper/5.png"/></li>
            <li><img src="/content/wallpaper/4.png"/></li>
            <li><img src="/content/wallpaper/3.png"/></li>
            <li><img src="/content/wallpaper/2.png"/></li>
            <li><img src="/content/wallpaper/1.png"/></li>
        </ul>

    }

}
