import { StackNavigator } from 'react-navigation';
import SignIn from 'Containers/NoAutenticados/SignIn';
import SignUp from 'Containers/NoAutenticados/SignUp';

const RutasNoAutenticadas = StackNavigator(
  {
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    headerMode: 'none',
  },
);

export { RutasNoAutenticadas };
