import React, {Component} from 'react';

import CheckOutSummary from '../../components/Order/ChechoutSummary/CheckOutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
        salad: 1,
        meat: 1,
        cheese: 1,
        bacon: 1
        }
    }
    componentDidMount() {
         const query = new URLSearchParams(this.props.location.search);
         const ingredients = {};
         for (let param of query.entries()) {
             ingredients[param[0]] = +param[1];
         }
         console.log(ingredients);
         this.setState({ingredients: ingredients});
         console.log(this.state.ingredients);
        
    }
    continueHandler =() =>{
        this.props.history.replace('/checkout/contact-data');        
    }
    cancelHandler =() =>{
        this.props.history.goBack();
    }
    render () {
        return (
            <div>
                <CheckOutSummary ingredients= {this.state.ingredients}
                continue={this.continueHandler}
                cancel={this.cancelHandler}
                />
            </div>
        )
    }
}

export default Checkout;