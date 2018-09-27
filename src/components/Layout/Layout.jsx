import React, {Component} from 'react';

import Aux from  '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    SideDrawerCloseHandler = () => {
        this.setState({showSideDrawer:false})
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => ({showSideDrawer: !this.state.showSideDrawer})) 
    }

    render() {
        return (
            <Aux>
        <Toolbar toggleDrawer ={this.toggleSideDrawerHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerCloseHandler}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </Aux>
        )
    }
};


export default Layout;