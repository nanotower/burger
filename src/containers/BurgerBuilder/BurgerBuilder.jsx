import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../services/orders';
import Preloader from '../../components/UI/Preloader/Preloader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // totalPrice: 4,
    // purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  // componentDidMount() {
  //   axios.get('https://react-burger-exercise-94473.firebaseio.com/ingredients.json')
  //   .then( response => {
  //     this.setState({
  //       ingredients: response.data
  //     })
  //   })
  //   .catch(err =>{
  //     this.setState({error: true})
  //   })
  // }

  purchaseHandler = () => {
    this.setState({
      purchasing:true
    })
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    // let selectedIngredients = []
    // Object.keys(ingredients).forEach(ingredient => {
    //   selectedIngredients.push(`${encodeURIComponent(ingredient)}=${encodeURIComponent(ingredients[ingredient])}`)
    // });
    // selectedIngredients.push('price=' + this.state.price)
    // const queryString = selectedIngredients.join('&');

    this.props.history.push({
      pathname: '/checkout',
      // search: '?' + queryString
    })
  }

  updatePurchaseState = (updateIngredients) =>{
    const totalIngredients = Object.values(updateIngredients);
    const totalSum = totalIngredients.reduce((ac, av)=>{ return ac+av}, 0);
    return totalSum>0;
  } 

  // addIngredientHandler = type => {
  //   const oldIngredientCount = this.state.ingredients[type];
  //   const newIngredientCount = oldIngredientCount +1;
  //   const updateIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updateIngredients[type] = newIngredientCount;
  //   const priceSum = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.price;
  //   const newPrice = oldPrice + priceSum;
  //   this.setState({
  //     ingredients: updateIngredients,
  //     totalPrice: newPrice
  //   })
  //   this.updatePurchaseState(updateIngredients)
  // }

  // removeIngredientHandler = type => {
  //   const oldIngredientCount = this.state.ingredients[type];
  //   if(oldIngredientCount <= 0) {
  //     return 
  //   }
  //   const newIngredientCount = oldIngredientCount -1;
  //   const updateIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updateIngredients[type] = newIngredientCount;
  //   const priceSum = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.price;
  //   const newPrice = oldPrice - priceSum;
  //   this.setState({
  //     ingredients: updateIngredients,
  //     totalPrice: newPrice
  //   })
  //   this.updatePurchaseState(updateIngredients)
  // }

  render() {
    const disabledInfo = {
      ...this.props.ing
    }
    for(let ingredients in disabledInfo) { 
      disabledInfo[ingredients] = disabledInfo[ingredients] <= 0
    }
    let orderSummary = null;
   
    let burger = this.state.error? <p>Ther´s a problem with the data request</p> : <Preloader />
    if(this.props.ing) {
      burger = (   
      <Aux> 
      <Burger ingredients={this.props.ing} />
      <BuildControls
        ingredientAdded={this.props.onIngredientAdded}
        ingredientRemoved={this.props.onIngredientRemoved}
        disabled={disabledInfo}
        totalPrice={this.props.price}
        purchaseable={this.updatePurchaseState(this.props.ing)}
        purchase={this.purchaseHandler}
      />
      </Aux>);
       orderSummary = 
       <OrderSummary 
       ingredients={this.props.ing}
       cancel={this.purchaseCancelHandler}
       continue={this.purchaseContinueHandler}
       totalPrice={this.props.price}
       />
    }

    if(this.state.loading) {
      orderSummary= <Preloader /> 
    }
    

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.ingredients,
    price: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: ingredientName}), 
    onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredientName})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));