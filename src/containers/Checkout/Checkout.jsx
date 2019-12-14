import React, { Component } from "react";
import CheckoutSum from "../../components/Order/CheckoutSum/CheckoutSum";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from 'react-redux';

class Checkout extends Component {
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
          ingredients={this.props.ing}
          checkoutCancel={this.cancelHandler}
          checkoutConfirm={this.confirmHandler}
        />
        <Route
          path={this.props.match.path + "/contact"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout);