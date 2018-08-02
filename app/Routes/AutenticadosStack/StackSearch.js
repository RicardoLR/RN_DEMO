import { StackNavigator } from 'react-navigation';
import Publicacion from 'Containers/Autenticados/Publicacion';
import Search from 'Containers/Autenticados/Search';
import Autor from 'Containers/Autenticados/Profile';
import Comentarios from 'Containers/Autenticados/Comentarios';

const StackSearch = StackNavigator({
  Search: {
    screen: Search,
  },
  Publicacion: {
    screen: Publicacion,
  },
  Autor: {
    screen: Autor,
  },
  Comentarios: {
    screen: Comentarios,
  },
});

export { StackSearch };
