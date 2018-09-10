import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBEgPHBQTTOa6TNwMTdhldqv6ApAyh6bLg',
  authDomain: 'revents-213812.firebaseapp.com',
  databaseURL: 'https://revents-213812.firebaseio.com',
  projectId: 'revents-213812',
  storageBucket: '',
  messagingSenderId: '1046776963909',
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true,
};
firestore.settings(settings);
export default firebase;
