import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckOutSummary from '../../components/Order/ChechoutSummary/CheckOutSummary';
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        price: null,
        ingredients: null
    }
    componentWillMount() {
         const query = new URLSearchParams(this.props.location.search);
         const ingredients = {};
         let price = 0;
         for (let param of query.entries()) {
             if(param[0] === 'price') {
                price = param[1];
             }
             else {
                 ingredients[param[0]] = +param[1];
                }
         }
         this.setState({ingredients: ingredients, price: price});
        
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
                <Route exact path={this.props.match.url + '/contact-data'}
                 render={ (props) => (<ContactData 
                 ingredients={this.state.ingredients}
                 price ={this.state.price}
                 {...props}
                 />)}/>
            </div>
        )
    }
}

export default Checkout;