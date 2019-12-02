import React from "react";
import classes from "./CheckoutSum.module.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const checkoutSum = props => {
  return (
    <div className={classes.CheckoutSum}>
      <h1>Tastes good!</h1>
      <div style={{ margin: "auto", width: "100%"}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancel}>Cancel</Button>
      <Button btnType="Success" clicked={props.checkoutConfirm}>Confirm</Button>
    </div>
  );
};

export default checkoutSum;
