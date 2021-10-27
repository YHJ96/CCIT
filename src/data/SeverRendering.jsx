import React, { Component, createRef } from 'react';
import Axios from 'axios';

class SeverRendering extends Component {
    
    name = createRef();
    user = createRef();

    componentDidMount = () => {
        this.Addget();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.refresh !== prevState.refresh) {
            this.Addget();
            console.log('HI')
            console.log(`${this.state.refresh} ${prevState.refresh}`);
        }
    }

     Addget = async() => {
        const check = false;
        await Axios.get('http://localhost:1235/get')
        .then((res)=>{
            console.log(res.data);
            this.setState({
                data: res.data,
                refresh: check,
            });
        })
    } 

    Addpost = async() => {
        const check = true;
        console.log(this.name.current.value)
        console.log(this.user.current.value)
        await Axios.post('http://localhost:1235/post', {
          name: this.name.current.value,
          user: this.user.current.value,
        })
        .then((res)=>{
            console.log(res.status);
            this.setState({
                refresh: check,
            });
        })
    }

    Addremove = async() => {
        const check = true;
        Axios.delete('http://localhost:1235/delete', {
        })
        .then(()=>{
            this.setState({
                refresh: check,
            })
        })
    }

    state = {
        data: [],
        refresh: false,
    }

    render() {
        return (
            <>
            <section>
                <input ref={this.name} type="text"/> <br/>
                <input ref={this.user} type="text"/> <br/>
            </section> <br/>
            <button onClick={()=>{
                this.Addpost();
            }}>보내기</button>
            <button onClick={()=>{
                this.Addget();
            }}
            >확인</button>
            {
                this.state.data.map((item, index, array)=>{
                    return(
                        <div key={index}>
                        <span>{item.name}</span>
                        <span>{item.user}</span>
                        <button onClick={()=>{
                            this.Addremove()
                        }
                        }>삭제</button>
                        </div>
                    );
                })
            }
            <button
            onClick={()=>{
                console.log(this.state.refresh)
            }}
            >refresh data check</button>
            </>
        );
    }
}

export default SeverRendering;