import * as React from 'react';
import {Slider} from 'baseui/slider';
const background={
    width: "30%",
    margin: "30px auto",
    backgroundColor: "#FFFFFF",
    // ["#FF895D","#FF6836","#F3470D","#D13808","#A4300C","#7A270E"],
    minHeight: "0px",
    boxSizing: "border-box",
    position: "fixed",
    // top: "80%",
    bottom:"10%",
    border:"10px",
    dashed: "#FF6836",
    opacity:1,
    zIndex:1
};
export default () => {
    const [value, setValue] = React.useState([60]);
    return (
        <div id={'background'} style ={background}>
            <Slider
                value={value}
                onChange={({ value }) => value && setValue(value)}
                onFinalChange={({ value }) => console.log(value)}
            />
        </div>
    );
};
