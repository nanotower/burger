import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Total price: <span>{props.totalPrice.toFixed(2)} €</span>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        add={() => props.ingredientAdded(ctrl.type)}
        remove={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button 
    className={classes.OrderButton} 
    disabled={!props.purchaseable}
    onClick={props.purchase}
    >
      ORDER
    </button>
  </div>
);

export default buildControls;
