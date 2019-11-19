import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './OrderSummary.module.css';

const ordersummary = props => {
  const ingredientsList = Object.keys(props.ingredients)
  .map(ingredient => {
  return <li key={ingredient}><span>{ingredient}</span> : {props.ingredients[ingredient]}</li>
  })
  console.log(classes.OrderSummary)

  return (
    <Aux className={classes.OrderSummary}>
    <h3>Order summary</h3>
    <ul>
      {ingredientsList}
    </ul>
    <p>Continue to checkout?</p>
  </Aux>
)
  }


export default ordersummary;