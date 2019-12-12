import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0
  },
  totalPrice: 4,
}
const INGREDIENTS_PRICES = {
  salad: 0.4,
  cheese: 0.8,
  bacon: 0.9,
  meat: 1.4
}

const reducer = ( state = initialState, action ) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] +1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredient]
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] -1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredient]
      }
    default:
      return state;
  }

};

export default reducer; 