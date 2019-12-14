import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../services/orders";
import Preloader from "../../../components/UI/Preloader/Preloader";
import Input from "../../../components/UI/Input/Input";
import { connect } from 'react-redux';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
        validation: {required: true},
        valid: false,
        touched: false
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your address"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 20
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Email"
        },
        value: "",
        validation: {required: true},
        valid: false,
        touched: false
      },
      delivery: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ], 
        },
        validation: {required: false},
        valid: true,
        value: "fastest"
      }
    },
    loading: false,
    validForm: false
  };

  checkValue = (value, rules) => {
    let isValid = true;
    if(!rules.required) return isValid;
    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }
    if(rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for(let elemId in this.state.orderForm) {
      formData[elemId] = this.state.orderForm[elemId].value
    }
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ing,
      price: this.props.price,
      order: formData
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(err => this.setState({ loading: false }));
  };

  inputChangedHandler= (event, eventId) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedOrderElement = {...updatedOrderForm[eventId]};
    updatedOrderElement.value = event.target.value;
    updatedOrderElement.valid = this.checkValue(updatedOrderElement.value, updatedOrderElement.validation);
    let formIsValid = true;
    for(let elemId in updatedOrderForm) {
      formIsValid = updatedOrderForm[elemId].valid && formIsValid;
      console.log(formIsValid, updatedOrderForm[elemId])
    }
    updatedOrderElement.touched = true;
    updatedOrderForm[eventId] = updatedOrderElement;

  
    this.setState({orderForm: updatedOrderForm, validForm: formIsValid})
  }

  render() {
    const formElemArr = [];
    for(let key in this.state.orderForm) {
      formElemArr.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElemArr.map(e => 
          <Input
          key= {e.id}
          elementType= {e.config.elementType}
          elementConfig= {e.config.elementConfig}
          value= {e.config.value}
          changed={(event)=>this.inputChangedHandler(event,e.id)}
          invalid={!e.config.valid}
          shouldValidate={e.config.validation}
          isTouched={e.config.touched}
          type={e.id}
        />
          )}
     
        <Button btnType="Success" disabled={!this.state.validForm}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Preloader />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.ingredients,
    price: state.totalPrice
  }
};



export default connect(mapStateToProps )(ContactData);