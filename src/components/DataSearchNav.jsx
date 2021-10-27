import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as Navigation } from 'react-router-dom';
import styles from '../styles/DataSearchNav.module.css';

class DataSearchNav extends Component {
    render() {
        const { match } = this.props;
        return (
            <div>
                <Nav className={styles.navcontainer}>
                    <NavItem id={styles.navitem1} 
                    className={styles.navitem}>
                        <NavLink 
                        className={styles.navtext} 
                        activeClassName={styles.select} 
                        tag={Navigation} 
                        to={`${match.url}/indi`} 
                        >개별농가센싱데이터</NavLink>
                        <span className={styles.soild}/>
                    </NavItem>
                    <NavItem
                    id={styles.navitem2} 
                    className={styles.navitem}>
                        <NavLink 
                        className={styles.navtext} 
                        activeClassName={styles.select} 
                        tag={Navigation} 
                        to={`${match.url}/multi`} 
                        >복수농가센싱데이터</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

/*
                    <NavItem  id={styles.navitem2}
                    className={styles.navitem}>
                        <NavLink 
                        className={styles.navtext} 
                        activeClassName={styles.select} 
                        tag={Navigation} 
                        to={`${match.url}/log`} 
                        >개별농가로그데이터</NavLink>
                    </NavItem>
*/

export default DataSearchNav;