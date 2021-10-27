import React, { PureComponent } from 'react';
import { 
    Navbar, 
    NavbarBrand, 
    NavbarToggler, 
    Collapse, 
    Nav, 
    NavItem, 
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
 } from 'reactstrap';
import { NavLink as Navigation } from 'react-router-dom';
import styles from '../styles/Navi.module.css';
import * as Icon from 'react-bootstrap-icons';

class Navi extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            isHide: true,
        }
    }

    toggle = () => {
        this.setState(({ isOpen, isHide }) => ({
            isOpen: !isOpen,
            isHide: !isHide,
        }))
    }

    gobackLogin = () => {
        const { history } = this.props;
        history.push('/');
    }

    goPushTv = () => {
        const { history } = this.props;
        history.push('/tv')
    }

    render() {
        const { match } = this.props;
        return (
            <Navbar color="dark" dark expand="md">
            <NavbarToggler onClick={this.toggle} /> 
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav navbar>
                    
                    <NavItem className={styles.navcontainer}>
                        <NavLink 
                        className={styles.navitem}
                        activeClassName={styles.select}
                        tag={Navigation} 
                        to={`${match.url}/dashboard`}
                        ><Icon.ColumnsGap className={styles.icon}/>
                        대시보드</NavLink>
                    </NavItem>

                    <NavItem className={styles.navcontainer}>
                        <NavLink 
                        className={styles.navitem}
                        activeClassName={styles.select}
                        tag={Navigation} 
                        to={`${match.url}/detailsearch`}
                        ><Icon.WindowSidebar className={styles.icon}/>
                        농장상세조회</NavLink>
                    </NavItem>

                    <NavItem className={styles.navcontainer}>
                        <NavLink 
                        className={styles.navitem}
                        activeClassName={styles.select}
                        tag={Navigation} 
                        to={`${match.url}/datasearch`}
                        ><Icon.BarChartLine className={styles.icon}/>
                        데이터조회</NavLink>
                    </NavItem>

                    <NavItem className={styles.navcontainer}>
                        <NavLink 
                        className={styles.navitem}
                        activeClassName={styles.select}
                        tag={Navigation} 
                        to={`${match.url}/plant`}
                        ><Icon.Play className={styles.icon}/>
                        생육데이터조회</NavLink>
                    </NavItem>

                    <NavItem id={styles.tv} className={styles.navcontainer} onClick={this.goPushTv}>
                    <NavLink 
                        className={styles.navitem}
                        ><Icon.Tv className={styles.icon}/>
                        관제모드</NavLink>
                    </NavItem>

                    <NavItem className={styles.navcontainer}>
                        <NavLink 
                        className={styles.navitem}
                        activeClassName={styles.select}
                        tag={Navigation} 
                        to={`${match.url}/setting`}
                        ><Icon.Gear className={styles.icon}/>
                        설정</NavLink>
                    </NavItem>

                </Nav>
            </Collapse>

            <Collapse isOpen={this.state.isHide}>
            <Nav>

                <NavbarBrand className={styles.navtext}>GSS</NavbarBrand>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle 
                className={styles.dropnav} 
                nav 
                caret/>
                
                <DropdownMenu right>
                    <DropdownItem
                    onClick={this.gobackLogin}
                    >로그아웃</DropdownItem>
                </DropdownMenu>

                </UncontrolledDropdown>
            </Nav>
            </Collapse>
        </Navbar>
        );
    }
}

export default Navi;