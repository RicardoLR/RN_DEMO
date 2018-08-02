import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } from 'react-native-dotenv';

import * as firebase from 'firebase';

const config = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
};
firebase.initializeApp(config);

export const autenticacion = firebase.auth();
export const baseDeDatos = firebase.database();
