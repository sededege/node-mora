

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

var serviceAccount = require("./eccomerceapp-4c533-firebase-adminsdk-bsvvy-1c5a9f67d3.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
module.exports= db;
