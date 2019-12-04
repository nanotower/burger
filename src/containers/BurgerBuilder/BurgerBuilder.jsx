import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../services/orders';
import Preloader from '../../components/UI/Preloader/Preloader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
  salad: 0.4,
  cheese: 0.8,
  bacon: 0.9,
  meat: 1.4
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-burger-exercise-94473.firebaseio.com/ingredients.json')
    .then( response => {
      this.setState({
        ingredients: response.data
      })
    })
    .catch(err =>{
      this.setState({error: true})
    })
  }

  purchaseHandler = () => {
    this.setState({
      purchasing:true
    })
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = (ingredients) => {
    // this.setState({loading: true});
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.price,
    //   user: {
    //     name: "Fer",
    //     address: "teststreet"
    //   },
    //   delivery: "fastest"
    // }
    // axios.post('/orders.json', order)
    // .then( response => this.setState({loading: false, purchasing: false}))
    // .catch( err => this.setState({loading: false, purchasing: false}))

    let selectedIngredients = []
    Object.keys(ingredients).forEach(ingredient => {
      selectedIngredients.push(`${encodeURIComponent(ingredient)}=${encodeURIComponent(ingredients[ingredient])}`)
    });
    const queryString = selectedIngredients.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
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
    let orderSummary = null;
   
    let burger = this.state.error? <p>Ther´s a problem with the data request</p> : <Preloader />
    if(this.state.ingredients) {
      burger = (  
      <Aux>
      <Burger ingredients={this.state.ingredients} />
      <BuildControls
        ingredientAdded={this.addIngredientHandler}
        ingredientRemoved={this.removeIngredientHandler}
        disabled={disabledInfo}
        totalPrice={this.state.totalPrice}
        purchaseable={this.state.purchaseable}
        purchase={this.purchaseHandler}
      />
      </Aux>);
       orderSummary = 
       <OrderSummary 
       ingredients={this.state.ingredients}
       cancel={this.purchaseCancelHandler}
       continue={this.purchaseContinueHandler}
       totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);