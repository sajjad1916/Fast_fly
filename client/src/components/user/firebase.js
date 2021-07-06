import firebase from 'firebase/app';
import 'firebase/auth';   

const {apikey, authdomain, projectId, storageBucket, messagingSenderID, appID, measurementID
    } = require('../../config/keys');
const config ={
    apiKey:apikey,
    authDomain: authdomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId:messagingSenderID,
    appId: appID,
    measurementId:measurementID
}

firebase.initializeApp(config)
export default firebase; 