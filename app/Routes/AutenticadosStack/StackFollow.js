import { StackNavigator } from 'react-navigation';
import { TabFollow } from 'Routes/AutenticadosStack/TabFollow';
import Autor from 'Containers/Autenticados/Profile';
import Publicacion from 'Containers/Autenticados/Publicacion';
import Comentarios from 'Containers/Autenticados/Comentarios';




const StackFollow = StackNavigator({
  TabFollow: {
    screen: TabFollow,
    navigationOptions: {
      header: null,
    },
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

export { StackFollow };
