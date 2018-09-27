
import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerIcon from '../../Navigation/SideDrawer/DrawerIcon/DrawerIcon';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerIcon toggleDrawer={props.toggleDrawer}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);


export default toolbar;


