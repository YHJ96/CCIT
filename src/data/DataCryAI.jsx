import React, { Component } from 'react';
import Axios from 'axios';
import { DataCry } from './data/DataCry';

class DataCryAI extends Component {
    componentDidMount() {
        this.postData();
        console.log(Date.now().toString());
    }
    postData = () => {
        const url = "http://192.168.0.152:1234/api/sensor";
        Axios.post(url,
            {
                id: 1,
            },
            {
                headers: {
                    'x-date': Date.now().toString(),
                    'x-signature': DataCry(url),
                    'x-accesskey': 'GSSIOT',                
                }
            }
        )
        .then((res)=>{
            console.log(res.data);
        })
    }
    
    render() {
        console.log(DataCry('1'))
        return (
            <div>
                Test
            </div>
        );
    }
}

export default DataCryAI;