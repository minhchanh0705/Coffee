import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import LoginRouter from './Navigation/LoginRouter';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoginRouter />
      </Provider>
    );
  }
}
const defaultState = {
  logged: false,
  token: '',
  visible: false,
  visible_edit: false,
  item: {
    img: '',
    title: '',
    price: 0,
  },
  items: [],
  filter: {
    count: 1,
    btn_ice: 'Iced',
    btn_sugar: '0%',
    btn_shots: 'Decaffeinated',
  },
  lst_chosen: [],
  total_cups: 0,
  total_price: 0,
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOGGED':
      return { ...state, logged: action.logged };
    case 'GET_TOKEN':
      return { ...state, token: action.token };
    case 'CHOOSE_ITEM':
      return { ...state, item: { img: action.img, title: action.title, price: action.price } };
    case 'TOGGLE_VISIBLE':
      return { ...state, visible: action.visible };
    case 'TOGGLE_VISIBLE_EDIT':
      console.log("visible_edit: "+action.visible_edit)
      return { ...state, visible_edit: action.visible_edit };
    case 'GET_ITEMS':
      return { ...state, items: action.items };
    case 'FILTER':
      return {
        ...state, filter: {
          count: action.count,
          btn_ice: action.btn_ice,
          btn_sugar: action.btn_sugar,
          btn_shots: action.btn_shots,
        }
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        lst_chosen: [{
          img: action.img,
          title: action.title,
          iced_hot: action.iced_hot,
          sugar: action.sugar,
          shots: action.shots,
          count: action.count,
          price: action.price
        }].concat(state.lst_chosen)
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        lst_chosen: action.lst_chosen
      };
    case 'TOTAL_CUPS':
      return { ...state, total_cups: action.total_cups };
    case 'TOTAL_PRICE':
      return { ...state, total_price: action.total_price };
    case 'ADD_CUPS':
      return { ...state, total_cups: action.total_cups };
    default:
      break;
  }

  return state;
}
const store = createStore(reducer);
