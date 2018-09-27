import React from 'react'


import classes from './DrawerIcon.css'

const DrawerIcon = (props) => (
    
    <div className={classes.DrawerToggle} onClick={props.toggleDrawer}>
        <div className={classes.bar1}></div>
        <div className={classes.bar2}></div>
        <div className={classes.bar3}></div>
    </div>

)

export default DrawerIcon;