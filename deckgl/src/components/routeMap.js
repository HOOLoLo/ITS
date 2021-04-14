// /// app.js
import React,{Fragment} from 'react';
import DeckGL from '@deck.gl/react';
import {TripsLayer} from '@deck.gl/geo-layers';
import {StaticMap} from 'react-map-gl';
import * as d3 from 'd3'
import F2 from '@antv/f2';
import {WebMercatorViewport} from '@deck.gl/core';
import { Radar } from '@antv/g2plot';
import _ from 'lodash';
//
// // Set your mapbox access token here
// const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiemhpZ3VhbmdkYSIsImEiOiJjanozdXg0b3EwMHh4M21tcXk2MHlpN3B1In0.lInf8zFl2BsP_bDjMFhf3w';
//
// // Initial viewport settings
// const initialViewState = {
//     longitude: -122.41669,
//     latitude: 37.7853,
//     zoom: 13,
//     pitch: 0,
//     bearing: 0
// };
//
// // Data to be used by the LineLayer
// const data = [   {
//              waypoints: [{coordinates: [-122.3907988, 37.7664413], timestamp: 1554772579000},
//                      {coordinates: [-122.3908298,37.7667706], timestamp: 1554772579010},
//                      {coordinates: [-122.4485672, 37.8040182], timestamp: 1554772580200}
//              ]
//      }];
//
// class App extends React.Component {
//     render() {
//         const layers = [
//             new TripsLayer({id: 'trips-layer', data,
//                 getPath:d => d.waypoints.map(p => p.coordinates),
//                 getTimestamps: d => d.waypoints.map(p => p.timestamp - 1554772579000),
//                 getColor: [253, 128, 93],
//                 opacity: 0.8,
//                 widthMinPixels: 5,
//                 rounded: true,
//                 trailLength: 200,
//                 currentTime: 0
//
//             })
//         ];
//
//         return (
//             <DeckGL
//                 initialViewState={initialViewState}
//                 controller={true}
//                 layers={layers}
//             >
//                 <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
//             </DeckGL>
//         );
//     }
// }
// ReactDOM.render(<App />, document.getElementById('root'));
import {Component} from 'react';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import {PathLayer,ColumnLayer, PolygonLayer,IconLayer,ScatterplotLayer,ArcLayer} from '@deck.gl/layers';
import SliderTraffic from "./sliderTraffic";
import { Select,SIZE } from "baseui/select";
import {BaseProvider, LightTheme, styled} from "baseui";
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import { SelectionLayer } from '@nebula.gl/layers';
import { EditableGeoJsonLayer} from 'nebula.gl';
import Charts from './charts/charts'
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import Panel from "./charts/panel";
import { DrawPolygonMode } from "@nebula.gl/edit-modes";
import { Toolbox } from "@nebula.gl/editor";
import 'boxicons'
import {Bar, Pie, Area, Column} from '@antv/g2plot';
import { G2,Line } from '@antv/g2plot';
import {keys} from "@material-ui/core/styles/createBreakpoints";



const piedata=[
    {type:'0-10',value:0},
    {type:'10-20',value:0},
    {type:'20-30',value:0},
    {type:'30-40',value:0},
    {type:'40-50',value:0},
    {type:'50-60',value:0},
    {type:'60-70',value:0},
    {type:'70-80',value:0},
    {type:'80-90',value:0},
    {type:'90-100',value:0},
    {type:'100-110',value:0},
    {type:'110-120',value:0},
    {type:'120+',value:0},

    ];


function getpie(){
    return new Promise(resolve => {
    Beijingdata.forEach(d=>{
        if (d['value']>=0&&d['value']<10)piedata[0].value++;
        else if(d['value']>=10&&d['value']<20)piedata[1].value++;
        else if(d['value']>=20&&d['value']<30)piedata[2].value++;
        else if(d['value']>=30&&d['value']<40)piedata[3].value++;
        else if(d['value']>=40&&d['value']<50)piedata[4].value++;
        else if(d['value']>=50&&d['value']<60)piedata[5].value++;
        else if(d['value']>=60&&d['value']<70)piedata[6].value++;
        else if(d['value']>=70&&d['value']<80)piedata[7].value++;
        else if(d['value']>=80&&d['value']<90)piedata[8].value++;
        else if(d['value']>=90&&d['value']<100)piedata[9].value++;
        else if(d['value']>=100&&d['value']<110)piedata[10].value++;
        else if(d['value']>=110&&d['value']<120)piedata[11].value++;
        else if(d['value']>=120)piedata[12].value++;
    });
    resolve();
    })
}
// import {
//     Editor,
//     EditingMode,
//     DrawLineStringMode,
//     DrawPolygonMode,
// } from "react-map-gl-draw";


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



const SelectContainer=styled('div',{
    position: 'absolute',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    zIndex: 1,
    top: '50px',
    right:'10px',
    width:'15%',
    // height:'5%'
});
const SelectContainer2=styled('div',{
    position: 'absolute',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    zIndex: 1,
    top: '50px',
    left:'10px',
    width:'15%',
    // height:'5%'
});

const engine = new Styletron();
// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiemhpZ3VhbmdkYSIsImEiOiJjanozdXg0b3EwMHh4M21tcXk2MHlpN3B1In0.lInf8zFl2BsP_bDjMFhf3w';

//加载区域数据
var depData=[];
var depCenter=[];
let desCenter=[];
let desData=[];
let depPolygon=[];
let desPolygon=[];

let colorTable=[[128,255,0,255],[255,255,40,255],[255,128,0,255],[255,64,64,255],[255,0,0,255]];
const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 32, height: 32, mask: true}
};
// Source data CSV
// const DATA_URL = {
//     BUILDINGS:
//         'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/buildings.json', // eslint-disable-line
//     TRIPS:
//         'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/trips-v7.json' // eslint-disable-line
// };

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0
});

const pointLight = new PointLight({
    color: [255, 255, 255],
    intensity: 2.0,
    position: [120.167057, 30.185901, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight});

const material = {
    ambient: 0.1,
    diffuse: 0.9,
    shininess: 64,
    specularColor: [60, 64, 70]
};
const DEFAULT_THEME = {
    buildingColor: [74, 80, 87],
    trailColor0: [253, 128, 93],
    trailColor1: [23, 184, 190],
    material,
    effects: [lightingEffect]
};
const INITIAL_VIEW_STATE = {
    longitude:  120.207057,
    latitude: 30.225901,
    // longitude:-74.00823,
    // latitude: 40.71351,
    zoom: 12.4,
    pitch: 45,
    bearing: 0
};


const BEIJIN_VIEW_STATE ={
    longitude:  116.39739990234375,
    latitude: 39.915002988576155,
    // longitude:-74.00823,
    // latitude: 40.71351,
    zoom: 12.4,
    pitch: 45,
    bearing: 0
}
//柱状图的颜色
const colorRange = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
];
// d3.json("https://api.openaq.org/v1/latest?limit=10000").then(data=>{
//     console.log(data)
// })
var Routes=[];
function Rad(d){
    return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}


var getDistance=function(lng1,lat1,lng2,lat2){
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var  b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    //s=s.toFixed(4);
    return s;
};

// var od=[];

function getRouteByTime(time){
    let data=[];
    d3.json("http://10.72.100.14:8888/query/"+time).then(d=>{
            let pAll=[];
            d.map((dd,index)=>{
                setInterval(index*10);
                pAll.push(new Promise((resolve,reject)=>{
                    var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + dd[3] + ',' + dd[4] + ';' + dd[5] + ',' + dd[6] + '?steps=true&geometries=geojson&access_token=' + 'pk.eyJ1IjoiemhpZ3VhbmdkYSIsImEiOiJjanozdXg0b3EwMHh4M21tcXk2MHlpN3B1In0.lInf8zFl2BsP_bDjMFhf3w';
                    var req = new XMLHttpRequest();
                    req.open('GET', url, true);
                    req.send();
                    req.onload=function () {
                        var json = JSON.parse(req.response);
                        data.push(json);
                        console.log('oneRoute:',json);
                        resolve()
                    };
                    req.ontimeout=function () {
                        reject()
                    }
                }))

            })
            Promise.all(pAll).then(()=>{
                // console.log('queryroute:',data)
                console.log(JSON.stringify(data))

            },()=>{
                // console.log('queryroute:',data)
                console.log(JSON.stringify(data))

            })
    });

    setTimeout(()=>{
        console.log(JSON.stringify(data))
    },70000)
}

function gerRouteByPoint(start,end){

}

// getRouteByTime(1584);


var getRoutedata=function(start,end) {

    var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + depCenter[start][0] + ',' + depCenter[start][1] + ';' + desCenter[end][0] + ',' + desCenter[end][1] + '?steps=true&geometries=geojson&access_token=' + 'pk.eyJ1IjoiemhpZ3VhbmdkYSIsImEiOiJjanozdXg0b3EwMHh4M21tcXk2MHlpN3B1In0.lInf8zFl2BsP_bDjMFhf3w';

    // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.send();
    req.onload = function () {
        var json = JSON.parse(req.response);
        // console.log('route:',json)
        var data = json.routes[0];
        var route = data.geometry.coordinates;
        var timestamps=[0];//先设置每条路径1000stamp
        for(var i=0;i<route.length;i++){
            if(i!==0){
                var dist=getDistance(route[i-1][0],route[i-1][1],route[i][0],route[i][1])*50;
                timestamps.push(dist+timestamps[i-1])
            }
        }
        var geojson = {
            'path': route,
            'timestamps':timestamps,
        };
        console.log(geojson);
        Routes.push(geojson)

    }
};
//getRoutedata([120.167057,30.185901], [120.302548	,30.399632])
// var getRoute=new function(time) {
//     // var gets = [];
//     d3.csv("./edge_dep_csv.csv").then(function (data) {
//
//         let re=/([-+]?[0-9]*\.?[0-9]+)/g;
//         console.log('data1:',data)
//         data.forEach(d=>{
//             let tmp=d.value.match(re)
//             let tmpData=[];
//             for(let i=0;i<tmp.length-1;i+=2){
//                 tmpData.push([parseFloat(tmp[i+1]),parseFloat(tmp[i])])
//             }
//             depData.push(tmpData)
//         })
//         depData.forEach(d=>{
//             let sumlong=0
//             let sumlat=0;
//             d.forEach(data=>{
//                 sumlong+=data[0];
//                 sumlat+=data[1];
//             })
//             depCenter.push([sumlong/d.length,sumlat/d.length])
//         })
//         d3.csv("./edge_des_csv.csv").then(function (data) {
//             let re=/([-+]?[0-9]*\.?[0-9]+)/g
//             console.log('data2:',data)
//             data.forEach(d=>{
//                 let tmp=d.value.match(re)
//                 let tmpData=[];
//                 for(let i=0;i<tmp.length-1;i+=2){
//                     tmpData.push([parseFloat(tmp[i+1]),parseFloat(tmp[i])])
//                 }
//                 desData.push(tmpData)
//             })
//             desData.forEach(d=>{
//                 let sumlong=0;
//                 let sumlat=0;
//                 d.forEach(data=>{
//                     sumlong+=data[0];
//                     sumlat+=data[1];
//                 })
//                 desCenter.push([sumlong/d.length,sumlat/d.length])
//             });
//             // d3.json('http://localhost:5000/data/12:00:00').then(function(data){
//             //     data.forEach(d=>{
//             //         var tmp=d.split(',');
//             //         if(tmp[0]!=-1 && tmp[1]!=-1) {
//             //             if(tmp[0]>46&&tmp[0]<=60){
//             //              //   if (tmp[2] !== '0') {
//             //                 var urlNow = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + depCenter[tmp[0]][0].toFixed(6) + ',' + depCenter[tmp[0]][1].toFixed(6) + ';' + desCenter[tmp[1]][0].toFixed(6) + ',' + desCenter[tmp[1]][1].toFixed(6) + '?steps=true&geometries=geojson&access_token=' + MAPBOX_TOKEN;
//             //                 gets.push($.ajax({
//             //                     type: 'GET',
//             //                     url: urlNow,
//             //                     success: function (r) {
//             //                         console.log('r:', r)
//             //                         //var json = JSON.parse(data);
//             //                         var plan = r.routes[0];
//             //                         var route = plan.geometry.coordinates;
//             //                         var timestamps = [0];//先设置每条路径1000stamp
//             //                         for (var i = 0; i < route.length; i++) {
//             //                             if (i !== 0) {
//             //                                 var dist = getDistance(route[i - 1][0], route[i - 1][1], route[i][0], route[i][1]) * 50;
//             //                                 timestamps.push(dist + timestamps[i - 1])
//             //                             }
//             //                         }
//             //                         var geojson = {
//             //                             'vendor': 1,
//             //                             'path': route,
//             //                             'timestamps': timestamps,
//             //
//             //                         };
//             //                         console.log(geojson)
//             //                         Routes.push(geojson)
//             //                         saveJson[tmp[0]+','+tmp[1]] = geojson
//             //                     },
//             //                     error:function(){
//             //                         console.log('err')
//             //                     }
//             //                 }));
//             //
//             //            // }
//             //             }
//             //         }
//             //     })
//             //     // url.forEach(function(value) {
//             //     //     console.log('url:',value)
//             //     //     gets.push($.ajax({
//             //     //         type: 'GET',
//             //     //         url: value,
//             //     //         success: function(data) {
//             //     //             console.log('data:',data)
//             //     //             //var json = JSON.parse(data);
//             //     //             var plan = data.routes[0];
//             //     //             var route = plan.geometry.coordinates;
//             //     //             var timestamps=[0];//先设置每条路径1000stamp
//             //     //             for(var i=0;i<route.length;i++){
//             //     //                 if(i!==0){
//             //     //                     var dist=getDistance(route[i-1][0],route[i-1][1],route[i][0],route[i][1])*50;
//             //     //                     timestamps.push(dist+timestamps[i-1])
//             //     //                 }
//             //     //             }
//             //     //             var geojson = {
//             //     //                 'vendor':1,
//             //     //                 'path': route,
//             //     //                 'timestamps':timestamps,
//             //     //
//             //     //             };
//             //     //             console.log(geojson)
//             //     //             Routes.push(geojson)
//             //     //
//             //     //
//             //     //         }
//             //     //     }));
//             //     // });
//             //
//             //     $.when.apply($, gets).then(function() {
//             //         console.log(saveJson)
//             //         var jsonData=JSON.stringify(saveJson)
//             //         download(jsonData,'route.json','text/plain')
//             //         console.log('Routes:',Routes)
//             //         resolve(Routes);
//             //         // resolve([
//             //         //     {
//             //         //         "vendor": 1,
//             //         //         "path": [
//             //         //             [120.167057,30.185901],
//             //         //             [120.165752,30.185723],
//             //         //             [120.16581,30.188491],
//             //         //             [120.190417,30.198224],
//             //         //             [120.191971	,30.204],
//             //         //             [120.189622	,30.20767],
//             //         //             [120.182369	,30.218973],
//             //         //             [120.180889	,30.222601],
//             //         //             [120.200108	,30.306856],
//             //         //             [120.23477	,30.311914],
//             //         //             [120.246959	,30.316748],
//             //         //             [120.309708	,30.387518],
//             //         //             [120.312426	,30.39154],
//             //         //             [120.309069	,30.400897],
//             //         //             [120.302548	,30.399632],],
//             //         //
//             //         //             "timestamps": [ 838, 867.979, 947.036, 962.913, 996.971, 1032.865, 1060.03, 1077.834, 1205.212, 1210.243, 1295.677, 1315.668, 1431.726, 1480.25, 1488.658]
//             //         //     }])
//             //     });
//             // })
//
//             d3.json('http://localhost:5000/data/'+time+':00:00').then(function(data){
//                 var count=0;
//                 d3.json('./10.json').then(function (map) {
//                    // console.log('map:',map)
//                     data.forEach(d=>{
//                         var tmp=d.split(',');
//                         if(tmp[0]!=-1 && tmp[1]!=-1) {
//                             if(parseInt(tmp[2])>=5){
//                                 count++;
//                                 var key=tmp[0]+','+tmp[1];
//                                 console.log(map[key]);
//                                 Routes.push(map[key]);
//                             }
//                             // if(tmp[0]>40&&tmp[0]<=60&&tmp[1]>40&&tmp[1]<=60){
//                                 //   if (tmp[2] !== '0') {
//                                 // var urlNow = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + depCenter[tmp[0]][0].toFixed(6) + ',' + depCenter[tmp[0]][1].toFixed(6) + ';' + desCenter[tmp[1]][0].toFixed(6) + ',' + desCenter[tmp[1]][1].toFixed(6) + '?steps=true&geometries=geojson&access_token=' + MAPBOX_TOKEN;
//                                 // gets.push($.ajax({
//                                 //     type: 'GET',
//                                 //     url: urlNow,
//                                 //     success: function (r) {
//                                 //         console.log('r:', r)
//                                 //         //var json = JSON.parse(data);
//                                 //         var plan = r.routes[0];
//                                 //         var route = plan.geometry.coordinates;
//                                 //         var timestamps = [0];//先设置每条路径1000stamp
//                                 //         for (var i = 0; i < route.length; i++) {
//                                 //             if (i !== 0) {
//                                 //                 var dist = getDistance(route[i - 1][0], route[i - 1][1], route[i][0], route[i][1]) * 50;
//                                 //                 timestamps.push(dist + timestamps[i - 1])
//                                 //             }
//                                 //         }
//                                 //         var geojson = {
//                                 //             'vendor': 1,
//                                 //             'path': route,
//                                 //             'timestamps': timestamps,
//                                 //
//                                 //         };
//                                 //         console.log(geojson)
//                                 //         Routes.push(geojson)
//                                 //         saveJson[tmp[0]+','+tmp[1]] = geojson
//                                 //     },
//                                 //     error:function(){
//                                 //         console.log('err')
//                                 //     }
//                                 // }));
//
//                                 // }
//                            // }
//                         }
//                     })
//                     console.log('count:',count)
//                    // console.log(Routes)
//                 })
//                 // url.forEach(function(value) {
//                 //     console.log('url:',value)
//                 //     gets.push($.ajax({
//                 //         type: 'GET',
//                 //         url: value,
//                 //         success: function(data) {
//                 //             console.log('data:',data)
//                 //             //var json = JSON.parse(data);
//                 //             var plan = data.routes[0];
//                 //             var route = plan.geometry.coordinates;
//                 //             var timestamps=[0];//先设置每条路径1000stamp
//                 //             for(var i=0;i<route.length;i++){
//                 //                 if(i!==0){
//                 //                     var dist=getDistance(route[i-1][0],route[i-1][1],route[i][0],route[i][1])*50;
//                 //                     timestamps.push(dist+timestamps[i-1])
//                 //                 }
//                 //             }
//                 //             var geojson = {
//                 //                 'vendor':1,
//                 //                 'path': route,
//                 //                 'timestamps':timestamps,
//                 //
//                 //             };
//                 //             console.log(geojson)
//                 //             Routes.push(geojson)
//                 //
//                 //
//                 //         }
//                 //     }));
//                 // });
//
//                 // $.when.apply($, gets).then(function() {
//                 //     console.log(saveJson)
//                 //     var jsonData=JSON.stringify(saveJson)
//                 //     download(jsonData,'route.json','text/plain')
//                 //     console.log('Routes:',Routes)
//                 //     resolve(Routes);
//                 //
//                 // });
//             })
//         });
//     });
//
// };
//每条路径按流量加线的数量
let getStep=function(step,trip){
    let newTrip=[];
    trip.forEach(d=>{
        d+=3600/step;
        newTrip.push(d)
    });
    return newTrip;
};
function getArea(){
    d3.csv("./edge_dep_csv.csv").then(function (data) {
        let re = /([-+]?[0-9]*\.?[0-9]+)/g;
        console.log('data1:', data)
        data.forEach((d,index) => {
            let tmp = d.value.match(re);
            let tmpData = [];
            for (let i = 0; i < tmp.length - 1; i += 2) {
                tmpData.push([parseFloat(tmp[i + 1]), parseFloat(tmp[i])])
            }
            depData.push(tmpData)
            depPolygon.push({
                contour:tmpData,
                in:0,
                out:0,
                number:index
            })
        });
        depData.forEach(d => {
            let sumlong = 0;
            let sumlat = 0;
            d.forEach(data => {
                sumlong += data[0];
                sumlat += data[1];
            });
            depCenter.push([sumlong / d.length, sumlat / d.length])
        });
        d3.csv("./edge_des_csv.csv").then(function (data) {
            let re = /([-+]?[0-9]*\.?[0-9]+)/g;
            console.log('data2:', data);
            data.forEach((d,index)=> {
                let tmp = d.value.match(re);
                let tmpData = [];
                for (let i = 0; i < tmp.length - 1; i += 2) {
                    tmpData.push([parseFloat(tmp[i + 1]), parseFloat(tmp[i])])
                }
                desData.push(tmpData)

                desPolygon.push({
                    contour:tmpData,
                    in:0,
                    out:0,
                    number:index
                })


            });
            desData.forEach(d => {
                let sumlong = 0;
                let sumlat = 0;
                d.forEach(data => {
                    sumlong += data[0];
                    sumlat += data[1];
                });
                desCenter.push([sumlong / d.length, sumlat / d.length])
            });
        })
})
}
//获取流量数据
function getRoute(time) {
    return new Promise(resolve => {
        // var gets = [];
        // d3.json('http://localhost:5000/data/'+time).then(function (data) {
        d3.json('http://192.168.111.1:8888/data/'+time).then(function (data) {
                var count = 0;
            d3.json('./10.json').then(function (map) {
                // console.log('map:',map)
                var routeData=[];
                var sumMax=0;
                data.forEach(d => {
                    var tmp = d.split(',');
                    if (tmp[0] != -1 && tmp[1] != -1) {
                        if (parseInt(tmp[2]) >= 2) {

                            depPolygon[parseInt(tmp[0])].out+=parseInt(tmp[2]);
                            desPolygon[parseInt(tmp[1])].in+=parseInt(tmp[2]);
                            count++;
                            var key = tmp[0] + ',' + tmp[1];
                            //  console.log(map[key]);
                            var pre=[];
                            var sum=0;
                            var countD=[];
                            map[key].path.forEach(d=>{
                                if(pre.length==0){
                                    pre=d
                                }
                                else{
                                    // console.log('pre:',pre);
                                    var m=getDistance(pre[0],pre[1],d[0],d[1]);
                                    countD.push(m);
                                    sum+=m;
                                    pre=d;
                                }
                            });
                            if(sum>=sumMax){
                                sumMax=sum
                            }
//control color
                            if(parseInt(tmp[2]) >= 2&& parseInt(tmp[2]) < 5){
                                routeData.push({
                                    'od':parseInt(tmp[0])+','+parseInt(tmp[1]),
                                    'traffic':parseInt(tmp[2]),
                                    "color":0,
                                    "path":map[key].path,
                                    "timestamps":countD
                                })
                                // console.log('path',map[key].path)
                            }
                            else if(parseInt(tmp[2]) >=5&&parseInt(tmp[2]) <20){
                                routeData.push({
                                    'od':parseInt(tmp[0])+','+parseInt(tmp[1]),
                                    'traffic':parseInt(tmp[2]),
                                    "color":1,
                                    "path":map[key].path,
                                    "timestamps":countD
                                })
                            }
                            else if(parseInt(tmp[2]) >=20&&parseInt(tmp[2]) <100){
                                routeData.push({
                                    'od':parseInt(tmp[0])+','+parseInt(tmp[1]),
                                    'traffic':parseInt(tmp[2]),
                                    "color":2,
                                    "path":map[key].path,
                                    "timestamps":countD
                                })
                            }
                            else if(parseInt(tmp[2]) >= 100&&parseInt(tmp[2]) <150){
                                routeData.push({
                                    'od':parseInt(tmp[0])+','+parseInt(tmp[1]),
                                    'traffic':parseInt(tmp[2]),
                                    "color":3,
                                    "path":map[key].path,
                                    "timestamps":countD
                                })
                            }
                            else if(parseInt(tmp[2]) >= 150){
                                routeData.push({
                                    'od':parseInt(tmp[0])+','+parseInt(tmp[1]),
                                    'traffic':parseInt(tmp[2]),
                                    "color":4,
                                    "path":map[key].path,
                                    "timestamps":countD
                                })
                            }

                        }

                    }
                });
                let newRoutes=[];
                //按照流量多加动画效果
                routeData.forEach(d=>{
                    var tmpTime=[time*3600];
                    let preIndex=0;
                    // console.log('timestamps:',d.timestamps)
                    d.timestamps.forEach(t=>{
                        // console.log('t:',t)
                        tmpTime.push(tmpTime[preIndex]+(3600/sumMax)*t)//加上当前已经过去的小时的时间
                        preIndex++;
                    });
                    d.timestamps=tmpTime;
                    let tmpStep=tmpTime;
                    for(let i=0;i<(d.traffic);i++){
                        tmpStep=getStep((d.traffic),tmpStep);
                        newRoutes.push({
                            'od':d.od,
                            'traffic':d.traffic,
                            "color":d.color,
                            "path":d.path,
                            "timestamps":tmpStep
                        })
                    }
                });
                newRoutes.forEach(d=>{
                    routeData.push(d)
                })
                // routeData.forEach(d=>{
                //     Routes.push(d)
                // })
                Routes=routeData;
                console.log('count:', count);
                console.log('Routes:', Routes);
                resolve('0')
                // console.log(Routes)
            })

        })

    });
}

let match_points=[];
let match_map={};
function getMatchdata(){
    return new Promise(resolve => {
        d3.json('./match.json').then(d=>{
            console.log("match",d);
            d.forEach(dd=>{
                if(dd['code']==="Ok"){
                    dd['tracepoints'].forEach(p=>{
                        if(p!==null && !match_map.hasOwnProperty(p['location'])){
                            //去除重复的点。
                            match_map[p['location']]=1;
                            match_points.push({coordinates:[parseFloat(p['location'][0]),parseFloat(p['location'][1])],value:15});
                        }
                    })
                }
            });
            resolve();
        })
    })

}



let MCBAND = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0];


let MC2LL = [
    [1.410526172116255e-008, 8.983055096488720e-006, -1.99398338163310, 2.009824383106796e+002, -1.872403703815547e+002, 91.60875166698430, -23.38765649603339, 2.57121317296198, -0.03801003308653, 1.733798120000000e+007],
    [-7.435856389565537e-009, 8.983055097726239e-006, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 1.026014486000000e+007],
    [-3.030883460898826e-008, 8.983055099835780e-006, 0.30071316287616, 59.74293618442277, 7.35798407487100, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6.856817370000000e+006],
    [-1.981981304930552e-008, 8.983055099779535e-006, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4.482777060000000e+006],
    [3.091913710684370e-009, 8.983055096812155e-006, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.63218178102420, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2.555164400000000e+006],
    [2.890871144776878e-009, 8.983055095805407e-006, -0.00000003068298, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 8.260885000000000e+005],
];


let bound=[12924083.26,4792883.01,12992448.86,4864389.46];
function convertor(lng,lat,factor){
    let x = factor[0] + factor[1] * Math.abs(lng)
    let tmp = Math.abs(lat) / factor[9]
    let y = factor[2]
    for(let i=3;i<9;i++){
        y += factor[i] * Math.pow(tmp, i-2);
        x =  lng > 0?x: -x;
        y = lat > 0?y: -y
    }
    return [x,y]
}

function mc2coordinate(x,y){
    let factor = null;
    MCBAND.map((index,value)=>{
        if(y>value){
            factor=MC2LL[index];
        }
    });
    return convertor(x,y,factor);
}

function getBound(){
    let min=mc2coordinate(bound[0],bound[1]);
    let max=mc2coordinate(bound[2],bound[3]);
    return [min,max];
}


let root={};
function Queue() {
    let items = [];

    // 向队列添加元素（一个或多个）
    this.enqueue = function (element) {
        if (element instanceof Array) items = items.concat(element);
        else items.push(element);
    };

    // 从队列移除元素
    this.dequeue = function () {
        return items.shift();
    };

    // 返回队列中的第一个元素
    this.front = function () {
        return items[0];
    };

    // 判断队列是否为空
    this.isEmpty = function () {
        return items.length === 0;
    };

    // 返回队列的长度
    this.size = function () {
        return items.length;
    };

    // 清空队列
    this.clear = function () {
        items = [];
    };

    // 打印队列内的所有元素
    this.print = function () {
        console.log(items.toString());
    };
}

function split(root,tag){
    if(root['data'].length>tag){
        let x1=root['bound'][0][0];
        let y1=root['bound'][0][1];
        let x2=root['bound'][1][0];
        let y2=root['bound'][1][1];
        let mid_vertical = (root['bound'][0][0]+root['bound'][1][0])/2;
        let mid_horizontal = (root['bound'][0][1]+root['bound'][1][1])/2;
        root['LU']={};
        root['RU']={};
        root['RD']={};
        root['LD']={};

        root['LU']['bound']=[[x1,mid_horizontal],[mid_vertical,y2]];
        root['LD']['bound']=[[x1,y1],[mid_vertical,mid_horizontal]];
        root['RU']['bound']=[[mid_vertical,mid_horizontal],[x2,y2]];
        root['RD']['bound']=[[mid_vertical,y1],[x2,mid_horizontal]];


        root['LD']['data']=[];
        root['RU']['data']=[];
        root['RD']['data']=[];
        root['LU']['data']=[];
        root['data'].forEach(d=>{
            if(match_points[d].coordinates[0]<=mid_vertical){
                if(match_points[d].coordinates[1]>mid_horizontal){
                    root['LU']['data'].push(d);
                }
                else{
                    root['LD']['data'].push(d);
                }
            }
            else {
                if(match_points[d].coordinates[1]>mid_horizontal){
                    root['RU']['data'].push(d);
                }
                else{
                    root['RD']['data'].push(d);
                }
            }
        });

        // split(root['LU'],tag);
        // split(root['RU'],tag);
        // split(root['RD'],tag);
        // split(root['LD'],tag);
    }
}


let quardTree={}

function getQuardTree(){
   return new Promise(resolve=>{
       d3.json('http://127.0.0.1:8888/quardTree').then((d)=>{
           console.log('quard',d);
           Object.keys(d).forEach(key=>{
               quardTree[key]=d[key]
           })
           resolve();
       })
   })
    //设置区域的上下左右
}


let SpeedData=[];
//获取time 时间点的所有道路点的速度信息
function getBeijingSpeed(time){
    SpeedData=[];
    return new Promise(resolve => {
        d3.json('http://10.72.100.14:8888/data/rootdata/'+time).then((data)=>{
            console.log(data);
            data.forEach(d=>{
                SpeedData.push(d)
            });
            resolve();
        });
    })
}
let pathlist=[];
//获取速度信息对应的道路标号
function getPathlist(){ //记录了速度数据集里面每个点的时间
    pathlist=[];
    return new Promise(resolve => {
        d3.json('http://10.72.100.14:8888/data/pathlist').then((data)=>{
            // console.log(data);
            data.forEach(d=>{
                pathlist.push(d)
            });
            resolve();
        });
    })
}

let SpeedMap={};
function getNodeSpeedMap(){
    SpeedData.map((val,index)=>{
        SpeedMap[pathlist[index]]=val;
    })
}
let point_speed={};
function getPointSpeed(point_id){

    return new Promise(resolve => {
        if(!point_speed.hasOwnProperty(point_id)){
            d3.json('http://10.72.100.14:8888/data/pointspeed/'+point_id).then((data)=>{
                point_speed[point_id]=data;
                resolve();
            })
        }
        else resolve();
    })

}

let Real_match_map={};

function getMatchMap(){
    return new Promise(resolve => {
        d3.json('http://127.0.0.1:8888/match_map').then((data)=>{
            Object.keys(data).forEach(d=>{
                Real_match_map[d]=data[d];
            })
        })
    })
}

//获取Beijing的所有道路信息
let Beijingdata=[];
function getBeiJingData(){
    Beijingdata=[];
    return new Promise(resolve => {
        d3.json('http://127.0.0.1:8888/road_data').then((data)=>{
            // console.log(data)
            data.forEach(d=>{

                if(Real_match_map.hasOwnProperty(d['link_id'])){
                    // console.log('real_match',Real_match_map);
                    Beijingdata.push({'name': d['link_id'],'coordinates': [parseFloat(Real_match_map[d['link_id']][0]),parseFloat(Real_match_map[d['link_id']][1]),],'value':SpeedMap[d['link_id']]})

                }
                else Beijingdata.push({'name': d['link_id'],'coordinates': [parseFloat(d['node_lng'])-0.00622,parseFloat(d['node_lat'])-0.00142],'value':SpeedMap[d['link_id']]})
            });
            resolve();
        });
    })
}
//
let pos_map={};
function getposmap(){
    return new Promise(resolve => {
        d3.json('http://127.0.0.1:8888/pos_map').then((data)=>{
            Object.keys(data).forEach(key=>{
                let point=[];
                point.push(parseFloat(data[key][0])-0.00622);
                point.push(parseFloat(data[key][1])-0.00142);
                pos_map[key]=point;
            });
            resolve();
        });
    })
}
let neighbordata=[];
function getneighbor(){

    return new Promise(resolve => {
        d3.json('http://127.0.0.1:8888/path_data').then((data)=>{

            data.forEach(d=>{
                let path=[];
                d.forEach(dd=>{
                    path.push(pos_map[dd])
                });
                neighbordata.push({path:path})
            });
            console.log('neighbor',neighbordata);
            resolve();
        });
    })
}

let Grid=[];
function QuardBound(node){
    if(node){
        Grid.push({
            contour:[[parseFloat(node['bound'][0][0]),parseFloat(node['bound'][0][1])],[parseFloat(node['bound'][0][0]),parseFloat(node['bound'][1][1])],[parseFloat(node['bound'][1][0]),parseFloat(node['bound'][1][1])],[parseFloat(node['bound'][1][0]),parseFloat(node['bound'][0][1])]]
        })
        QuardBound(node['LU'])
        QuardBound(node['RU'])
        QuardBound(node['LD'])
        QuardBound(node['RD'])
    }

}

function  _formatTime(t){
    return `2017年${4+Math.floor(t/43200)}月${Math.floor((t-Math.floor((t/43200))*43200)/1440)}日${Math.floor((t%1440)/60)}时${Math.floor(t%60)}分`;
    // return `${Math.floor(t%60)}.${Math.floor((t%1440)/60)}.${Math.floor((t-Math.floor((t/43200))*43200)/1440)}.${4+Math.floor(t/43200)}.2017`
}

function _formatDayTime(t){
    //月，日，时
    return `${4+Math.floor(t/43200)}:${Math.floor((t-Math.floor((t/43200))*43200)/1440)}:${(Math.floor((t%1440)/60))%24}:${Math.floor(t%60)}`;
}



let predict_origin=new Map();
let predict_des=new Map();
//获取预测流量数据
function getPredictData(){
    return new Promise( resolve => {
        d3.csv('./Traffic_Predict_Data/prediction1-origin.csv').then(d=>{
            d.map((x,index)=>{
                // console.log('time',x.DepTime);
                let date=new Date(x.DepTime);
                // console.log('hour',date.getHours())
                let hour=date.getHours();
                if(!predict_origin.has(hour)){
                    predict_origin.set(hour,{})
                }
                let tmp=predict_origin.get(hour)
                tmp[x.Origin]=x.Trips
            })
            d3.csv('./Traffic_Predict_Data/prediction2-dep.csv').then(d=>{d.map((x,index)=>{
                let date=new Date(x.DepTime);
                // console.log('hour',date.getHours())
                let hour=date.getHours();
                    if(!predict_des.has(hour)){
                        predict_des.set(hour,{})
                    }
                    let tmp=predict_des.get(hour)
                        tmp[x.Destination]=x.Trips;
                    });
                resolve();
                }
            )
            }
        )
    })
}
let realOrg=new Map();
let realDes=new Map();
//获取真实流量数据
function getRealData(){
    d3.csv('./Traffic_Predict_Data/origin.csv').then(d=>{
            d.map((x,index)=>{
                // console.log('time',x.DepTime);
                let date=new Date(x.DepTime);
                // console.log('hour',date.getHours())
                let hour=date.getHours();
                if(!realOrg.has(hour)){
                    realOrg.set(hour,{})
                }
                let tmp=realOrg.get(hour)
                tmp[x.Origin]=x.Trips
            })
            d3.csv('./Traffic_Predict_Data/destination.csv').then(d=>{d.map((x,index)=>{
                    let date=new Date(x.DepTime);
                    // console.log('hour',date.getHours())
                    let hour=date.getHours();
                    if(!realDes.has(hour)){
                        realDes.set(hour,{})
                    }
                    let tmp=realDes.get(hour)
                    tmp[x.Destination]=x.Trips;
                });
                }
            )
        }
    )
}
let blockRoute=[];
let count=[];
let blockData=new Map();
function getBlockData(){
    d3.csv('./blockdetect/anomalyFile.csv').then(d=>{
        d.map(x=>{
            console.log(x)
            console.log(x['occurencingTime'])
            let da=new Date(x['occurencingTime']);
            console.log('da',da)
            let h=da.getHours();
            let m=da.getMinutes();
            let s=da.getSeconds();
            let t=h*3600+m*60+s;
            blockData.set(t,[parseFloat(x['longitude']),parseFloat(x['latitude'])])
        })
        console.log(blockData)
    })
}
function getBlockRoute(){
    return new Promise(resolve => {
        d3.csv('./blockdetect/GPS_588_merge.csv').then(d=>{
            console.log(d);
            let path=[];
            let timestamps=[];
            let m=0;
            d.map((x,index)=>{
                // console.log('x',x);
                // console.log('lat',x.lat)
                let da=new Date(x['date']);
                let h=da.getHours();
                let m=da.getMinutes();
                let s=da.getSeconds();
                let t=h*3600+m*60+s;
                if(count.indexOf(t)===-1&&m%5===0){
                    m++;
                    count.push(t);
                    timestamps.push(t);
                    path.push([parseFloat(x['Long']),parseFloat(x['Lat'])])
                    if(m%1===0){
                        blockData.set(t,[parseFloat(x['Long']),parseFloat(x['Lat'])])

                    }
                }
            })
            blockRoute.push({
                path:path,
                timestamps:timestamps,
                color:0
            })


            resolve();
        })

    })


}
//设置预测流量数据
function setPredictData(hour){
    console.log('org',predict_origin);
    let data=[];
    let tmp=predict_origin.get(parseInt(hour));
    console.log('tmp',tmp)
    for(let key in tmp){
        // console.log('key',key)
        data.push({
            centroid: depCenter[parseInt(key)],
            value:tmp[key]
        })
    }
    return data;
}
//设置实际流量数据
function setRealData(hour){
    // console.log('org',predict_origin)
    let data=[];
    let tmp=realOrg.get(parseInt(hour));
    console.log('tmp',tmp);
    for(let key in tmp){
        // console.log('key',key)
        data.push({
            centroid: depCenter[parseInt(key)],
            value:tmp[key]
        })
    }
    console.log('data',data);
    return data;

}
// getRoute.then(function () {
//     console.log('get')
// });
let tmpIcon=[];
//nebula 尝试
const features = {
    type: 'FeatureCollection',
    features: [
    ],
};
const selectedFeatureIndexes = [];


//记录折线图的总时长
let time_interval = 100;//两天的时长
let heatmap_interval=672;//七天的数据

let area_interval=48;//一天的时长

//河流图

//获取请求数据
let queryData=[]
function getQueryData(time){
    return new Promise(resolve => {
        d3.json('http://10.72.100.14:8888/query/'+time).then(d=>{
            d.forEach(dd=>{
                queryData.push({
                    inbound: 72,
                    outbound: 74,
                    from:{
                        coordinates:[parseFloat(dd[3]),parseFloat(dd[4])]
                    },
                    to:{
                        coordinates:[parseFloat(dd[5]),parseFloat(dd[6])]
                    }
                });
            });
            resolve();
        })
    })
}

//
let newDayquery=[];
function getQueryDataforArea(time){
    return new Promise(resolve => {
        d3.json('http://10.72.100.14:8888/query/'+(time/15)).then(d=>{
            d.forEach(dd=>{
                let s=_formatDayTime(time);
                let ss=s.split(':');
                newDayquery.push({
                    time:ss[2],
                    from:{coordinates:[parseFloat(dd[3]),parseFloat(dd[4])]},
                    to:{coordinates:[parseFloat(dd[5]),parseFloat(dd[6])]},
                })//是小时
            });
            resolve();
        })
    })
}


let onepathdata=[];
function getOnePath(start,end){
    return new Promise(resolve => {
        let urlNow = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0]+ ',' + start[1] + ';' + end[0]+ ',' + end[1]  + '?steps=true&geometries=geojson&access_token=' + "pk.eyJ1IjoiemhpZ3VhbmdkYSIsImEiOiJja21haDcxY3Axcmg2MnhrbmZqdHVraXlrIn0.5Yy3Rgb1I1vohpAjeMKUVw";
        d3.json(urlNow).then((d)=>{
            onepathdata.push({
                path:d.routes[0].geometry.coordinates,
                color:"f88c24"
            });
            console.log('Onepathdata:',onepathdata);
            resolve();
        })
    })
}
function getDrivePath(start,end){
    return new Promise(resolve => {
        let urlDrive = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0]+ ',' + start[1] + ';' + end[0]+ ',' + end[1]  + '?steps=true&geometries=geojson&access_token=' + "pk.eyJ1IjoiemhpZ3VhbmdkYSIsImEiOiJja21haDcxY3Axcmg2MnhrbmZqdHVraXlrIn0.5Yy3Rgb1I1vohpAjeMKUVw";
        d3.json(urlDrive).then((d)=>{
            onepathdata.push({
                path:d.routes[0].geometry.coordinates,
                color:'1ca9e6'
            });
            console.log('Onepathdata:',onepathdata);
            resolve();
        })

    })
}


export default class RouteMap extends Component {

    constructor(props) {
        super(props);
         // const [value, setValue] = React.useState([0]);
        this.state = {
            time: 54000,
            hour:-1,
            depV:false,
            desV:false,
            area:[],
            options:[],
            block:false,
            pre_org:[],
            pre_des:[],
            real_org:[],
            real:false,
            showPredict:true,
            blockIcon:[],
            showRoute:true,
            modeId: null,
            modeHandler: null,
            //editlayer 数据
            features: features,
            modeConfig:{},
            mode: DrawPolygonMode,
            ODTag: 3,
            Beijing: [],
            selectedFeatureIndexes: [], //
            BeijingSpeedData:[],
            Quater:-1,
            //记录在一个多边形内的点，二维数组
            inPoints:[],
            //记录点的速度
            pointData:[],
            //让表格只渲染一次
            showTag:0,
            piedata:[],
            //区域内速度点河流图数据
            streamData:[],
            avarageData:[],
            match_data:[],
            Grid:[],
            ToolTag:0,
            heatdata:[],
            arcData:[],
            querySearchData:[],
            raidData:[],
            A2BAreaData:[],
            onePath:[],
            moduleTag:0,
        };
    }
    componentDidMount() {
        getArea();
        let p = getPredictData();
        p.then(function () {
            // this.setState({
            //     pre_origin: predict_origin,
            //     pre_des : predict_des
            // })
        }.bind(this))

        getRealData();

        let p2 = getBlockRoute();
        p2.then(function () {
            console.log('blockRoute', blockRoute);
            this.setState({
                blockRoute: blockRoute
            })
        }.bind(this));
        let button = document.getElementById('start');
        console.log(button);
        // setTimeout(()=>{button.click()},1200);

        let p4 = getBeijingSpeed(1800);
        let p_getMatchmap=getMatchMap();
        p_getMatchmap.then(function(){
            p4.then(function () {
                let p5 = getPathlist();
                p5.then(function () {
                    getNodeSpeedMap();
                    let p3 = getBeiJingData();
                    p3.then(function () {
                        // console.log('beijing',Beijingdata);
                        this.setState({
                            BeijingSpeedData: Beijingdata
                        })
                        let pp = getpie();
                        pp.then(function () {
                            this.setState({
                                piedata: piedata
                            })
                            // let pie = new Pie('pie', {
                            //     appendPadding: 10,
                            //     data: this.state.piedata,
                            //     angleField: 'value',
                            //     colorField: 'type',
                            //     radius: 1,
                            //     innerRadius: 0.64,
                            //
                            //     label: {
                            //         type: 'inner',
                            //         offset: '-50%',
                            //         autoRotate: false,
                            //         style: { textAlign: 'center' },
                            //         formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
                            //     },
                            //     statistic: {
                            //         title: {
                            //             offsetY: -8,
                            //         },
                            //         content: {
                            //             offsetY: -4,
                            //         },
                            //     },
                            // });
                            // pie.render();
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        });


        let p_match = getMatchdata();
        p_match.then(function () {
            this.setState({
                match_data: match_points
            })

        }.bind(this));

        let p_Quard = getQuardTree();
        p_Quard.then(function () {
            console.log('quardTrue',quardTree);

            QuardBound(quardTree);

            this.setState({
                Grid:Grid
            })
        }.bind(this));

        let time=this.state.time;
        let promiseG=[];
        for(let i=-area_interval;i<area_interval;i++){
            if(time+i*15>=0 && time+i*15<87840 ){//
                // console.log('speed:',Math.floor((time+i*15)/15));
                promiseG.push(getQueryDataforArea(time+i*15));
            }
        }
        Promise.all(promiseG).then(function(){
            this.setState({
                querySearchData:newDayquery
            })
        }.bind(this));
        let p_getPath=getOnePath([116.44392013549806,
            39.912205075917015],[
            116.47885322570801,
            39.93280820087599
        ]);
        let p_getDrive=getDrivePath([116.44392013549806,
            39.912205075917015],[
            116.47885322570801,
            39.93280820087599
        ]);
        Promise.all([p_getPath,p_getDrive]).then(
            function (){
                this.setState({
                    onePath:onepathdata
                })
            }.bind(this)
        )
    }



        // const editlayer=new EditableGeoJsonLayer({
        //     id: 'editlayer',
        //     data: this.state.features,
        //     mode: this.state.mode,
        //     selectedFeatureIndexes,
        //     onEdit: ({ updatedData }) => {
        //         this.setState({
        //             data: updatedData,
        //         });
        //     }
        // });
        // getBlockData();

        // this.setState({
        //     depPolygon:depPolygon,
        //     desPolygon:desPolygon
        // })

    componentWillUnmount() {
        // if (this._animationFrame) {
        //     window.cancelAnimationFrame(this._animationFrame);
        // }
    }
//get route from mapbox
    getRoute(){
        d3.csv("./edge_dep_csv.csv").then(function (data) {
            let re=/([-+]?[0-9]*\.?[0-9]+)/g;
            console.log('data1:',data)
            data.forEach(d=>{
                let tmp=d.value.match(re)
                let tmpData=[];
                for(let i=0;i<tmp.length-1;i+=2){
                    tmpData.push([parseFloat(tmp[i+1]),parseFloat(tmp[i])])
                }
                depData.push(tmpData)
            })
            depData.forEach(d=>{
                let sumlong=0
                let sumlat=0;
                d.forEach(data=>{
                    sumlong+=data[0];
                    sumlat+=data[1];
                })
                depCenter.push([sumlong/d.length,sumlat/d.length])
            })
            d3.csv("./edge_des_csv.csv").then(function (data) {
                let re=/([-+]?[0-9]*\.?[0-9]+)/g
                console.log('data2:',data)
                data.forEach(d=>{
                    let tmp=d.value.match(re)
                    let tmpData=[];
                    for(let i=0;i<tmp.length-1;i+=2){
                        tmpData.push([parseFloat(tmp[i+1]),parseFloat(tmp[i])])
                    }
                    desData.push(tmpData)
                })
                desData.forEach(d=>{
                    let sumlong=0;
                    let sumlat=0;
                    d.forEach(data=>{
                        sumlong+=data[0];
                        sumlat+=data[1];
                    })
                    desCenter.push([sumlong/d.length,sumlat/d.length])
                });
                // d3.json('http://localhost:5000/data/12:00:00').then(function(data){
                //     data.forEach(d=>{
                //         var tmp=d.split(',');
                //         if(tmp[0]!=-1 && tmp[1]!=-1) {
                //             if(tmp[0]>46&&tmp[0]<=60){
                //              //   if (tmp[2] !== '0') {
                //                 var urlNow = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + depCenter[tmp[0]][0].toFixed(6) + ',' + depCenter[tmp[0]][1].toFixed(6) + ';' + desCenter[tmp[1]][0].toFixed(6) + ',' + desCenter[tmp[1]][1].toFixed(6) + '?steps=true&geometries=geojson&access_token=' + MAPBOX_TOKEN;
                //                 gets.push($.ajax({
                //                     type: 'GET',
                //                     url: urlNow,
                //                     success: function (r) {
                //                         console.log('r:', r)
                //                         //var json = JSON.parse(data);
                //                         var plan = r.routes[0];
                //                         var route = plan.geometry.coordinates;
                //                         var timestamps = [0];//先设置每条路径1000stamp
                //                         for (var i = 0; i < route.length; i++) {
                //                             if (i !== 0) {
                //                                 var dist = getDistance(route[i - 1][0], route[i - 1][1], route[i][0], route[i][1]) * 50;
                //                                 timestamps.push(dist + timestamps[i - 1])
                //                             }
                //                         }
                //                         var geojson = {
                //                             'vendor': 1,
                //                             'path': route,
                //                             'timestamps': timestamps,
                //
                //                         };
                //                         console.log(geojson)
                //                         Routes.push(geojson)
                //                         saveJson[tmp[0]+','+tmp[1]] = geojson
                //                     },
                //                     error:function(){
                //                         console.log('err')
                //                     }
                //                 }));
                //
                //            // }
                //             }
                //         }
                //     })
                //     // url.forEach(function(value) {
                //     //     console.log('url:',value)
                //     //     gets.push($.ajax({
                //     //         type: 'GET',
                //     //         url: value,
                //     //         success: function(data) {
                //     //             console.log('data:',data)
                //     //             //var json = JSON.parse(data);
                //     //             var plan = data.routes[0];
                //     //             var route = plan.geometry.coordinates;
                //     //             var timestamps=[0];//先设置每条路径1000stamp
                //     //             for(var i=0;i<route.length;i++){
                //     //                 if(i!==0){
                //     //                     var dist=getDistance(route[i-1][0],route[i-1][1],route[i][0],route[i][1])*50;
                //     //                     timestamps.push(dist+timestamps[i-1])
                //     //                 }
                //     //             }
                //     //             var geojson = {
                //     //                 'vendor':1,
                //     //                 'path': route,
                //     //                 'timestamps':timestamps,
                //     //
                //     //             };
                //     //             console.log(geojson)
                //     //             Routes.push(geojson)
                //     //
                //     //
                //     //         }
                //     //     }));
                //     // });
                //
                //     $.when.apply($, gets).then(function() {
                //         console.log(saveJson)
                //         var jsonData=JSON.stringify(saveJson)
                //         download(jsonData,'route.json','text/plain')
                //         console.log('Routes:',Routes)
                //         resolve(Routes);
                //         // resolve([
                //         //     {
                //         //         "vendor": 1,
                //         //         "path": [
                //         //             [120.167057,30.185901],
                //         //             [120.165752,30.185723],
                //         //             [120.16581,30.188491],
                //         //             [120.190417,30.198224],
                //         //             [120.191971	,30.204],
                //         //             [120.189622	,30.20767],
                //         //             [120.182369	,30.218973],
                //         //             [120.180889	,30.222601],
                //         //             [120.200108	,30.306856],
                //         //             [120.23477	,30.311914],
                //         //             [120.246959	,30.316748],
                //         //             [120.309708	,30.387518],
                //         //             [120.312426	,30.39154],
                //         //             [120.309069	,30.400897],
                //         //             [120.302548	,30.399632],],
                //         //
                //         //             "timestamps": [ 838, 867.979, 947.036, 962.913, 996.971, 1032.865, 1060.03, 1077.834, 1205.212, 1210.243, 1295.677, 1315.668, 1431.726, 1480.25, 1488.658]
                //         //     }])
                //     });
                // })

                d3.json('http://localhost:5000/data/0:00:00').then(function(data){
                    var count=0;
                    d3.json('./10.json').then(function (map) {
                        // console.log('map:',map)
                        data.forEach(d=>{
                            var tmp=d.split(',');
                            if(tmp[0]!=-1 && tmp[1]!=-1) {
                                if(parseInt(tmp[2])>=5){
                                    count++;
                                    var key=tmp[0]+','+tmp[1];
                                    console.log(map[key]);
                                    Routes.push(map[key]);
                                }
                                // if(tmp[0]>40&&tmp[0]<=60&&tmp[1]>40&&tmp[1]<=60){
                                //   if (tmp[2] !== '0') {
                                // var urlNow = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + depCenter[tmp[0]][0].toFixed(6) + ',' + depCenter[tmp[0]][1].toFixed(6) + ';' + desCenter[tmp[1]][0].toFixed(6) + ',' + desCenter[tmp[1]][1].toFixed(6) + '?steps=true&geometries=geojson&access_token=' + MAPBOX_TOKEN;
                                // gets.push($.ajax({
                                //     type: 'GET',
                                //     url: urlNow,
                                //     success: function (r) {
                                //         console.log('r:', r)
                                //         //var json = JSON.parse(data);
                                //         var plan = r.routes[0];
                                //         var route = plan.geometry.coordinates;
                                //         var timestamps = [0];//先设置每条路径1000stamp
                                //         for (var i = 0; i < route.length; i++) {
                                //             if (i !== 0) {
                                //                 var dist = getDistance(route[i - 1][0], route[i - 1][1], route[i][0], route[i][1]) * 50;
                                //                 timestamps.push(dist + timestamps[i - 1])
                                //             }
                                //         }
                                //         var geojson = {
                                //             'vendor': 1,
                                //             'path': route,
                                //             'timestamps': timestamps,
                                //
                                //         };
                                //         console.log(geojson)
                                //         Routes.push(geojson)
                                //         saveJson[tmp[0]+','+tmp[1]] = geojson
                                //     },
                                //     error:function(){
                                //         console.log('err')
                                //     }
                                // }));

                                // }
                                // }
                            }
                        })
                        console.log('count:',count)
                        this.layers[1].setData(Routes)
                        // resolve(Routes);
                        // console.log(Routes)
                    })

                    // url.forEach(function(value) {
                    //     console.log('url:',value)
                    //     gets.push($.ajax({
                    //         type: 'GET',
                    //         url: value,
                    //         success: function(data) {
                    //             console.log('data:',data)
                    //             //var json = JSON.parse(data);
                    //             var plan = data.routes[0];
                    //             var route = plan.geometry.coordinates;
                    //             var timestamps=[0];//先设置每条路径1000stamp
                    //             for(var i=0;i<route.length;i++){
                    //                 if(i!==0){
                    //                     var dist=getDistance(route[i-1][0],route[i-1][1],route[i][0],route[i][1])*50;
                    //                     timestamps.push(dist+timestamps[i-1])
                    //                 }
                    //             }
                    //             var geojson = {
                    //                 'vendor':1,
                    //                 'path': route,
                    //                 'timestamps':timestamps,
                    //
                    //             };
                    //             console.log(geojson)
                    //             Routes.push(geojson)
                    //
                    //
                    //         }
                    //     }));
                    // });

                    // $.when.apply($, gets).then(function() {
                    //     console.log(saveJson)
                    //     var jsonData=JSON.stringify(saveJson)
                    //     download(jsonData,'route.json','text/plain')
                    //     console.log('Routes:',Routes)
                    //     resolve(Routes);
                    //     // resolve([
                    //     //     {
                    //     //         "vendor": 1,
                    //     //         "path": [
                    //     //             [120.167057,30.185901],
                    //     //             [120.165752,30.185723],
                    //     //             [120.16581,30.188491],
                    //     //             [120.190417,30.198224],
                    //     //             [120.191971	,30.204],
                    //     //             [120.189622	,30.20767],
                    //     //             [120.182369	,30.218973],
                    //     //             [120.180889	,30.222601],
                    //     //             [120.200108	,30.306856],
                    //     //             [120.23477	,30.311914],
                    //     //             [120.246959	,30.316748],
                    //     //             [120.309708	,30.387518],
                    //     //             [120.312426	,30.39154],
                    //     //             [120.309069	,30.400897],
                    //     //             [120.302548	,30.399632],],
                    //     //
                    //     //             "timestamps": [ 838, 867.979, 947.036, 962.913, 996.971, 1032.865, 1060.03, 1077.834, 1205.212, 1210.243, 1295.677, 1315.668, 1431.726, 1480.25, 1488.658]
                    //     //     }])
                    // });
                })
            });
        });
    }
//routeTip
//     _renderTooltip() {
//         const {hoveredObject, pointerX, pointerY} = this.state || {};
//         return hoveredObject && (
//             <div className="tooltip" style={{color:'#ffffff',position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY}}>
//                 <div>
//                     <b>O-D: </b>
//                     <span>{hoveredObject.od}</span>
//                 </div>
//                 <div>
//                     <b>Traffic: </b>
//                     <span>{hoveredObject.traffic}</span>
//                 </div>
//
//             </div>
//
//         );
//     }
//areaTipDep
    _renderTooltipDep() {
        const { depObject,  depX,  depY} = this.state || {};
        return depObject && (
            <div className="tooltip" style={{color:'#00ffff',position: 'absolute', zIndex: 1, pointerEvents: 'none', left: depX, top: depY}}>
                <div>
                    <b>区域 id: </b>
                    <span>{depObject.number}</span>
                </div>
                <div>
                    <b>驶出流量: </b>
                    <span>{depObject.out}</span>
                </div>
            </div>
        );
    }
    //areaTipDes
    _renderTooltipDes() {
        const { desObject, desX, desY} = this.state || {};
        return desObject && (
            <div className="tooltip" style={{color:'#00ffff',position: 'absolute', zIndex: 1, pointerEvents: 'none', left: desX, top: desY}}>
                <div>
                    <b>区域: </b>
                    <span>{desObject.number}</span>
                </div>

                <div>
                    <b>驶入流量: </b>
                    <span>{desObject.in}</span>
                </div>
            </div>

        );
    }

    // _renderDrawSelectBar=()=>{
    //     return (
    //         {/*<div*/}
    //         {/*    style={{ position: "absolute", top: 0, right: 0, maxWidth: "320px" }}*/}
    //         {/*>*/}
    //         {/*    <select onChange={this._switchMode}>*/}
    //         {/*        <option value="">--Please choose a draw mode--</option>*/}
    //         {/*        {MODES.map((mode) => (*/}
    //         {/*            <option key={mode.id} value={mode.id}>*/}
    //         {/*                {mode.text}*/}
    //         {/*            </option>*/}
    //         {/*        ))}*/}
    //         {/*    </select>*/}
    //         {/*</div>*/}
    //     );
    // };
    _getPredictData(){
        if(this.state.showPredict){
            return this.state.real?this.state.real_org:this.state.pre_org
        }
        else return [{
            centroid: [0,0],
            value:[0,0]
        }]
    }
    // _switchMode = (evt) => {
    //     const modeId =
    //         evt.target.value === this.state.modeId ? null : evt.target.value;
    //     const mode = MODES.find((m) => m.id === modeId);
    //     const modeHandler = mode ? new mode.handler() : null;
    //     this.setState({ modeId, modeHandler });
    // };

    //转换字符串
    _hex2rgb(hex) {
        const value = parseInt(hex, 16);
        return [16, 8, 0].map((shift) => ((value >> shift) & 0xff) / 255);
    }
    _getDeckColorForFeature(str, bright, alpha) {
        let s=this._hex2rgb(str);
        console.log('str',s);

        const color = s.map((c) => c * bright * 255);

        return [...color, alpha * 255];
    }

    _renderLayers() {
        const {
            // buildings = DATA_URL.BUILDINGS,
            trailLength = 120,
            theme = DEFAULT_THEME,
            // TripsLayer=new TripsLayer({
            //     id: 'trips',
            //     //data: trips,
            //     // data:[
            //     //     {
            //     //         "vendor": 1,
            //     //         "path": [
            //     //             [120.167057,30.185901],
            //     //             [120.165752,30.185723],
            //     //             [120.16581,30.188491],
            //     //             [120.190417,30.198224],
            //     //             [120.191971	,30.204],
            //     //             [120.189622	,30.20767],
            //     //             [120.182369	,30.218973],
            //     //             [120.180889	,30.222601],
            //     //             [120.200108	,30.306856],
            //     //             [120.23477	,30.311914],
            //     //             [120.246959	,30.316748],
            //     //             [120.309708	,30.387518],
            //     //             [120.312426	,30.39154],
            //     //             [120.309069	,30.400897],
            //     //             [120.302548	,30.399632],],
            //     //
            //     //             "timestamps": [ 838, 867.979, 947.036, 962.913, 996.971, 1032.865, 1060.03, 1077.834, 1205.212, 1210.243, 1295.677, 1315.668, 1431.726, 1480.25, 1488.658]
            //     //     }],
            //     data:Routes,
            //     getPath: d => d.path,
            //     getTimestamps: d => d.timestamps,
            //     getColor: d => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1),
            //     opacity: 0.3,
            //     widthMinPixels: 2,
            //     rounded: true,
            //     trailLength,
            //     currentTime: this.state.time,
            //
            //     shadowEnabled: false
            // }),
        } = this.props;

        const layers=[
            // new ScatterplotLayer({
            //     id: 'Beijing',
            //     data: this.state.Beijing,
            //     pickable: true,
            //     opacity: 0.8,
            //     stroked: true,
            //     filled: true,
            //     radiusScale: 1,
            //     radiusMinPixels: 1,
            //     radiusMaxPixels: 10,
            //     lineWidthMinPixels: 0.1,
            //     getPosition: d =>{ return d['coordinates']} ,
            //     getRadius: d => 10,
            //     getFillColor: d => [255, 140, 0],
            //     getLineColor: d => [0, 0, 0]
            // }),

            // new PolygonLayer({
            //     id:'Grid-layer',
            //     data:this.state.Grid,
            //     pickable: true,
            //     stroked: true,
            //     filled: false,
            //     wireframe: true,
            //     lineWidthMinPixels: 1,
            //     getPolygon: d => {
            //
            //         return d.contour},
            //     getLineColor: [80, 80, 80],
            //     getLineWidth: 2,
            // }),
            new PathLayer({
                id: 'path-layer',
                data:this.state.onePath,
                pickable: true,
                widthScale: 30,
                widthMinPixels: 2,
                getPath: d => {return d.path},
                getColor: d => this._getDeckColorForFeature(d.color,1,0.8),
                getWidth: d => 1
            }),
            new ColumnLayer({
                id: 'Speed-layer',
                data: this.state.BeijingSpeedData,
                // data: this.state.match_data,
                diskResolution: 12,
                radius: 10,
                // extruded: true,
                extruded: false,
                pickable: true,
                stroked:true,
                elevationScale: 3,
                getLineWidth:0.5,
                getPosition: d => d.coordinates,
                getFillColor: d => {
                    if(!d.value){return [255,255,255,0]}
                    else if(parseInt(d.value)<20) return colorRange[1];
                    else if(parseInt(d.value)<30&&parseInt(d.value)>=20) return colorRange[2];
                    else if(parseInt(d.value)>=30&& parseInt(d.value)<40)return colorRange[3];
                    else if(parseInt(d.value)>=40 && parseInt(d.value)<50)return colorRange[4];
                    else if(parseInt(d.value)>=50 )return colorRange[5];
                    else return colorRange[0];



                    // if (d .value/10<= 5) {
                    //     return colorRange[d.value/10]
                    // } else {
                    //     return colorRange[5]
                    // }
                },

                getLineColor: d=>{
                    if(!d.value)return [0,0,0,0];
                    else return [0,0,0];
                },
                getElevation: d =>{
                    // if(!d.value)return 0.05;
                    // else{
                    if(!d.value){return 0}
                    else if(parseInt(d.value)<20) return d.value*70*0.14/20;
                    else if(parseInt(d.value)<30&&parseInt(d.value)>=20) return 9.8+(d.value-20)*70*0.41/10;
                    else if(parseInt(d.value)>=30&& parseInt(d.value)<40)return 38.5+(d.value-30)*70*0.33/10;
                    else if(parseInt(d.value)>=40 && parseInt(d.value)<50)return 61.6+(d.value-40)*70*0.11/10;
                    else if(parseInt(d.value)>=50 )return d.value+20;

                    // }
                },
                onHover:(d)=>{// 该点的一段时间内的数据
                    // this.setState({
                    //     lineData:
                    // })
                    // debugger
                    if(d.hasOwnProperty('object')){
                        console.log(d.object['name']);
                    }
                    if(d.hasOwnProperty('object') &&this.state.showTag===0 && this.state.pointData.length===0){

                        if(SpeedMap.hasOwnProperty(d)){//SpeedMap 里面有速度再取，这时候speedMap肯定有数值了
                            console.log('data:',d);
                            let p1=getPointSpeed(d.object['name']);
                            p1.then(function(){
                                let pointData=[];
                                let time=this.state.time;
                                for(let i=-time_interval;i<time_interval;i++){
                                    if(time+i*15>=0 && time+i*15<87840){
                                        console.log('speed:',Math.floor((time+i*15)/15))
                                        pointData.push({'speed':point_speed[d.object['name']][Math.floor((time+i*15)/15)],'time':_formatTime(Math.floor((time+i*15)))})
                                    }
                                }
                                console.log('pointdata',pointData);
                                this.setState({
                                    pointData:pointData
                                });

                                G2.registerShape('point', 'breath-point', {
                                    draw(cfg, container) {
                                        const data = cfg.data;
                                        const point = { x: cfg.x, y: cfg.y };
                                        const group = container.addGroup();
                                        if (data['time'] === _formatTime(Math.floor((time)))) {
                                            const decorator1 = group.addShape('circle', {
                                                attrs: {
                                                    x: point.x,
                                                    y: point.y,
                                                    r: 10,
                                                    fill: cfg.color,
                                                    opacity: 0.5,
                                                },
                                            });
                                            const decorator2 = group.addShape('circle', {
                                                attrs: {
                                                    x: point.x,
                                                    y: point.y,
                                                    r: 10,
                                                    fill: cfg.color,
                                                    opacity: 0.5,
                                                },
                                            });
                                            const decorator3 = group.addShape('circle', {
                                                attrs: {
                                                    x: point.x,
                                                    y: point.y,
                                                    r: 10,
                                                    fill: cfg.color,
                                                    opacity: 0.5,
                                                },
                                            });
                                            decorator1.animate(
                                                {
                                                    r: 20,
                                                    opacity: 0,
                                                },
                                                {
                                                    duration: 1800,
                                                    easing: 'easeLinear',
                                                    repeat: true,
                                                }
                                            );
                                            decorator2.animate(
                                                {
                                                    r: 20,
                                                    opacity: 0,
                                                },
                                                {
                                                    duration: 1800,
                                                    easing: 'easeLinear',
                                                    repeat: true,
                                                    delay: 600,
                                                }
                                            );
                                            decorator3.animate(
                                                {
                                                    r: 20,
                                                    opacity: 0,
                                                },
                                                {
                                                    duration: 1800,
                                                    easing: 'easeLinear',
                                                    repeat: true,
                                                    delay: 1200,
                                                }
                                            );
                                            group.addShape('circle', {
                                                attrs: {
                                                    x: point.x,
                                                    y: point.y,
                                                    r: 6,
                                                    fill: cfg.color,
                                                    opacity: 0.7,
                                                },
                                            });
                                            group.addShape('circle', {
                                                attrs: {
                                                    x: point.x,
                                                    y: point.y,
                                                    r: 1.5,
                                                    fill: cfg.color,
                                                },
                                            });
                                        }

                                        return group;
                                    },
                                });

                                // const line = new Line('line', {
                                //     data: this.state.pointData,
                                //     xField: 'time',
                                //     yField: 'speed',
                                //     tooltip: { showMarkers: false },
                                //     point: {
                                //         shape: 'breath-point',
                                //     },
                                //
                                // });
                                // line.render();
                            }.bind(this));
                        }
                    }


                }
                // transitions: {
                //     getElevation: {
                //         duration: 3000,
                //         // type: 'spring',
                //         // stiffness: 0.01,
                //         // damping: 0.15,
                //         // easing: d3.easeCubicInOut,
                //         enter: d => {
                //             // console.log(d);
                //             let tmp = [];
                //             for (let i = 0; i < 300; i++) {
                //                 tmp.push(d[0] * i / 300)
                //             }
                //             // console.log(tmp)
                //             return tmp;
                //         },
                //     }
                // },
                // updateTriggers: {
                //     getElevation: [this.state.pre_org,this.state.real_org],
                // }
            }),

            // new ColumnLayer({
            //     id: 'OutpointLayer',
            //     data: this.state.arcData,
            //     // data: this.state.match_data,
            //     diskResolution: 12,
            //     radius: 10,
            //     extruded: true,
            //     // extruded: false,
            //     pickable: true,
            //     stroked:true,
            //     elevationScale: 3,
            //     getLineWidth:0.5,
            //     material:false,
            //     getPosition: d => d.from.coordinates,
            //     getFillColor: d => {
            //         // console.log('d:',d);
            //         return [0,100,255]
            //     },
            //     getLineColor: d=>{
            //
            //         return [0,0,0];
            //     },
            //     getElevation: d =>{
            //         return 20
            //     },
            //
            //
            // }),



            // new ColumnLayer({
            //     id: 'InpointLayer',
            //     data: this.state.arcData,
            //     // data: this.state.match_data,
            //     diskResolution: 12,
            //     radius: 10,
            //     // extruded: true,
            //     extruded: true,
            //     pickable: true,
            //     stroked:true,
            //     elevationScale: 3,
            //     getLineWidth:0.5,
            //     material:false,
            //     getPosition: d => d.to.coordinates,
            //     getFillColor: d => {
            //         console.log(this.state.arcData.length);
            //         // console.log('d:',d);
            //         return [255,130,71]
            //     },
            //     getLineColor: d=>{
            //
            //         return [0,0,0];
            //     },
            //     getElevation: d =>{
            //         return 20
            //     },
            //
            // }),

            // new ArcLayer({
            //     id:"query",
            //     data:this.state.arcData,
            //     pickable: true,
            //     getWidth: 2,
            //     greatCircle:true,
            //     getHeight:d=>0.1,
            //     getSourcePosition: d => d.from.coordinates,
            //     getTargetPosition: d => d.to.coordinates,
            //
            //     getSourceColor: d =>[151,255,255],
            //     getTargetColor: d =>[255,130,71],
            // })

            // new EditableGeoJsonLayer({
            //
            // }),
         // new SelectionLayer({
         //     id: 'selection',
         //     selectionType: 'rectangle',
         //     onSelect:({pickingInfos})=> {
         //         console.log(pickingInfos);
         //     },
         //     layerIds:['trips'],
         //     getTentativeFillColor: () => [255, 0, 255, 100],
         //     getTentativeLineColor: () => [0, 0, 255, 255],
         //     getTentativeLineDashArray: () => [0, 0],
         //     lineWidthMinPixels: 3
         // }),

         //    new EditableGeoJsonLayer({
         //        id: 'editlayer',
         //        data: this.state.data,
         //        mode: this.state.mode,
         //        selectedFeatureIndexes,
         //        onEdit: ({ updatedData }) => {
         //            this.setState({
         //                data: updatedData,
         //         });
         //     }
         // }),

            // new IconLayer({
            //     id:'blockIcon',
            //     data:this.state.blockIcon,
            //     iconAtlas:'./warning.png',
            //     iconMapping:ICON_MAPPING,
            //     getIcon: d => 'marker',
            //     sizeScale: 15,
            //     getPosition: d => d.coordinates,
            //     getColor:[255,255,0],
            //     getSize: d => 5,
            //
            // }),
            // new TripsLayer({
            //     id:'blockRoute',
            //     data:this.state.blockRoute,
            //     getPath:d=>d.path,
            //     getTimestamps: d => d.timestamps,
            //     // getColor: d => colorTable[d.color],
            //     getColor:[0,140,255,255],
            //     opacity: 0.3,
            //     widthMinPixels: 5,
            //     rounded: true,
            //     trailLength:1200,
            //     currentTime: this.state.time,
            //     shadowEnabled: false,
            //     pickable:true,
            //     visible:this.state.block
            // }),
            //
            // new TripsLayer({
            //     id: 'trips',
            //     //data: trips,
            //     // data:[
            //     //     {
            //     //         "vendor": 1,
            //     //         "path": [
            //     //             [120.167057,30.185901],
            //     //             [120.165752,30.185723],
            //     //             [120.16581,30.188491],
            //     //             [120.190417,30.198224],
            //     //             [120.191971	,30.204],
            //     //             [120.189622	,30.20767],
            //     //             [120.182369	,30.218973],
            //     //             [120.180889	,30.222601],
            //     //             [120.200108	,30.306856],
            //     //             [120.23477	,30.311914],
            //     //             [120.246959	,30.316748],
            //     //             [120.309708	,30.387518],
            //     //             [120.312426	,30.39154],
            //     //             [120.309069	,30.400897],
            //     //             [120.302548	,30.399632],],
            //     //
            //     //             "timestamps": [ 838, 867.979, 947.036, 962.913, 996.971, 1032.865, 1060.03, 1077.834, 1205.212, 1210.243, 1295.677, 1315.668, 1431.726, 1480.25, 1488.658]
            //     //     }],
            //     // data:getRoute,
            //     data:this.state.Route,
            //     // updateTriggers:{
            //     //   data:Routes
            //     // },
            //     getPath: d => d.path,
            //     getTimestamps: d => d.timestamps,
            //     getColor: d => colorTable[d.color],
            //     // getColor:[0,255,255,255],
            //     opacity: 0.3,
            //     widthMinPixels: 10,
            //     rounded: true,
            //     trailLength,
            //     currentTime: this.state.time,
            //     shadowEnabled: false,
            //     pickable:true,
            //     visible:this.state.showRoute,
            //     // onHover:info=>{
            //     //     console.log(info)
            //     // }
            // }),
            // new PolygonLayer({
            //     id: 'dep_polygon',
            //     data:this.state.depPolygon,
            //     pickable: true,
            //     stroked: true,
            //     filled: true,
            //     wireframe: true,
            //     lineWidthMinPixels: 1,
            //     getPolygon: d => d.contour,
            //     // getElevation: d => d.population / d.area / 10,
            //     getFillColor: d => [255, 255, 0,50],
            //     getLineColor: [80, 80, 80],
            //     getLineWidth: 1,
            //     onHover: info=>this.setState({
            //         depObject: info.object,
            //         depX: info.x,
            //         depY: info.y
            //     }),
            //     visible:this.state.depV
            //     // onHover: info=>{
            //     //     console.log(info)
            //     // }
            //
            // }),
            //
            // new PolygonLayer({
            //     id:'des_polygon',
            //     data:this.state.desPolygon,
            //     pickable: true,
            //     stroked: true,
            //     filled: true,
            //     wireframe: true,
            //     lineWidthMinPixels: 1,
            //     getPolygon: d => d.contour,
            //     // getElevation: d => d.population / d.area / 10,
            //     getFillColor: d => [255, 0, 0,50],
            //     getLineColor: [80, 80, 80],
            //     getLineWidth: 1,
            //     onHover: info=>this.setState({
            //         desObject: info.object,
            //         desX: info.x,
            //         desY: info.y
            //     }),
            //     visible:this.state.desV
            // }),
            //
            // new ColumnLayer({
            //     id: 'predict-origin-layer',
            //     data: this._getPredictData(),
            //     diskResolution: 12,
            //     radius: 100,
            //     extruded: true,
            //     pickable: true,
            //     elevationScale: 5000,
            //     getPosition: d => d.centroid,
            //     getFillColor: d => {
            //         let k = (Math.log(d.value) / Math.log(4)).toFixed(0);
            //         if (k <= 5) {
            //             return colorRange[k]
            //         } else {
            //             return colorRange[5]
            //         }
            //     },
            //     getLineColor: [0, 0, 0],
            //     getElevation: d =>parseInt(d.value)/100,
            //     transitions: {
            //         getElevation: {
            //             duration: 3000,
            //             // type: 'spring',
            //             // stiffness: 0.01,
            //             // damping: 0.15,
            //             // easing: d3.easeCubicInOut,
            //             enter: d => {
            //                 // console.log(d);
            //                 let tmp = [];
            //                 for (let i = 0; i < 300; i++) {
            //                     tmp.push(d[0] * i / 300)
            //                 }
            //                 // console.log(tmp)
            //                 return tmp;
            //             },
            //         }
            //     },
            //     updateTriggers: {
            //         getElevation: [this.state.pre_org,this.state.real_org],
            //     }
            // }),
            // new PolygonLayer({
            //     id: 'buildings',
            //     data: buildings,
            //     extruded: true,
            //     wireframe: false,
            //     opacity: 0.5,
            //     getPolygon: f => f.polygon,
            //     getElevation: f => f.height,
            //     getFillColor: theme.buildingColor,
            //     material: theme.material
            // })
        ];

        return layers;
    }
    _formatLabel(t) {
        return `2017年${4+Math.floor(t/43200)}月${Math.floor((t-Math.floor((t/43200))*43200)/1440)}日${Math.floor((t%1440)/60)}时${Math.floor(t%60)}分`;
    }

    _Icon(props) {
        // @ts-ignore
        return <box-icon color="currentColor" {...props} />;
    }
    // _getIncludePoints(){
    //     //数据是什么样的？
    //     this.state.features.
    //
    // }
    //
    Online(P1,P2,Q){
        let tempy1 = (P1[1] - P2[1]) ;
        let tempx1 = (P1[0] - P2[0]);
        let tempy2 = (Q[1] - P1[1]) ;
        let tempx2 = (Q[0] - P1[0]);
        let xp = tempy1 * tempx2;
        let yp = tempy2 * tempx1;
        if(Math.abs(xp - yp) <= 1e-6)
            return 1;
        else
            return 0;
    }
    _InPolygonScan(Q,Poly,n){
        // debugger
        // console.log('Q',Q);
        // console.log('Poly',Poly);
        let count=0;
        let xinters=0;
        let P1=Poly[0];
        for(let i=1;i<=n;i++){
            let P2=Poly[i%n];
            // if(this.Online(P1,P2,Q)) return 1;
            if(Q[1]>Math.min(P1[1],P2[1])&&Q[1]<=Math.max(P1[1],P2[1])){
                if(Q[0]<=Math.max(P1[0],P2[0])){
                    if(P1[1]!==P2[1]){
                        xinters=(Q[1]-P1[1])*(P2[0]-P1[0])/(P2[1]-P1[1])+P1[0];
                        if(P1[0]===P2[0]||Q[0]<=xinters) count++;//符合要求
                    }
                }
            }
            P1=P2;
        }
        if(count%2===0) return 0;
        return 1;
    }


    render() {
        const {
            viewState,
            // mapStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json',
            mapStyle ='mapbox://styles/mapbox/light-v10',
            // mapStyle ='mapbox://styles/mapbox/dark-v10',
            theme = DEFAULT_THEME,
        } = this.props;
        const layer = new EditableGeoJsonLayer({
            // id: "geojson-layer",
            id: 'editlayer',
            data: this.state.features,
            //数据格式
            // [
            // {},
            // {}
            //]
            mode: this.state.mode,
            selectedFeatureIndexes: this.state.selectedFeatureIndexes, //selectedFeaturesIndexes 地图上说有画的东西
            getFillColor: (feature,isSelected)=>{
                // console.log('feature',feature);
                console.log('features',this.state.features.features);
                // const index =this.state.features.features.indexOf(feature);
                // console.log('index',index);
                // console.log('properties',this.state.features.features[index]);
                let data=[];
                if(feature.properties["fill"] === "FFFFFF"){
                    data=this._getDeckColorForFeature(feature.properties["fill"],1,0.5)
                }
                else data=this._getDeckColorForFeature(feature.properties["fill"],1,0.5)
                console.log(data);
                return data;
            },
            getLineColor: (feature,isSelected)=>{
                // console.log('feature',feature);
                // console.log('features',this.state.features.features);
                // const index =this.state.features.features.indexOf(feature);
                // console.log('index',index);
                // console.log('properties',this.state.features.features[index]);
                let data=this._getDeckColorForFeature(feature.properties["stroke"],1,1)
                console.log(data);
                return data;
            },
            onEdit: ({ updatedData, editType, editContext }) => {

                let Poly=[];
                let inPoints=[];
                // console.log('onEdit', editType, editContext, updatedData);
                let updatedSelectedFeatureIndexes = this.state.selectedFeatureIndexes;

                if (!['movePosition', 'extruding', 'rotating', 'translating', 'scaling'].includes(editType)) {
                    // Don't log edits that happen as the pointer moves since they're really chatty
                    // const updatedDataInfo = featuresToInfoString(updatedData);
                    // eslint-disable-next-line
                    // console.log('onEdit', editType, editContext, updatedData);
                }

                if (editType === 'removePosition') {
                    // This is a simple example of custom handling of edits
                    // reject the edit
                    return;
                }

                if (editType === 'addFeature' ) {

                    let {featureIndexes}  = editContext;
                    console.log('features+',featureIndexes);

                    if(this.state.ODTag === 0){
                        updatedData.features[updatedData.features.length-1].properties["fill"]="1ca9e6";
                        updatedData.features[updatedData.features.length-1].properties["stroke"]= "1ca9e6";
                    }
                    else if(this.state.ODTag === 1){
                        updatedData.features[updatedData.features.length-1].properties["fill"]="f88c24";
                        updatedData.features[updatedData.features.length-1].properties["stroke"]= "ff9900";
                    }
                    else if(this.state.ODTag === 2){
                        updatedData.features[updatedData.features.length-1].properties["fill"]="FF0000";
                        updatedData.features[updatedData.features.length-1].properties["stroke"]= "FF0000";
                    }
                    else if(this.state.ODTag===3){
                        updatedData.features[updatedData.features.length-1].properties["fill"]="FFFFFF";
                        updatedData.features[updatedData.features.length-1].properties["stroke"]= "FF0000";
                    }
                    console.log('updata',updatedData);
                    // Add the new feature to the selection
                    updatedSelectedFeatureIndexes = [...this.state.selectedFeatureIndexes, ...featureIndexes];

                    updatedData.features.forEach(d=>{
                        Poly.push(d.geometry.coordinates[0]);
                    });
                    let newBeijingdata=[];
                    // console.log('poly:',Poly);
                    //
                    // let mapInPoint={};//不知道为什么inPoint会每个都重复，所以去除重复
                    //
                    // //统计在圈内的请求数据，怎么把一段时间的数据全部加进来？,直接把加载数据的过程放在didmount里面
                    // let inQueryPoints=[];
                    //
                    // let A2BPoints=[];
                    // let B2APoints=[];
                    // //对所有的poly计算在poly中的点
                    // if(Poly.length){
                    //     Poly.forEach(p=>{
                    //         this.state.BeijingSpeedData.forEach(d=>{
                    //             if(this._InPolygonScan(d['coordinates'],p,p.length)&& d.value &&!mapInPoint.hasOwnProperty(d['name'])){
                    //                 inPoints.push(d['name']);
                    //                 mapInPoint[d['name']]=1;
                    //
                    //                 // console.log('name:',d['name'],'value',d.value);
                    //                 //尝试改变数据
                    //                 // d['value']=50;
                    //             }
                    //             newBeijingdata.push(d);
                    //         });
                    //
                    //         //把当前所有的query 压入到多边形中。
                    //         console.log('querySearchData:',this.state.querySearchData);
                    //
                    //         let timeMap={};
                    //         this.state.querySearchData.forEach(d=>{
                    //             if(timeMap.hasOwnProperty(d.time)){
                    //                 timeMap[d.time]+=1;
                    //             }
                    //             else {
                    //                 timeMap[d.time]=1;
                    //             }
                    //
                    //             if(this._InPolygonScan(d.from.coordinates,p,p.length)){
                    //                 inQueryPoints.push({tag:'from', coordinates:d.from.coordinates, time:d.time});
                    //             }
                    //             if(this._InPolygonScan(d.to.coordinates,p,p.length)){
                    //                 inQueryPoints.push({tag:'to', coordinates:d.to.coordinates, time:d.time});
                    //             }
                    //         })
                    //         console.log('timeMap',timeMap);
                    //     });
                    // }
                    // // else if(Poly.length%2===0){
                    // //         let newQuerData=[];
                    // //
                    // //         this.state.querySearchData.forEach(d=>{
                    // //             // if(timeMap.hasOwnProperty(d.time)){
                    // //             //     timeMap[d.time]+=1;
                    // //             // }
                    // //             // else {
                    // //             //     timeMap[d.time]=1;
                    // //             // }
                    // //             for(let i=0;i<Poly.length;i+=2){
                    // //                 if(this._InPolygonScan(d.from.coordinates,Poly[i+0],Poly[i+0].length) && this._InPolygonScan(d.to.coordinates,Poly[i+1],Poly[i+1].length)){
                    // //                     A2BPoints.push({tag:'A2B', from:d.from.coordinates,to:d.to.coordinates,time:d.time});
                    // //                     newQuerData.push({tag:'A2B', from:{coordinates:d.from.coordinates},to:{coordinates:d.to.coordinates},time:d.time})
                    // //                 }
                    // //                 if(this._InPolygonScan(d.from.coordinates,Poly[i+1],Poly[i+1].length) && this._InPolygonScan(d.to.coordinates,Poly[i],Poly[i].length)){
                    // //                     B2APoints.push({tag:'B2A', from:d.from.coordinates,to:d.to.coordinates,time:d.time});
                    // //                     newQuerData.push({tag:'B2A', from:{coordinates:d.from.coordinates},to:{coordinates:d.to.coordinates},time:d.time})
                    // //                 }
                    // //             }
                    // //
                    // //         });
                    // //         this.setState({
                    // //             arcData:newQuerData
                    // //         })
                    // //     let A2B={};
                    // //     A2BPoints.forEach(d=>{
                    // //         if(A2B.hasOwnProperty(d.time)){
                    // //             A2B[d.time]+=1;
                    // //         }
                    // //         else A2B[d.time]=1;
                    // //     });
                    // //     let B2A={};
                    // //     B2APoints.forEach(d=>{
                    // //         if(B2A.hasOwnProperty(d.time)){
                    // //             B2A[d.time]+=1;
                    // //         }
                    // //         else B2A[d.time]=1;
                    // //     });
                    // //     let A2BAreaData=[]
                    // //     Object.keys(A2B).forEach(d=>{
                    // //         A2BAreaData.push({tag:'A2B',value:A2B[d],time:d});
                    // //     });
                    // //
                    // //     Object.keys(A2B).forEach(d=>{
                    // //         A2BAreaData.push({tag:'B2A',value:B2A[d],time:d});
                    // //     });
                    // //
                    // //     this.setState({
                    // //         A2BAreaData:A2BAreaData
                    // //     });
                    // //
                    // //     //
                    // //     // const stackedColumnPlot = new Column('stackColumn', {
                    // //     //     data:this.state.A2BAreaData,
                    // //     //     isGroup: true,
                    // //     //     xField: 'time',
                    // //     //     yField: 'value',
                    // //     //     seriesField: 'tag',
                    // //     //     /** 设置颜色 */
                    // //     //     color: ['#1ca9e6', '#f88c24'],
                    // //     //     /** 设置间距 */
                    // //     //     // marginRatio: 0.1,
                    // //     //     label: {
                    // //     //         // 可手动配置 label 数据标签位置
                    // //     //         position: 'middle', // 'top', 'middle', 'bottom'
                    // //     //         // 可配置附加的布局方法
                    // //     //         layout: [
                    // //     //             // 柱形图数据标签位置自动调整
                    // //     //             { type: 'interval-adjust-position' },
                    // //     //             // 数据标签防遮挡
                    // //     //             { type: 'interval-hide-overlap' },
                    // //     //             // 数据标签文颜色自动调整
                    // //     //             { type: 'adjust-color' },
                    // //     //         ],
                    // //     //     },
                    // //     // });
                    // //     //
                    // //     // stackedColumnPlot.render();
                    // //
                    // // }
                    //
                    //
                    //
                    //
                    // console.log('inQuery:',inQueryPoints);
                    //
                    // //把出发和返回的数据统计起来
                    // let fromQueryTimeCount={};
                    // let toQueryTimeCount={};
                    // inQueryPoints.forEach(d=>{
                    //     if(d.tag==='from'){
                    //         if(fromQueryTimeCount.hasOwnProperty(d.time)){
                    //             fromQueryTimeCount[d.time]+=1;
                    //         }
                    //         else{
                    //             fromQueryTimeCount[d.time]=1;
                    //         }
                    //     }
                    //     else{
                    //         if(toQueryTimeCount.hasOwnProperty(d.time)){
                    //             toQueryTimeCount[d.time]+=1;
                    //         }
                    //         else{
                    //             toQueryTimeCount[d.time]=1;
                    //         }
                    //     }
                    //
                    // });
                    // let raidData=[];
                    // Object.keys(fromQueryTimeCount).forEach(d=>{
                    //     raidData.push({time:d, value:fromQueryTimeCount[d], tag:'from'});
                    // });
                    // Object.keys(toQueryTimeCount).forEach(d=>{
                    //     raidData.push({time:d, value:toQueryTimeCount[d], tag:'to'});
                    // });
                    //
                    // this.setState({
                    //     raidData:raidData
                    // });
                    // console.log('raidData:',this.state.raidData);

                    //雷达图
                    // const radarPlot = new Radar('raid', {
                    //     data:this.state.raidData,
                    //     xField: 'time',
                    //     yField: 'value',
                    //     seriesField: 'tag',
                    //     meta: {
                    //         value: {
                    //             alias: '数量'
                    //         },
                    //     },
                    //     xAxis: {
                    //         line: null,
                    //         tickLine: null,
                    //         grid: {
                    //             line: {
                    //                 style: {
                    //                     lineDash: null,
                    //                 },
                    //             },
                    //         },
                    //     },
                    //     // 开启面积
                    //     area: {},
                    //     // 开启辅助点
                    //     point: {
                    //         size: 2,
                    //     },
                    // });
                    // radarPlot.render();




                    //每个多边形内点的ID的数组
                    // this.setState({
                    //     BeijingSpeedData:newBeijingdata
                    // });


                    //查询所有多边形内点的速度,设置河流图
                    // let streamData=[];
                    // let PromiseG=[];
                    //
                    // let avarageTimeMap={};
                    // let heatMapTimeMap={};
                    // console.log('inPoints',inPoints);
                    // inPoints.forEach(d=>{
                    //         if(SpeedMap.hasOwnProperty(d)){//SpeedMap 里面有速度再取
                    //             // console.log('data:',d);
                    //             PromiseG.push(getPointSpeed(d));
                    //         }
                    //     });
                    // Promise.all(PromiseG).then(values=>{
                    //         let time=this.state.time;
                    //         // console.log("point_speed",point_speed);
                    //     inPoints.map((d,index)=>{
                    //         if(SpeedMap.hasOwnProperty(d)) {//SpeedMap 里面有速度再取
                    //             for(let i=-time_interval;i<time_interval;i++){
                    //                 if(time+i*15>=0 && time+i*15<87840 && i%4===0){
                    //                     // console.log('speed:',Math.floor((time+i*15)/15));
                    //                     if(avarageTimeMap.hasOwnProperty(_formatTime(Math.floor((time+i*15))))){
                    //                         avarageTimeMap[_formatTime(Math.floor((time+i*15)))]+=point_speed[d][Math.floor((time+i*15)/15)]
                    //                     }
                    //                     else{
                    //                         avarageTimeMap[_formatTime(Math.floor((time+i*15)))]=point_speed[d][Math.floor((time+i*15)/15)];
                    //                     }
                    //                     //河流图添加数据
                    //                     streamData.push({'name':index+'.','speed':point_speed[d][Math.floor((time+i*15)/15)],'time':_formatTime(Math.floor((time+i*15)))})
                    //                     //旭日图添加数据,不行这个太多了
                    //                     // heatmap.push({"Day":Math.floor((time+i*15)/1440),'hour':Math.floor(Math.floor(((time+i*15)%1440)/60)),'value':point_speed[d][Math.floor((time+i*15)/15)]})
                    //                     //
                    //                 }
                    //             }
                    //
                    //             // for(let i=-area_interval;i<area_interval;i++){
                    //             //     if(time+i*15>=0 && time+i*15<87840){
                    //             //         // console.log('speed:',Math.floor((time+i*15)/15));
                    //             //         getQueryData(time){
                    //             //
                    //             //         }
                    //             //     }
                    //             // }
                    //
                    //
                    //             for(let i=-heatmap_interval;i<heatmap_interval;i++){
                    //                 if(time+i*15>=0 && time+i*15<87840 && i%4===0){
                    //                     // console.log('speed:',Math.floor((time+i*15)/15));
                    //                     if(heatMapTimeMap.hasOwnProperty(_formatDayTime(Math.floor((time+i*15))))){
                    //                         heatMapTimeMap[_formatDayTime(Math.floor((time+i*15)))]+=point_speed[d][Math.floor((time+i*15)/15)];
                    //                     }
                    //                     else{
                    //                         heatMapTimeMap[_formatDayTime(Math.floor((time+i*15)))]=point_speed[d][Math.floor((time+i*15)/15)];
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //         });
                    //
                    //     let avarageData=[];
                    //     Object.keys(avarageTimeMap).forEach(k=>{
                    //         avarageData.push({'time':k,'value':avarageTimeMap[k]/inPoints.length});
                    //     });
                    //     let heatmapData=[];
                    //     Object.keys(heatMapTimeMap).forEach(k=>{
                    //         // debugger
                    //         let s=k.split(':');
                    //         heatmapData.push({'Day':s[1],'hour':s[2],'value':heatMapTimeMap[k]/(inPoints.length)});
                    //     });
                    //
                    //     this.setState({
                    //         streamData:streamData,
                    //         avarageData:avarageData
                    //     });
                    //     console.log('avarageData',this.state.avarageData);
                    //
                    //     // const stream=new Area('stream',{
                    //     //     data:this.state.streamData,
                    //     //     xField:'time',
                    //     //     yField:'speed',
                    //     //     seriesField:'name'
                    //     // });
                    //     // stream.render();
                    //
                    //     // const columnPlot = new Column('column', {
                    //     //     data:this.state.avarageData,
                    //     //     xField: 'time',
                    //     //     yField: 'value',
                    //     //     columnWidthRatio: 1,
                    //     //     xAxis: {
                    //     //         label: {
                    //     //             autoHide: true,
                    //     //             autoRotate: false,
                    //     //             style: {
                    //     //                 fill: 'black',
                    //     //                 opacity: 1,
                    //     //                 fontSize: 10
                    //     //             },
                    //     //         },
                    //     //     },
                    //     //     yAxis:{
                    //     //         label:{
                    //     //             style:{
                    //     //                 fill: 'black',
                    //     //                 opacity: 1,
                    //     //                 fontSize: 20
                    //     //             }
                    //     //         },
                    //     //         grid: {
                    //     //             line: {
                    //     //                 style: {
                    //     //                     stroke: 'black',
                    //     //                     lineWidth: 2,
                    //     //                     lineDash: [4, 5],
                    //     //                     strokeOpacity: 0.8,
                    //     //                     shadowColor: 'black',
                    //     //                     shadowBlur: 10,
                    //     //                     shadowOffsetX: 5,
                    //     //                     shadowOffsetY: 5,
                    //     //                     cursor: 'pointer'
                    //     //                 }
                    //     //             }
                    //     //         }
                    //     //     },
                    //     //     meta: {
                    //     //         type: {
                    //     //             alias: '类别',
                    //     //         },
                    //     //         sales: {
                    //     //             alias: '均值',
                    //     //         },
                    //     //     },
                    //     // });
                    //
                    //     this.setState({
                    //         heatData:heatmapData
                    //     });
                    //     console.log('heatdata',this.state.heatData);
                    //
                    //
                    //     //周期热力图
                    //
                    //     // const heatchart = new F2.Chart({
                    //     //     id: 'heatchart',
                    //     //     pixelRatio: window.devicePixelRatio
                    //     // });
                    //     // heatchart.source(this.state.heatData);
                    //     // heatchart.coord('polar', {
                    //     //     innerRadius: 0.2
                    //     // });
                    //     // heatchart.tooltip(false);
                    //     // heatchart.axis('Day', {
                    //     //     grid: null,
                    //     //     line: null,
                    //     //     tickLine: null,
                    //     //     label: null
                    //     // });
                    //     // heatchart.axis('hour', {
                    //     //     line: null,
                    //     //     tickLine: null,
                    //     //     grid: null,
                    //     //     labelOffset: 3
                    //     // });
                    //     // // [1, 152, 189],
                    //     // //     [73, 227, 206],
                    //     // //     [216, 254, 181],
                    //     // //     [254, 237, 177],
                    //     // //     [254, 173, 84],
                    //     // //     [209, 55, 78]
                    //     // heatchart.polygon()
                    //     //     .position('hour*Day')
                    //     //     // .color('value', '#BAE7FF-#1890FF-#0050B3')
                    //     //     // .color('value', '#0198BD-#49E3CE-#FEEDB1-#D1374E')
                    //     //     .color('value', '#49E3CE-#FEEDB1-#D1374E')
                    //     //     .style({
                    //     //         stroke: '#fff',
                    //     //         lineWidth: 1
                    //     //     });
                    //     //
                    //     // this.state.heatData.forEach(function(val, idx) {
                    //     //     if(idx%24===0){
                    //     //         heatchart.guide().text({
                    //     //             top: true,
                    //     //             position: [ 0, idx/24 ],
                    //     //             content: val['Day'],
                    //     //             style: {
                    //     //                 fill: '#000',
                    //     //                 textAlign: 'center',
                    //     //                 fontSize:5,
                    //     //                 shadowBlur: 2,
                    //     //                 shadowColor: 'rgba(0, 0, 0, .45)'
                    //     //             }
                    //     //         });
                    //     //     }
                    //     // });
                    //     // heatchart.render();
                    //
                    //
                    //     // columnPlot.render();
                    //
                    // });


                    //画出neighbor的
                    // let p3=getposmap();
                    // p3.then(function () {
                    //     // console.log('pos_map',pos_map
                    //     //这个定义好像是要放到函数里面才行，因为定义了马上就执行的！！
                    //     let p4=getneighbor();
                    //     p4.then(function () {
                    //         this.setState({
                    //             neighbor_data:neighbordata
                    //         })
                    //     }.bind(this))
                    // }.bind(this));
                }
                // console.log('Points',inPoints);
                this.setState({
                    inPoints:inPoints,
                    features: updatedData,
                    selectedFeatureIndexes: updatedSelectedFeatureIndexes,
                });
            }
        });
        const layers = this._renderLayers();
        layers.push(layer);

        return (
            <Fragment>
                <DeckGL
                    layers={layers}
                    effects={theme.effects}
                    initialViewState={BEIJIN_VIEW_STATE}
                    viewState={viewState}
                    controller={{
                        doubleClickZoom: false
                    }}
                    onViewStateChange={({viewState})=>{
                        const viewport = new WebMercatorViewport(viewState);
                        const nw = viewport.unproject([0, 0]);
                        const se = viewport.unproject([viewport.width, viewport.height]);
                        // console.log("north: ", nw[1], ", south: ", se[1]);
                        // console.log("east: ", se[0], "west: ", nw[0] );
                        let bound=[[nw[0],se[0]],[se[1],nw[1]]];
                        //判断在视野内
                        // if(this.state.arcData.length>0){
                        //     let tmpData=[];
                        //     this.state.arcData.forEach(d=>{
                        //         // debugger
                        //         // console.log('arcData:',d);
                        //         if( inbound(d.to.coordinates,bound)){
                        //             // if(inbound(d.from.coordinates,bound)){
                        //                 tmpData.push(d);
                        //             // }
                        //
                        //         }
                        //     });
                        //     this.setState({
                        //         arcData:tmpData
                        //     })
                        // }

                    }}
                    getCursor={layer.getCursor.bind(layer)}
                >
                    <StaticMap
                        reuseMaps
                        mapStyle={mapStyle}
                        preventStyleDiffing={true}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                    >
                    </StaticMap>
                </DeckGL>
                <button id = 'out'  style={{position:'absolute', zIndex: 2, top: '330px', right:'10px', backgroundColor: this.state.ODTag===0 ?  'rgb(0, 105, 217)':'rgb(90, 98, 94)'}} onClick={()=>{ this.setState({ODTag : 0})}}>
                    {<this._Icon name={'arrow-to-left'} color='rgba(255,255,255,1)'/>}
                </button>
                <button id= 'in'  style={{position:'absolute', zIndex: 2, top: '365px', right:'10px',backgroundColor: this.state.ODTag===1 ?  'rgb(0, 105, 217)':'rgb(90, 98, 94)'}} onClick={()=>{ this.setState({ODTag: 1})}}>
                    {<this._Icon name={'arrow-to-right'} color='rgba(255,255,255,1)'/>}
                </button>
                <button id = 'bridge'  style={{position:'absolute', zIndex: 2, top: '400px', right:'10px',backgroundColor: this.state.ODTag===2 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)'}} onClick={()=>{ this.setState({ODTag: 2})}}>
                    {<this._Icon name={'trip'} color='rgba(255,255,255,1)'/>}
                </button>
                {/*<button id = 'clean'  style={{position:'absolute', zIndex: 2, top: '435px', right:'10px',backgroundColor: this.state.ODTag===3 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)'}} onClick={()=>{ this.setState({ODTag: 3})}}>*/}
                {/*    {<this._Icon name={'trip'} color='rgba(255,255,255,1)'/>}*/}
                {/*</button>*/}
                {/*<button id = 'clean'  style={{color: 'white',padding: '50px 50px',fontsize:'16px',position:'absolute', zIndex: 2, top: '10px', left:'10px',backgroundColor: this.state.ToolTag===1 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)'}} onClick={()=>{ this.setState({ToolTag: 1})}}>*/}

                {/*</button>*/}
                {/*<button id = 'clean'  style={{color: 'white',padding: '15px 32px',fontsize:'16px',position:'absolute', zIndex: 2, top: '60px', left:'10px',backgroundColor: this.state.ToolTag===1 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)'}} onClick={()=>{ this.setState({ToolTag: 1})}}>*/}
                {/*    {"道路分析"}*/}
                {/*</button>*/}
                {/*<button id = 'clean'  style={{color: 'white',padding: '15px 40px',fontsize:'16px',position:'absolute', zIndex: 2, top: '110px', left:'10px',backgroundColor: this.state.ToolTag===1 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)'}} onClick={()=>{ this.setState({ToolTag: 1})}}>*/}
                {/*    {"预测"}*/}
                {/*</button>*/}
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '10px', left:'10px',backgroundColor: this.state.moduleTag===1 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'70px',width:'100px'}} onClick={()=>{ this.setState({moduleTag: 1, moduleTag2: 0,moduleTag3: 0})}} >
                    {'车流速度展示'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '80px', left:'10px',backgroundColor: this.state.moduleTag===2 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'70px',width:'100px'}} onClick={()=>{ this.setState({moduleTag: 2, moduleTag2: 0,moduleTag3: 0})}} >
                    {'区域分析'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '150px', left:'10px',backgroundColor: this.state.moduleTag===3 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'70px',width:'100px'}} onClick={()=>{ this.setState({moduleTag: 3, moduleTag2: 0,moduleTag3: 0})}} >
                    {'道路分析'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '220px', left:'10px',backgroundColor: this.state.moduleTag===4 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'70px',width:'100px'}} onClick={()=>{ this.setState({moduleTag: 4, moduleTag2: 0,moduleTag3: 0})}} >
                    {'预测交互'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '10px', left:'110px',backgroundColor: this.state.moduleTag2===1 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'35px',width:'150px'}} onClick={()=>{ this.setState({moduleTag2: 1,moduleTag: 1,moduleTag3: 0})}} >
                    {'散点图'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '45px', left:'110px',backgroundColor: this.state.moduleTag2===2 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'35px',width:'150px'}} onClick={()=>{ this.setState({moduleTag2: 2,moduleTag: 1,moduleTag3: 0})}} >
                    {'柱状图'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '80px', left:'110px',backgroundColor: this.state.moduleTag2===3 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'35px',width:'75px'}} onClick={()=>{ this.setState({moduleTag2: 3, moduleTag: 2,moduleTag3: 0})}} >
                    {'区域内分析'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '115px', left:'110px',backgroundColor: this.state.moduleTag2===4 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'35px',width:'75px'}} onClick={()=>{ this.setState({moduleTag2: 4,moduleTag: 2,moduleTag3: 0})}} >
                    {'区域间分析'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '80px', left:'185px',backgroundColor: this.state.moduleTag3===1 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'17.5px',width:'75px'}} onClick={()=>{ this.setState({moduleTag3: 1,moduleTag2: 3, moduleTag: 2})}} >
                    {'线性'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '97.5px', left:'185px',backgroundColor: this.state.moduleTag3===2 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'17.5px',width:'75px'}} onClick={()=>{ this.setState({moduleTag3: 2,moduleTag2: 3, moduleTag: 2})}} >
                    {'周期'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '115px', left:'185px',backgroundColor: this.state.moduleTag3===3 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'17.5px',width:'75px'}} onClick={()=>{ this.setState({moduleTag3: 3,moduleTag2: 4,moduleTag: 2})}} >
                    {'进出统计'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '132.5px', left:'185px',backgroundColor: this.state.moduleTag3===4 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'17.5px',width:'75px'}} onClick={()=>{ this.setState({moduleTag3: 4,moduleTag2: 4, moduleTag:2})}} >
                    {'区域间对比'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '150px', left:'110px',backgroundColor: this.state.moduleTag2===5 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'35px',width:'150px'}} onClick={()=>{ this.setState({moduleTag2: 5,moduleTag:3,moduleTag3: 0})}} >
                    {'道路点趋势'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '185px', left:'110px',backgroundColor: this.state.moduleTag2===6 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'35px',width:'150px'}} onClick={()=>{ this.setState({moduleTag2: 6,moduleTag: 3,moduleTag3: 0})}} >
                    {'道路多点对比'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '220px', left:'110px',backgroundColor: this.state.moduleTag2===7 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'17.5px',width:'150px'}} onClick={()=>{ this.setState({moduleTag2: 7, moduleTag3: 0, moduleTag: 4})}} >
                    {'请求数据展示'}
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '237.5px', left:'110px',backgroundColor: this.state.moduleTag2===8 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'17.5px',width:'100px'}} onClick={()=>{ this.setState({moduleTag2: 8, moduleTag3: 0, moduleTag: 4})}} >
                    <div >{'请求数据筛选'}</div>
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '255px', left:'110px',backgroundColor: this.state.moduleTag2===9 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'17.5px',width:'100px'}} onClick={()=>{ this.setState({moduleTag2: 9, moduleTag3: 0, moduleTag: 4})}} >
                    <div >{'请求数据生成'}</div>
                </button>
                <button id = 'showSpeed'  style={{ position:'absolute', zIndex: 2, top: '272.5px', left:'110px',backgroundColor: this.state.moduleTag2===10 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'17.5px',width:'100px'}} onClick={()=>{ this.setState({moduleTag2: 10, moduleTag3: 0, moduleTag: 4})}} >
                    <div >{'影响值调整'}</div>
                </button>
                <button id = 'showSpeed'  style={{position:'absolute', zIndex: 2, top: '237.5px', left:'210px',backgroundColor: this.state.moduleTag3===5 ? 'rgb(0, 105, 217)':'rgb(90, 98, 94)',color:'rgba(255,255,255,1)',height:'52.5px',width:'50px'}} onClick={()=>{ this.setState({ moduleTag3: 5, moduleTag: 4})}} >
                    {'提交'}
                </button>
                <Toolbox
                    mode={this.state.mode}
                    onSetMode={(setmode)=>{this.setState({mode:setmode()});
                    }}
                    modeConfig={this.state.modeConfig}
                    onSetModeConfig={(setmodeconfig)=>{this.setState({modeConfig:setmodeconfig()})}}
                    geoJson={this.state.features}
                    onSetGeoJson={(setfeatures)=>{this.setState({features:setfeatures()})}}
                    onImport={(setfeatures)=>{this.setState({features:setfeatures()})}}
                />

                {/*{this._renderDrawSelectBar()}*/}
                { this._renderTooltipDep() }
                {this._renderTooltipDes()}
                <StyletronProvider value={engine}>
                    <BaseProvider theme={LightTheme}>
                        {/*<SliderTraffic*/}
                        {/*    min={0}*/}
                        {/*    max={86400}*/}
                        {/*    value={[0,this.state.time]}*/}
                        {/*    formatLabel={this._formatLabel}*/}
                        {/*    onChange={({value}) => {*/}
                        {/*        let nowTime=value[1];*/}

                        {/*        if(blockData.has(nowTime)){*/}
                        {/*            console.log('icon')*/}
                        {/*            tmpIcon.push({*/}
                        {/*                coordinates:blockData.get(nowTime)*/}
                        {/*            })*/}
                        {/*            let tmp=[];*/}
                        {/*            tmpIcon.forEach(d=>{*/}
                        {/*                tmp.push(d)*/}
                        {/*            })*/}
                        {/*            // if(tmpIcon.length>10){*/}
                        {/*                console.log('set')*/}
                        {/*                this.setState({*/}
                        {/*                    blockIcon:tmp*/}
                        {/*                })*/}
                        {/*            // }*/}
                        {/*            console.log(this.state.blockIcon)*/}
                        {/*        }*/}

                        {/*        // console.log('nowTime:',nowTime);*/}
                        {/*        if(Math.floor(nowTime/3600)!==this.state.hour){*/}
                        {/*            this.setState({hour:Math.floor(nowTime/3600)})*/}
                        {/*            console.log('nowztime:',nowTime);*/}
                        {/*            var hour=(nowTime/3600).toFixed(0);*/}
                        {/*            console.log('hour:',hour);*/}
                        {/*            this.setState({*/}
                        {/*                pre_org:setPredictData(hour),*/}
                        {/*                real_org:setRealData(hour)*/}
                        {/*            });*/}
                        {/*            // console.log('pre_org',this.state.pre_org);*/}

                        {/*            var p=getRoute(hour);*/}
                        {/*            p.then(function() {*/}
                        {/*                console.log('Route',Routes)*/}
                        {/*                this.setState({*/}
                        {/*                    Route:Routes,*/}
                        {/*                    depPolygon:depPolygon,*/}
                        {/*                    desPolygon:desPolygon*/}
                        {/*                })*/}
                        {/*            }.bind(this))*/}
                        {/*        }*/}
                        {/*        this.setState({time: nowTime})*/}
                        {/*        // console.log('time',this.state.time)*/}
                        {/*        //console.log(this.state)*/}
                        {/*        //console.log('value:',value)*/}
                        {/*    }}*/}
                        {/*/>*/}

                        <SliderTraffic
                            min={0}
                            max={87840} //分钟
                            value={[0,this.state.time]}
                            formatLabel={this._formatLabel}
                            onChange={({value}) => {
                                let nowTime=value[1];
                                // console.log('nowTime:',nowTime);
                                if(Math.floor(nowTime/15)!==this.state.Quater){
                                    this.setState({Quater:Math.floor(nowTime/15)}) //一天24小时
                                    console.log('nowztime:',nowTime);
                                    // var hour=((nowTime/60)%24).toFixed(0);
                                    // console.log('hour:',hour);
                                    // this.setState({
                                    //     pre_org:setPredictData(hour),
                                    //     real_org:setRealData(hour)
                                    // });
                                    // console.log('pre_org',this.state.pre_org);
                                    // var p=getRoute(hour);
                                    // p.then(function() {
                                    //     console.log('Route',Routes)
                                    //     this.setState({
                                    //         Route:Routes,
                                    //         depPolygon:depPolygon,
                                    //         desPolygon:desPolygon
                                    //     })
                                    // }.bind(this))
                                    let num=Math.floor(nowTime/15);

                                    let p4=getBeijingSpeed(num);

                                    p4.then(function(){
                                        let p5=getPathlist();
                                        p5.then(function(){
                                            getNodeSpeedMap();
                                            let p3=getBeiJingData();
                                            p3.then(function(){
                                                // console.log('beijing',Beijingdata);
                                                this.setState({
                                                    BeijingSpeedData:Beijingdata
                                                })

                                            }.bind(this))
                                        }.bind(this))
                                    }.bind(this));

                                    //num 是除以15后的时间就是测速点
                                    let p_getQuery=getQueryData(num);
                                    p_getQuery.then(function (){
                                        this.setState({
                                            arcData:queryData
                                        });
                                        // 直接设置无法更新图层，不知道怎么才能比较好的更新，原数据置空会更新
                                        // if(num%2===0){
                                        //     console.log('clean');
                                        //     this.setState({
                                        //         arcData:[]
                                        //     });
                                        // }
                                        console.log('arcData:',this.state.arcData)
                                    }.bind(this))

                                }
                                this.setState({time: nowTime})
                                // console.log('time',this.state.time)
                                //console.log(this.state)
                                //console.log('value:',value)
                            }}
                        />



                {/*     <SelectContainer>*/}
                {/*        <Select id={'area'}*/}
                {/*        options={[*/}
                {/*            {label:"出发区域",id:'dep_polygon'},*/}
                {/*            {label:"到达区域",id:'des_polygon'},*/}
                {/*            { label: "隐藏", id: "" },*/}

                {/*        ]}*/}
                {/*        value={this.state.area}*/}
                {/*        placeholder="显示区域"*/}
                {/*        // onChange={params => setValue(params.value)}*/}
                {/*        size={SIZE.mini}*/}
                {/*        onChange={params=> {*/}
                {/*            // console.log('params:',params);*/}
                {/*            if(params.option!=null){*/}
                {/*                if(params.option.id=='dep_polygon'){*/}
                {/*                    console.log()*/}
                {/*                    this.setState({*/}
                {/*                        depPolygon:depPolygon,*/}
                {/*                        depV:true,*/}
                {/*                        desV:false,*/}
                {/*                        area:[{label:"出发区域",id:'dep_polygon'}]*/}
                {/*                    })*/}
                {/*                }*/}
                {/*                else if(params.option.id=='des_polygon'){*/}
                {/*                    console.log('desPolygon',this.state.desPolygon)*/}
                {/*                    this.setState({*/}
                {/*                        desPolygon:desPolygon,*/}
                {/*                        desV:true,*/}
                {/*                        depV:false,*/}
                {/*                        area:[{label:"到达区域",id:'des_polygon'}]*/}
                {/*                    })*/}
                {/*                }*/}
                {/*                else{*/}
                {/*                    this.setState({*/}
                {/*                        desV:false,*/}
                {/*                        depV:false,*/}
                {/*                        area:[{ label: "隐藏", id: "" }]*/}
                {/*                    })*/}
                {/*                }*/}
                {/*            }*/}
                {/*            else{*/}
                {/*                this.setState({*/}
                {/*                    area:[],*/}
                {/*                    desV:false,*/}
                {/*                    depV:false,*/}
                {/*                })*/}
                {/*            }*/}

                {/*        }}*/}
                {/*    />*/}

                {/*</SelectContainer>*/}
                {/*        <SelectContainer2>*/}
                {/*            <Select id={'option'}*/}
                {/*                    options={[*/}
                {/*                        {label:"显示轨迹",id:'route'},*/}
                {/*                        {label:'预测流量',id:"predict"},*/}
                {/*                        {label:"实际流量",id:'real'},*/}
                {/*                        {label:'路障检测',id:'block'}*/}
                {/*                    ]}*/}
                {/*                    value={this.state.options}*/}
                {/*                    placeholder={'选择服务'}*/}
                {/*                    size={SIZE.mini}*/}
                {/*                    onChange={ params=>{*/}
                {/*                        if (params.option!==null){*/}
                {/*                            if(params.option.id==='predict'){*/}
                {/*                                this.setState({*/}
                {/*                                    real:false,*/}
                {/*                                    options:[{label:"预测流量",id:"predict"}],*/}
                {/*                                    showPredict:true*/}
                {/*                                })*/}
                {/*                            }*/}
                {/*                            else if(params.option.id==='real'){*/}
                {/*                                this.setState({*/}
                {/*                                    real:true,*/}
                {/*                                    options:[{label:"实际流量",id:"real"}],*/}
                {/*                                    showPredict:true*/}
                {/*                                })*/}
                {/*                            }*/}
                {/*                            else if(params.option.id==='block'){*/}
                {/*                                this.setState({*/}
                {/*                                    block:true,*/}
                {/*                                    options:[{label:"路障检测",id:"block"}],*/}
                {/*                                    time:45466,*/}
                {/*                                    showPredict:false,*/}
                {/*                                    showRoute:false*/}
                {/*                                })*/}

                {/*                            }*/}
                {/*                            else if(params.option.id==='route'){*/}
                {/*                                this.setState({*/}
                {/*                                    block:false,*/}
                {/*                                    options:[{label:"显示轨迹",id:"route"}],*/}
                {/*                                    showRoute:true,*/}

                {/*                                })*/}
                {/*                            }*/}
                {/*                        }*/}
                {/*                    }}*/}
                {/*            />*/}
                {/*        </SelectContainer2>*/}
                    </BaseProvider>
                </StyletronProvider>
                <div id={'background'} style ={background}>
                    <div id={'line'}/>
                    <div id={'pie'}/>
                <div id={'stream'}/>

                <div id={'column'}/>
                <canvas id="heatchart" width="400" height="260"
                />
                <div id="raid"/>
                <div id={"stackColumn"}/>
                </div>

                <Panel/>
            </Fragment>
        );
    }
}




/* {(<SliderInput
                     value={[0,this.state.time]}
                    min={0}
                    max={24 * 60}
                    formatLabel={this._formatLabel}
                    onChange={({value}) => {
                        if (value % 3600 === 0) {
                            var p = getRoute(value / 3600);
                            p.then(function () {
                                this.setState({
                                    Routes: Routes
                                })
                            }.bind(this))
                        }
                        this.setState({time: value});
                        console.log(value)
                    }}
                />)
                }*/


// export function renderToDOM(container) {
//     render(<App />, container);
// }




//ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<CustomTicks />,document.getElementById('app'))

// require('d3-request').csv(DATA_URL, (error, response) => {
//         if (!error) {
//             const data = response.map(row => ({
//                 timestamp: new Date(`${row.DateTime} UTC`).getTime(),
//                 latitude: Number(row.Latitude),
//                 longitude: Number(row.Longitude),
//                 depth: Number(row.Depth),
//                 magnitude: Number(row.Magnitude)
//             }));
//             ReactDOM.render(<App2 data={data} />, document.getElementById('root'));
//         }
//     });
