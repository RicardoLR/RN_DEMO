import { TabNavigator } from 'react-navigation';
import { StackHome } from './AutenticadosStack/StackHome';
import { StackSearch } from './AutenticadosStack/StackSearch';
import { StackFollow } from './AutenticadosStack/StackFollow';
import { StackAdd } from './AutenticadosStack/StackAdd';

import Profile from 'Containers/Autenticados/Profile';

const RutasAutenticadas = TabNavigator(
  {
    Home: {
      screen: StackHome,
    },
    Search: {
      screen: StackSearch,
    },
    Add: {
      screen: StackAdd,
    },
    Follow: {
      screen: StackFollow,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    tabBarPosition: 'bottom',
  },
);

export { RutasAutenticadas };
