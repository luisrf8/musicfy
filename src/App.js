import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";
import firebase from './Utils/Firebase';
import 'firebase/compat/auth'
import Auth from './pages/Auth/Auth';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

    firebase.auth().onAuthStateChanged((currentUser) => {
      console.log(currentUser)
      if(!currentUser?.emailVerified) {
        firebase.auth().signOut()
        setUser(null);
      }
      else {
        setUser(currentUser);
      }
      setIsLoading(false);
    });
    if (isLoading) {
      return null;
    }
  return (
    <>
      {!user ? <Auth/> : <UserLogged/>}
      <ToastContainer 
        position='top-center'
        autoClose = {5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl = {false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover = {false}

      />
    </>
  );
}

function UserLogged() {
  const logOut = () => {
    firebase.auth().signOut();
  }
  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100vh"}}>
      <h1>Usuario Logueado</h1>
      <button onClick={logOut}>Cerrar Sesion</button>
    </div>
  )
}

export default App;