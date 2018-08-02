import { StackNavigator } from 'react-navigation';
import Home from 'Containers/Autenticados/Home';
import Autor from 'Containers/Autenticados/Profile';
import Publicacion from 'Containers/Autenticados/Publicacion';
import Comentarios from 'Containers/Autenticados/Comentarios';

const StackHome = StackNavigator({
  Home: {
    screen: Home,
  },
  Autor: {
    screen: Autor,
  },
  Publicacion: {
    screen: Publicacion,
  },
  Comentarios: {
    screen: Comentarios,
  },
});

export { StackHome };
