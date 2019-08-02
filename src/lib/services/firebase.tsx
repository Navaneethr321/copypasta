import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

import { keys } from '../constants';

firebase.initializeApp(keys.firebase);

const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();

const FieldValue = firebase.firestore.FieldValue;

enum Collections {
  Users = 'users',
}

export {
  db,
  auth,
  functions,
  FieldValue,
  Collections,
};
