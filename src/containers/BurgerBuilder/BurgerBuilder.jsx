import React, {Component} from 'react';

import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Aux';
import { connect } from "react-redux";
import * as actionTypes from '../../store/actions';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.8,
    meat: 1.3,
    bacon: 0.6
}

class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

  //   componentDidMount () {
  //       axios.get('https://react-my-burger-9f4e9.firebaseio.com/ingredients.json')
  //       .then( response => {
  //           this.setState({ingredients: response.data            
  //           });
  //       })
  //       .catch(error => {this.setState({error:true})});
  //   }

    updatePurchasable( ingredients) {
        const sum = Object.keys(ingredients).map(
            igKey => {
                return ingredients[igKey];
            }
        )
        .reduce((sum, el) =>{
            return sum +el;
        },0);
        this.setState({purchasable: sum >0})
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedingredients = {
            ...this.state.ingredients
        };
        updatedingredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedingredients});
        this.updatePurchasable(updatedingredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0) {
             return;
        }
        const updatedCount = oldCount - 1;
        const updatedingredients = {
            ...this.state.ingredients
        };
        updatedingredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedingredients});
        this.updatePurchasable(updatedingredients);

    }

    puchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchasCancelHandler = () => {
        this.setState({purchasing:false});
    }
    purchasContinueHandler = () => {
    
    const query = [];
    for (let i in this.state.ingredients) {
        query.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
        
    }
    query.push('price=' + this.state.totalPrice);
    this.props.history.push({
        pathname: '/checkout',
        search: '?' + query.join('&')
    });

    }
    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary =null;
        let burger = this.state.error ? <p>Ingredients can't load</p> : <Spinner/>;
        if(this.props.ings!==null){
            burger = <Aux> 
                <Burger ingredients = {this.props.ings}/>
                <BuildControls 
                ingredientAdded ={this.props.onIngredientAdded}
                ingredientRemoved = {this.props.onIngredientRemoved}
                purchasable = {this.state.purchasable}
                disabled ={disabledInfo}
                ordered={this.puchaseHandler}
                price={this.state.totalPrice} />
            </Aux>
            orderSummary = 
            <OrderSummary
                ingredients={this.props.ings} 
                purchasedCancelled = {this.purchasCancelHandler}
                purchaseContinued = {this.purchasContinueHandler}
                price={this.state.totalPrice} 
            /> 
        }
        if( this.state.loading) {
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    
    return {
        ings: state.ingredients
    };
}

const mapdDispatchToProps = dispatch => { 
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapdDispatchToProps) (withErrorHandler(BurgerBuilder, axios));