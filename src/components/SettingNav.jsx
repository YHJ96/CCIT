import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as Navigation } from 'react-router-dom';
import styles from '../styles/SettingNav.module.css';

class SettingNav extends Component {
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
                        to={`${match.url}/log`}
                        >이상값설정</NavLink>
                        <span className={styles.soild}/>
                    </NavItem>
                    <NavItem
                    className={styles.navitem}>
                        <NavLink 
                        className={styles.navtext} 
                        activeClassName={styles.select} 
                        tag={Navigation} 
                        to={`${match.url}/users`} 
                        >회원정보</NavLink>
                        <span className={styles.soild}/>
                    </NavItem>
                    <NavItem
                    id={styles.navitem2} 
                    className={styles.navitem}>
                        <NavLink 
                        className={styles.navtext} 
                        activeClassName={styles.select} 
                        tag={Navigation} 
                        to={`${match.url}/info`} 
                        >농장정보</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default SettingNav;