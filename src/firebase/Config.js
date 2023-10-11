import firebase from "firebase/app";
import "firebase/firestore";

// Přihlášovací údaje
const firebaseConfig = {
    apiKey: "AIzaSyCweW1d--8KCTQMWp8kk9lWqpfEgT4qy70",
    authDomain: "reas-reality.firebaseapp.com",
    projectId: "reas-reality",
    storageBucket: "reas-reality.appspot.com",
    messagingSenderId: "863909567874",
    appId: "1:863909567874:web:bb6de2a88b82508279839b"
  };

// Inicializace Firebase aplikace
// Přihlášení s daty do firebase
const app = firebase.initializeApp(firebaseConfig);

// Počáteční nastavení služby Firestore
// Přihlášení do databáze + uložení do proměnné, kterou pak exportujeme
const projectFirestore = app.firestore();

export { projectFirestore };