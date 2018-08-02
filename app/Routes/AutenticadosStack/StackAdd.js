import { StackNavigator } from 'react-navigation';
import Add from 'Containers/Autenticados/Add';
import SeleccionarGaleria from 'Components/Commons/SeleccionarImagen';

const StackAdd = StackNavigator({
  Add: {
    screen: Add,
  },
  Seleccion: {
    screen: SeleccionarGaleria,
  },
});

export { StackAdd };
