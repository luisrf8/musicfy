import React from 'react';
import firebase from './Utils/Firebase';
import 'firebase/compat/auth'

function App() {
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user)
        } else {
          console.log("no hay usuario")
        }
    });
}, []);
  return (
    <div>
      App de Luis Rojas
    </div>
  );
}

export default App;