import { takeEvery, call, select } from 'redux-saga/effects';
import { autenticacion, baseDeDatos } from '../Servicios/Firebase';
import CONSTANTES from '../CONSTANTES';
import axios from 'axios';
import { Platform } from 'react-native';

const registroEnFirebase = values =>
  autenticacion
    .createUserWithEmailAndPassword(values.correo, values.password)
    .then(success => success.toJSON());

const registroEnBaseDeDatos = ({
  uid, email, nombre, fotoURL,
}) =>
  baseDeDatos.ref(`usuarios/${uid}`).set({
    nombre,
    email,
    fotoURL,
  });

const registroFotoCloudinary = ({ imagen }) => {

  const { uri } = imagen;
  const splitName = uri.split('/');
  const name = [...splitName].pop();

  let source;
  if (Platform.OS === 'android') {
    source = {uri: uri, isStatic: true};
  } else {
    source = {uri: uri.replace('file://', ''), isStatic: true};
  }

  const foto = {
    uri: source.uri,
    type: 'image/jpeg',
    name
  };
  const url = Platform.OS === 'android' ? 'http://10.3.2.186:8080/uploadFile' : 'http://10.3.2.186:8080/uploadFile'; // genymotion's localhost is 10.0.3.2

  const formData = new FormData();
  formData.append('file', foto);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"        
    }
  };
  return axios.post(url, formData, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) =>{
      console.error(error);
    });

};

function* sagaRegistro(values) {
  try {
    // cargar foto
    const imagen = yield select(state => state.reducerImagenSignUp);

    const urlFoto = yield call(registroFotoCloudinary, imagen);

    const fotoURL = urlFoto.fileDownloadUri;
    const registro = yield call(registroEnFirebase, values.datos);
    const { email, uid } = registro;
    const { datos: { nombre } } = values;

    yield call(registroEnBaseDeDatos, {
      uid,
      email,
      nombre,
      fotoURL,
    });

  } catch (error) {
    console.log(error);
  }
}

const loginEnFirebase = ({ correo, password }) =>
  autenticacion.signInWithEmailAndPassword(correo, password).then(success => success.toJSON());

function* sagaLogin(values) {
  try {
    const resultado = yield call(loginEnFirebase, values.datos);
  } catch (error) {
    console.log(error);
  }
}

const escribirFirebase = ({
  width, height, fileDownloadUri, uid,
}, texto = '') =>
  baseDeDatos
    .ref('publicaciones/')
    .push({
      width,
      height,
      fileDownloadUri,
      uid,
      texto,
    })
    .then(response => response);

const escribirAutorPublicaciones = ({ uid, key }) =>
  baseDeDatos
    .ref(`autor-publicaciones/${uid}`)
    .update({ [key]: true })
    .then(response => response);

function* sagaSubirPublicacion({ values }) {
  try {
    const imagen = yield select(state => state.reducerImagenPublicacion);
    const usuario = yield select(state => state.reducerSesion);
    const { uid } = usuario;

    const resultadoImagen = yield call(registroFotoCloudinary, imagen);

    const { width, height, fileDownloadUri } = resultadoImagen;
    const parametrosImagen = {
      width: 200,
      height: 200,
      fileDownloadUri,
      uid,
    };
    const escribirEnFirebase = yield call(escribirFirebase, parametrosImagen, values.texto);

    const { key } = escribirEnFirebase;
    const parametrosAutorPublicaciones = { uid, key };
    const resultadoEscribirAutorPublicaciones = yield call(
      escribirAutorPublicaciones,
      parametrosAutorPublicaciones,
    );

  } catch (error) {
    console.log(error);
  }
}

const descargarPublicaciones = () =>
  baseDeDatos
    .ref('publicaciones/')
    .once('value')
    .then(response => response.val());

function* sagaDescargarPublicaciones() {
  try {
    const publicaciones = yield call(descargarPublicaciones);

  } catch (error) {
    console.log(error);
  }
}

export default function* funcionPrimaria() {
  yield takeEvery(CONSTANTES.REGISTRO, sagaRegistro);
  yield takeEvery(CONSTANTES.LOGIN, sagaLogin);
  yield takeEvery(CONSTANTES.SUBIR_PUBLICACION, sagaSubirPublicacion);
  yield takeEvery(CONSTANTES.DESCARGAR_PUBLICACIONES, sagaDescargarPublicaciones);

  console.log('Nuestra función generadora');
}
