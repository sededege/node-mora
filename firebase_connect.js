const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyB-xm6vR1lAW_afQip14wEpszXvHvNmshw",
    authDomain: "eccomerceapp-4c533.firebaseapp.com",
    databaseURL: "https://eccomerceapp-4c533.firebaseio.com",
    projectId: "eccomerceapp-4c533",
    storageBucket: "eccomerceapp-4c533.appspot.com",
    messagingSenderId: "882407440548",
    appId: "1:882407440548:web:74b4ff94fb2e34d9356631",
    measurementId: "G-4JPVRY2C3F"
  };
  

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const Order = db.collection('orders')

module.exports = Order;