import React from 'react';
import { Carousel,Image } from 'antd';

const contentStyle = {
    weight: '800px',
    height: '800px',
};

const picStyle = {
  width: '1200px',
  height: '1200px',
  position: 'absolute',
  top: '340px',
  left: '200px',
};

const inputStyle = {
    position: 'absolute',
    top: '1650px',
    left: '550px',
    'font-size': '50px',
    'line-height': '1.5em',
  };

export default class St extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            key: 0,
            previewPic: '',
            reload: false,
        }
        this.handleUpload = this.handleUpload.bind(this)
    }
    
    componentDidMount() {
        this.timer = setInterval(() => this.handleResize(), 1000);
      }
    componentWillUnmount() {
        /* eslint-disable */
        this.timer && clearTimeout(this.timer);
         /* eslint-enable */
      }
    onChange = a => {
        this.setState({
            key: a,
        })
    }
    handleResize = () => {
    
        this.setState({
          reload: true,
        }, () => {
          this.setState({ reload: false });
        });
      
    }
    handleUpload(e) {
        console.log(e.target.files[0]);
        const reader = new FileReader();
        // 读取文件内容，结果用data:url的字符串形式表示
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function(e) {
            console.log(e.target.result);  // 上传的图片的编码
            this.setState({
                previewPic: e.target.result
            });
        }.bind(this);
    }
    render() {
        return(
            <div>
                
                {/* <img src={'./img/result'+this.state.key+'.jpg'}  className='p1'/> */}
                <img style={picStyle} src={this.state.previewPic}/>
                <input style={inputStyle} type="file" className="file" onChange={this.handleUpload} />
                <div style={{
                    position: 'absolute',
                    top: '1840px',
                    left: '400px',
                    width: '800px',
                    height: '800px',
                }}>
                    <Carousel afterChange={this.onChange} autoplay>
                        <div>
                            <img src='./mosaic.jpg' style={contentStyle} />
                        </div>
                    </Carousel>
                    <h1 style ={{
                        position: 'absolute',
                        top: '850px',
                        left: '10px',
                        'font-weight': 120,
                        'font-size': '80px',
                        'line-height': '1.5em',
                        color: 'white'
                    }}> 风格图片</h1>
                </div>
                
            </div>
        )
    }
}