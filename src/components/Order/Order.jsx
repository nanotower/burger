import React from "react";
import classes from "./Order.module.css";

const order = props => {
  //from line 7 to 13 it´s the same transformation that has been made in Burger component, but shorter
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  const ingredientsList = ingredients.map(i => (

      <span key={i.name} style={{ textTransform: "capitalize", margin: "0 8px", display: "inline-block", border: "1px solid #ccc", padding: "5px"}}>
        {i.name} ({i.amount})
      </span>

  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsList}</p>
      <p>
        Price <strong>{Number.parseFloat(props.price).toFixed(2)} EUR</strong>
      </p>
    </div>
  );
};

export default order;
