import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as Navigation } from 'react-router-dom';
import styles from '../styles/DashBoardNav.module.css';

class DashBoardNav extends Component {
    render() {
        const { match } = this.props;
        console.log('DashBoardNav')
        return (    
            <div>
                <Nav className={styles.navcontainer}>
                    <NavItem id={styles.navitem1} 
                    className={styles.navitem}>
                        <NavLink 
                        className={styles.navtext} 
                        activeClassName={styles.select} 
                        tag={Navigation} 
                        to={`${match.url}/map`} 
                        >지도</NavLink>
                        <span className={styles.soild}/>
                    </NavItem>
                    <NavItem 
                    className={styles.navitem}>
                        <NavLink 
                        className={styles.navtext} 
                        activeClassName={styles.select} 
                        tag={Navigation} 
                        to={`${match.url}/sensor`} 
                        >센서값</NavLink>
                        <span className={styles.soild}/>
                    </NavItem>
                    <NavItem 
                    id={styles.navitem2}
                    className={styles.navitem}>
                        <NavLink 
                        className={styles.navtext} 
                        activeClassName={styles.select} 
                        tag={Navigation} 
                        to={`${match.url}/chart`} 
                        >차트값</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default DashBoardNav;