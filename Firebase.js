import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {};

const config = {
 apiKey: "AIzaSyCaHjllSb82U7gUKF0fIgJ06RJ-nvtO5Hk",
 authDomain: "rememberit-99dec.firebaseapp.com",
 databaseURL: "https://rememberit-99dec.firebaseio.com",
 projectId: "rememberit-99dec",
 storageBucket: "rememberit-99dec.appspot.com",
 messagingSenderId: "468564219945",
 appId: "1:468564219945:web:aec963de138cf6a0702438",
 measurementId: "G-ZZPHZFWFM3"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;