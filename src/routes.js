import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Main from '~/pages/Main';

const Routes = createAppContainer(
  createSwitchNavigator({
    SignIn,
    SignUp,
  }),
  createStackNavigator(
    {
      Main,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#304352',
        },
        headerTintColor: '#FFF',
      },
    },
  ),
);

export default Routes;
