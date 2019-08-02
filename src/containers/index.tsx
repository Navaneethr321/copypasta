import { 
  createStackNavigator,
  createAppContainer, 
} from 'react-navigation';

import { Routes } from '../lib/constants';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';

const content = createStackNavigator({
  [Routes.Login]: LoginScreen,
  [Routes.Home]: HomeScreen,
}, {
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: Routes.Home,
});

const appContainer = createAppContainer(content);

export default appContainer;