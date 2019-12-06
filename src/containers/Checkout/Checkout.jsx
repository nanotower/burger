import React, { Component } from "react";
import CheckoutSum from "../../components/Order/CheckoutSum/CheckoutSum";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

export default class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      bacon: 1,
      cheese: 1
    },
    totalPrice: 0
  };
  componentWillMount() {
    let ingredientsOrdered = {};
    const query = new URLSearchParams(this.props.location.search);
    let price = 0;
    for (let param of query.entries()) {
      if(param[0]==='price'){
        price=param[1]
      } 
      else {
        ingredientsOrdered[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredientsOrdered, totalPrice: price});
  }
  componentDidUpdate() {}

  cancelHandler = () => {
    this.props.history.goBack();
  };

  confirmHandler = () => {
    this.props.history.replace("/checkout/contact");
  };

  render() {
    return (
      <div>
        <CheckoutSum
          ingredients={this.state.ingredients}
          checkoutCancel={this.cancelHandler}
          checkoutConfirm={this.confirmHandler}
        />
        <Route
          path={this.props.match.path + "/contact"}
          render={(props) => <ContactData 
          ingredients={this.state.ingredients} 
          price={this.state.totalPrice}
          {...props}
          />}
        />
      </div>
    );
  }
}
