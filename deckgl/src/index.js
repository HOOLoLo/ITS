import React,{Fragment}from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route,  Switch,Link } from 'react-router-dom'

import {City} from './components/city/city';
import RouteMap from "./components/routeMap";
import Covid from "./components/covid-19";
import AirQuality from "./components/airQuality";
import {StreamG} from "./components/streamgraph/main";
import {BarG} from "./components/Barchart/main";
import {Panel} from "./components/panel/control";
import LineChart from "./components/lineChart/main";
import './index.css';
import Ad from "./components/sliderexample"
import News from "./components/WorkFlow/news"
import Welcome from "./components/front_glass/welcome"
import Wallpaper from "./components/front_glass/wallpaper.js"

const map = document.getElementById("map");

function Getpage(){
    return (
        <Router>
            <Route>
                <Route exact path="/">
                    <RouteMap />
                </Route>
                <Route path="/covid">
                    <Covid />
                </Route>
                <Route path="/airquality">
                    <AirQuality />
                </Route>
                <Route path="/bubble">
                    <City />
                </Route>
                <Route path="/stream">
                    <StreamG />
                </Route>
                <Route path="/bar">
                    <BarG />
                </Route>
                <Route path="/control">
                    <Panel/>
                </Route>
                <Route path={"/slider"}>
                    <Ad/>
                </Route>
                <Route path={"/news"}>
                    <News/>
                </Route>
                <Route path={"/news"}>
                    <News/>
                </Route>
                <Route path={"/welcome"}>
                    <Welcome/>
                </Route>
                <Route path={"/wallpaper"}>
                    <Wallpaper/>
                </Route>
            </Route>
        </Router>
    )
}


// getData();

// ReactDOM.render(
//         <Map />,
//     map
// );

ReactDOM.render(
    <Getpage />,
    map
)

// ReactDOM.render(
//     <Getpage/>
//     ,map
// )
