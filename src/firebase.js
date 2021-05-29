import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDxbphkQOQScgO71II5zFPlC9Hj3OLVbFI",
	authDomain: "dynamic-app-clones.firebaseapp.com",
	projectId: "dynamic-app-clones",
	storageBucket: "dynamic-app-clones.appspot.com",
	messagingSenderId: "334997288032",
	appId: "1:334997288032:web:60887cff18a3759933bf05",
	measurementId: "G-RLEY8N34PD",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

export const auth = firebase.auth();
export const storage = firebase.storage();
