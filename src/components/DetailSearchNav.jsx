import React, { Component } from 'react';
import { farmdata } from '../data/FarmData';
import { Nav, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink as Navigation } from 'react-router-dom';
import styles from '../styles/DetailSearchNav.module.css';

class DetailSearchNav extends Component {
    constructor(props){
        super(props)
        this.state = {
            dropOpen : false,
        }
    }

    toggle = () => {
        this.setState(({dropOpen})=>({
            dropOpen : !dropOpen
        }))
    }

    navItemCreate = () => {
        const { match } = this.props;
        return farmdata.map((item)=>{
            return <DropdownItem className={styles.navitem} key={item.id}>
                <NavLink className={styles.navtext} tag={Navigation} to={`${match.path}/farm/${item.id}`}>{`${item.title}`}</NavLink>
            </DropdownItem>
        })
    }

    render() {
        return (
            <div>
            <Nav className={styles.navcontainer}>
              <Dropdown className={styles.navbtn} nav isOpen={this.state.dropOpen} toggle={this.toggle}>
                <DropdownToggle className={styles.navtitle} nav caret>농장선택</DropdownToggle>
                <DropdownMenu className={styles.navmenu}>
                    {this.navItemCreate()}
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </div>
        );
    }
}

export default DetailSearchNav;