import React from "react";
import classes from "./Input.module.css";

const input = props => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];
  if(props.invalid && props.shouldValidate && props.isTouched) {
    inputClasses.push(classes.Invalid)
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textArea":
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = <select
      className={inputClasses.join(' ')}
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed}
      >
        {props.elementConfig.options.map( val => 
        <option value={val.value} key={val.value}>
          {val.displayValue}
        </option>)}
      </select>;
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
 
  let validationError = null;
  if (props.invalid && props.isTouched) {
  validationError = <p className={classes.ValidationError}>Please enter a valid {props.type}!</p>;
  }

  return (
       <div className={classes.Input}>
           <label className={classes.Label}>{props.label}</label>
           {inputElement}
           {validationError}
       </div>
   );

};

export default input;

