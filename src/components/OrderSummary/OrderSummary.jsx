import React from "react";
import Aux from "../../hoc/Aux";
import classes from "./OrderSummary.module.css";
import Button from "../UI/Button/Button";

const ordersummary = (props) => {
  const ingredientsList = Object.keys(props.ingredients).map(ingredient => {
    return (
      <li key={ingredient}>
        <span>{ingredient}</span> : {props.ingredients[ingredient]}
      </li>
    );
  });

  return (
    <Aux className={classes.OrderSummary}>
      <h3>Order summary</h3>
      <ul>{ingredientsList}</ul>
      <p>
        <strong>Total price: {props.totalPrice.toFixed(2)} €</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.cancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={() => props.continue(props.ingredients)}>
        Proceed
      </Button>
    </Aux>
  );
};

export default ordersummary;
