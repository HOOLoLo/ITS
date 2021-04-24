import React from 'react'


export default class Weather extends React.Component {
    state = {
        weather : null,
    }

    

    render() {
        const {weather} = this.state;
        return (
            <div className='weather'>
                {
                    this.state.weather?
                    <div>{weather.city}</div>
                    : null
                }          
            </div>


        )
    }
}

