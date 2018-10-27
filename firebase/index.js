import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyD-KkwnWLAoLn7uxI_uw4G77zxmYg8UwEs',
  authDomain: 'coderhousefenix.firebaseapp.com',
  databaseURL: 'https://coderhousefenix.firebaseio.com',
  projectId: 'coderhousefenix',
  storageBucket: 'coderhousefenix.appspot.com',
  messagingSenderId: '714376096291',
}

firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore()
export const auth = firebase.auth()

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
})

export const getCurrentUser = () => {
  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser)
  }

  return auth
    .signInAnonymously()
    .then(() => auth.currentUser)
    .catch(error => console.error(error))
}

export default firebase
