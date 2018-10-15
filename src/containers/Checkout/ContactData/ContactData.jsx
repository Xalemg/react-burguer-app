import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/spinner'
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {

    
    state = {
        orderForm: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type:'nomber',
                    placeholder: 'Your Postal Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue:'Fastest'},
                    {value: 'normal', displayValue:'Normal'}
                ]
                },
                value: ''
            }
        },
        loading: false,
    }

    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let id in this.state.orderForm) {
            formData[id] = this.state.orderForm[id].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
        .then(response => {
            console.log(this.props.ingredients);
            
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
        });
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = JSON.parse(JSON.stringify(this.state.orderForm));
        updatedOrderForm[inputId].value = event.target.value;
        this.setState({orderForm: updatedOrderForm});
    }


    render(){
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key] 
            });
            
        }

        let form = ( 
            <form onSubmit = { this.orderHandler } >
        {formElements.map(formElement => (
            <Input 
            key = {formElement.id}
            elementType = {formElement.config.elementType} 
            elementConfig = {formElement.config.elementConfig}
            value = {formElement.config.value}
            changed ={ (event) => this.inputChangedHandler(event, formElement.id) }
            />
        ))}
        <Button btnTtpe="Success" clicked = {this.orderHandler} >Order</Button>
        </form>);
        if (this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData} >
                <h4>Enter Contact Data</h4>
                {form}
            </div>
        
    );}
}

export default ContactData;