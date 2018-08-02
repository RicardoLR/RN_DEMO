import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { actionLogin } from 'Store/ACCIONES';

import SignInForm from './Formas/SignInForm';

class SignIn extends Component {

  signinDeUsuario = (values) => {
    this.props.login(values);
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <SignInForm login={this.signinDeUsuario} />
        <Button
          title="SignUp"
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#90EE90',
    paddingHorizontal: 16,
  },
});

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  login: (datos) => { dispatch(actionLogin(datos)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
