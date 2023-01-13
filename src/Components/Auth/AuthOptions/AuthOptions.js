import React from 'react'
import { Button } from "semantic-ui-react";
import "./AuthOptions.scss";

export default function AuthOptions(props) {
  const {setSelectedForm} = props;
  return (
    <div className='auth-options'>
        <h2>Millones de canciones, Gratis en Musicfy!</h2>
        <Button className='register'>
          Registrate Gratis
        </Button>
        <Button className='login'>
          Iniciar Sesion
        </Button>
    </div>
  )
}
