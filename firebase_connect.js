const firebase = require('firebase')

const firebaseConfig = {
    apiKey: process.env.apiKey_token,
    authDomain: process.env.authDomain_token,
    databaseURL: process.env.databaseURL_token,
    projectId: process.env.projectId_token,
    storageBucket: process.env.storageBucket_token,
    messagingSenderId: process.env.messagingSenderId_token,
    appId: process.env.appId_token,
    measurementId: process.env.measurementId_token
  };
  

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const Order = db.collection('orders')

module.exports = Order;