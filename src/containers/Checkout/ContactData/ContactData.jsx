import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

export default class ContactData extends Component {
  state={
    name:'',
    email:'',
    address: {
      street:'',
      postalCode:''
    }
  }
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your data</h4>
        <form>
          <input type="text" name="name" placeholder="Your name" />
          <input type="email" name="email" placeholder="Your email" />
          <input type="text" name="street" placeholder="Your street" />
          <input type="number" name="pc" placeholder="Your postal code" />
          <Button btnType="Success">Order</Button>
        </form>
        
      </div>
    )
  }
}
