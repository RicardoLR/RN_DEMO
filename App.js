import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import Store from 'Store/Store';
import Seleccion from 'Containers/Login/Seleccion';

console.disableYellowBox = ['Remote debugger'];

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { nombre: 'IW-demo' };
  }
  render() {
    return (
      <View style={styles.container}>
        <Provider store={Store}>
          <Seleccion />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
