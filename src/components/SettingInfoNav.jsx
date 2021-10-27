import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, NavLink } from 'reactstrap';
import { farmdata } from '../data/FarmData'
import { NavLink as Navigation } from 'react-router-dom'; 
class SettingInfoNav extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
        }
    }

    toggle = () => {
        this.setState(({isOpen})=>({
            isOpen: !isOpen,
        }))
    }

    navItemCreate = () => {
        const { match } = this.props;
        return farmdata.map((item)=>{
            return <DropdownItem key={item.key}>
                <NavLink tag={Navigation} to={`${match.path}/${item.farmkey}`}>
                    {item.title}
                </NavLink>
            </DropdownItem>
        })
    }

    render() {
        return (
            <ButtonDropdown isOpen={this.state.isOpen} toggle={this.toggle} style={{ marginLeft: '1%' }}>
            <DropdownToggle caret size="sm">
                농가선택
            </DropdownToggle>
            <DropdownMenu>
                {this.navItemCreate()}
            </DropdownMenu>
        </ButtonDropdown>
        );
    }
}

export default SettingInfoNav;