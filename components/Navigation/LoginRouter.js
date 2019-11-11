import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Logged from '../LoginScreens/Logged';
import LoginScreen from '../LoginScreens/LoginScreen';

const Router = createStackNavigator({
  Logged: {
    screen: Logged,
    navigationOptions: { header: null }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: { header: null }
  }
},
  {
    initialRouteName: 'LoginScreen'
  });
export default createAppContainer(Router);
