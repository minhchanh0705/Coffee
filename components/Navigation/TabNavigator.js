import React from 'react';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator} from "react-navigation-stack";
import FaqScreen from '../Screens/FaqScreen';
import OrdersScreen from '../Screens/OrdersScreen';
import HomeScreen from '../Screens/HomeScreen';
import CartScreen from '../Screens/CartScreen';
import AccountScreen from '../Screens/AccountScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const  FaqStack = createStackNavigator({
  FaqScreen: { screen: FaqScreen }
});
const  OrdersStack = createStackNavigator({
  OrdersScreen: { screen: OrdersScreen }
});
const HometStack = createStackNavigator({
  HomeScreen: { screen: HomeScreen }
});
const  CartStack = createStackNavigator({
  CartScreen: { screen: CartScreen }
});
const  AccountStack = createStackNavigator({
  AccountScreen: { screen: AccountScreen }
});


export default createAppContainer(createBottomTabNavigator(
  {
    Faq: { screen: FaqStack },
    Orders: { screen: OrdersStack },
    Home: { screen: HometStack },
    Cart: { screen: CartStack },
    Account: { screen: AccountStack }
  },
  
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Faq') {
          iconName = `md-help-circle`;
        } else if (routeName === 'Orders') {
          iconName = `ios-book`;
        }else if (routeName === 'Home') {
          iconName = `ios-cafe`;
        }else if (routeName === 'Cart') {
          iconName = `ios-cart`;
        }else if (routeName === 'Account') {
          iconName = `ios-person`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#CFAB57',
      inactiveTintColor: '#FFFFFF',
      style: {
        backgroundColor: '#2B2B2B',
      },
      
    }    
  },
  
));