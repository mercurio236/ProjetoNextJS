import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDMBTE6Won4UdwuaCacHs1xiVjXxROhqdQ",
    authDomain: "testeboard-35118.firebaseapp.com",
    projectId: "testeboard-35118",
    storageBucket: "testeboard-35118.appspot.com",
    messagingSenderId: "957634421194",
    appId: "1:957634421194:web:b2af1a34771abe292e2f33",
    measurementId: "G-8MWKM2T9BX"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}



export default firebase