import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { autenticacion } from 'Store/Servicios/Firebase';
import { RutasAutenticadas } from 'Routes/RutasAutenticadas';
import { RutasNoAutenticadas } from 'Routes/RutasNoAutenticadas';
import { actionEstablecerSesion, actionCerrarSesion } from 'Store/ACCIONES';

import { UPLOAD_SPRING_IMAGE } from 'react-native-dotenv';


class Seleccion extends Component {
  
  componentDidMount() {
    this.props.autenticacion();
    console.log(UPLOAD_SPRING_IMAGE);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.usuario ? <RutasAutenticadas /> : <RutasNoAutenticadas />}
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  usuario: state.reducerSesion,
});

const mapDispatchToProps = dispatch => ({
  autenticacion: () => {

    autenticacion.onAuthStateChanged((usuario) => {
      if (usuario) {
        console.log(usuario.toJSON());
        dispatch(actionEstablecerSesion(usuario));
      } else {
        console.log('No existe sesión');
        dispatch(actionCerrarSesion());
      }
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Seleccion);
