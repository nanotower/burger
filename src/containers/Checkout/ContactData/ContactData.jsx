import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../services/orders';
import Preloader from '../../../components/UI/Preloader/Preloader';

export default class ContactData extends Component {
  state={
    name:'',
    email:'',
    address: {
      street:'',
      postalCode:''
    },
    loading: false 
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      user: {
        name: "Fer",
        address: "teststreet"
      },
      delivery: "fastest"
    }
    axios.post('/orders.json', order)
    .then( response => this.setState({loading: false, purchasing: false}))
    .catch( err => this.setState({loading: false, purchasing: false}))
  }

  render() {
    let form = (
      <form>
      <input type="text" name="name" placeholder="Your name" />
      <input type="email" name="email" placeholder="Your email" />
      <input type="text" name="street" placeholder="Your street" />
      <input type="number" name="pc" placeholder="Your postal code" />
      <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
    </form>
    );
    if(this.state.loading) {
      form = <Preloader />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your data</h4>
       {form}
        
      </div>
    )
  }
}
