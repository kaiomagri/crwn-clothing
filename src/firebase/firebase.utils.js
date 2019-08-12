import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDJ4ip42VzCSxE5oVuAR0IkIZHzKHuREMg",
    authDomain: "crwn-db-6689e.firebaseapp.com",
    databaseURL: "https://crwn-db-6689e.firebaseio.com",
    projectId: "crwn-db-6689e",
    storageBucket: "",
    messagingSenderId: "994761389015",
    appId: "1:994761389015:web:92545e2894ab0c74"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = userRef.get()

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        } catch (error) {
            console.log("Error creating user.", error.message)
        }

    }

    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;