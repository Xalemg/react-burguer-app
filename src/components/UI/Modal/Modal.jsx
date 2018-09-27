
import React, {Component} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop'
import Aux from '../../../hoc/Aux';

class modal extends Component {
    
    shouldComponentUpdate (nextrProps, nextState) {
        return (nextrProps !== this.props.show); 
    }

    render(){
        return (
            <Aux>
            <Backdrop show={this.props.show} click={this.props.modalClosed}></Backdrop>
            <div 
            className={classes.Modal}
            style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)'}}>
                {this.props.children}
            </div>
            </Aux>
        )
    }
}

export default modal;