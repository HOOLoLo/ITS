import React from 'react';
import { Calendar , Badge, DatePicker , TimePicker , Select ,Button} from 'antd';
const { Option } = Select;
let tem_mon, tem_dat, tem_con;
let tem_tim, tem_rea;
let listData = [];


function getMonthData(value) {
    
}
function dateCellRender(value) {
    // console.log('日期',value.month())
    return (
      <ul className="events">
        {listData.map(item => (
            item.date == value.date() ?
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li> : null 
        ))}
      </ul>
    );
}
function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
}

function onChange_date(date, dateString) {
    console.log(date, dateString);
    tem_mon = date.month() + 1;
    tem_dat = date.date();
    console.log('月份',tem_mon)
    console.log('日期',tem_dat)
}

function onChange_time(time, timeString) {
    console.log(time, timeString);
    tem_tim = timeString[0] + "至" + timeString[1];
    console.log('内容',tem_tim)
}

function handleChange(value) {
    console.log(`selected ${value}`);
    tem_rea = value;
    tem_con = tem_tim + " "+ tem_rea;
    console.log('最终内容',tem_con);
}



export default class Appo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            flag: false,
            
        }
        if(localStorage.getItem("list")!=null){
            listData = JSON.parse(localStorage.getItem("list"))
        }else{
            localStorage.setItem("list",JSON.stringify(listData))
        }
    }
      

    onBtClick = e => {
        listData = [...listData, {month: tem_mon, date:tem_dat,type: 'success',content: tem_con }]
        this.setState({
            flag: true,
        })
        localStorage.setItem("list",JSON.stringify(listData))
    }
    
    dateCellRender(value) {
        // console.log('日期',value.month())
        return (
          <ul className="events">
            {listData.map(item => (
                item.date == value.date() ?
              <li key={item.content}>
                <Badge status={item.type} text={item.content} />
              </li> : null 
            ))}
          </ul>
        );
    }
    render() {

        return(
            <div>
                <div style={{
                    position: 'absolute',
                    top: '400px',
                    left: '370px',
                    width: '1500px',
                    'line-height': '2em',
                    'font-size': '7em',
                }}>实验室预约日历</div>
                <div style={{
                    position: 'absolute',
                    top: '800px',
                    left: '-50px',
                    width: '1600px',
                    height: '1000px',
                }}>
                    <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
                </div>
                <div style={{
                    position: 'absolute',
                    top: '1800px',
                    left: '360px',
                    width: '1500px',
                    'line-height': '2em',
                    'font-size': '5em',
                    'font-weight': 400,
                }}>请选择预约时间及事项</div>
                <div style = {{
                    position: 'absolute',
                    top: '2000px',
                    left: '150px',
                }}>
                    <DatePicker 
                        onChange={onChange_date}
                        style={{
                            height:'40px',
                            width:'200px'
                        }} 
                    />
                </div>
                <div style = {{
                    position: 'absolute',
                    top: '2000px',
                    left: '450px',
                    }}>
                    <TimePicker.RangePicker onChange={onChange_time} style={{
                            height:'40px',
                            width:'400px'
                        }} />
                </div>
                <div style = {{
                    position: 'absolute',
                    top: '2000px',
                    left: '950px',
                    }}>
                    <Select  placeholder="请选择预约事项"  style={{ width: '200px'}}  size='large'  onChange={handleChange}>
                        <Option value="自行参观">自行参观</Option>
                        <Option value="交流学习">交流学习</Option>
                        <Option value="举办活动">举办活动</Option>
                        <Option value="其他">其他</Option>
                    </Select>
                </div>
                <div style = {{
                    position: 'absolute',
                    top: '2000px',
                    left: '1250px',
                    'font-weight': 350,
                    }}>
                    <Button type="primary" size='large' onClick={this.onBtClick}> 提交预约</Button>
                </div>
                
            </div>
        )
    }
    
}