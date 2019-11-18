import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

 const burger = (props) => {
  const ingredientsArr = Object.keys(props.ingredients)
  .map(ingKey => {
    return [...Array(props.ingredients[ingKey])].map((_,idx) => {
      return <BurgerIngredient key={ ingKey + idx} type={ingKey}/>
    })
  })
  
   return (
     <div className={classes.Burger}>
       <BurgerIngredient type="bread-top" />
       {ingredientsArr}
       <BurgerIngredient type="bread-bottom" />

     </div>
   )
 }
export default burger;