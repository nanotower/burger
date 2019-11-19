import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
  salad: 0.4,
  cheese: 0.8,
  bacon: 0.9,
  meat: 1.4
}

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0,
    purchaseable: false,
    purchasing: false
  }

  purchaseHandler = () => {
    this.setState({
      purchasing:true
    })
    console.log(this.state.purchasing)
  }

  updatePurchaseState = (updateIngredients) =>{
    const totalIngredients = Object.values(updateIngredients);
    const totalSum = totalIngredients.reduce((ac, av)=>{ return ac+av}, 0);
    this.setState({
      purchaseable: totalSum>0
    })
    console.log(totalIngredients)
  } 

  addIngredientHandler = type => {
    const oldIngredientCount = this.state.ingredients[type];
    const newIngredientCount = oldIngredientCount +1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = newIngredientCount;
    const priceSum = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceSum;
    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice
    })
    this.updatePurchaseState(updateIngredients)
  }

  removeIngredientHandler = type => {
    const oldIngredientCount = this.state.ingredients[type];
    if(oldIngredientCount <= 0) {
      return 
    }
    const newIngredientCount = oldIngredientCount -1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = newIngredientCount;
    const priceSum = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSum;
    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice
    })
    this.updatePurchaseState(updateIngredients)
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let ingredients in disabledInfo) { 
      disabledInfo[ingredients] = disabledInfo[ingredients] <= 0
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          totalPrice={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          purchase={this.purchaseHandler}
        ></BuildControls>
      </Aux>
    );
  }
}
