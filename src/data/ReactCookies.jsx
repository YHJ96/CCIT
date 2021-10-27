import React, { Component } from 'react';
import Checkbox from './CheckBox';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class ReactCookies extends Component {
    
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

    constructor(props){
        super(props)
        const { cookies } = this.props;
        this.state = {
            value: cookies.get('test') || [],
        }
    }

    componentDidMount = () => {
        this.selectedCheckboxes = new Set();
    }

    toggleCheckbox = (item) => {
        if (this.selectedCheckboxes.has(item)) {
            this.selectedCheckboxes.delete(item);
        } else {
            this.selectedCheckboxes.add(item);
        }
    }

    handleFormSubmit = (formSubmitEvent) => {
        const { cookies } = this.props;
        formSubmitEvent.preventDefault();
        cookies.remove('test')
        this.setState({
            value: [],
        })
        return (
            this.selectedCheckboxes.forEach((item) => {
                const { cookies } = this.props;
                this.setState(({value}) => ({value: value.concat({[item.name] : item.value})}), ()=>{
                    cookies.set('test', this.state.value, { path: '/' })
                    console.log(cookies.get('test'))
                })
            })
        );
    }
    
    /* returnTest = () => {

        const { cookies } = this.props;
        this.selectedCheckboxes.forEach((item) => {
             this.setState(({value}) => ({
                value: value.concat({[item.name]: item.value}),
            }))
            cookies.set('test', [].concat({[item.name] : item.value}), { path: '/' })
        })
    } */
    
    createCheckboxes = () => {
        return (
            items.map((item, index) => {
                return (
                    <Checkbox
                    label={item.value}
                    toggleCheckbox={()=>{
                        this.toggleCheckbox(item)
                    }}
                    key={index}
                    />
                );
            })
        )
    }

    valueConsoleLog = () => {
        const { cookies } = this.props;
        //const TEST = [this.state.value]
        //console.dir(TEST)
        console.dir(cookies.get('test')) 
    }

    render() {
        const value = this.state.value;
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    {this.createCheckboxes()}
                    <button type="submit">Save</button>
                </form>
                <button onClick={this.valueConsoleLog}>ValueConsoleLog</button> <br/>
                {
                    value.map((item, index)=>{
                        return(
                            <span key={index}>{item.name}</span>
                        );
                    })
                }
            </div>
        );
    }
}

export default withCookies(ReactCookies);