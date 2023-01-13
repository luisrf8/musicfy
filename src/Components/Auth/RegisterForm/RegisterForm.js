import React, { useState } from 'react'
import {Button, Icon, Form, Input} from 'semantic-ui-react'
import firebase from '../../../Utils/Firebase';
import 'firebase/auth';

import "./RegisterForm.scss"

export default function RegisterForm(props) {
  const { setSelectedForm } = props;
  const [formData, setFormData] = useState(defaulValueForm()); 
  const [showPassword, setShowPassword] = useState(false)

  const handlerShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const onChange = e => {
    // console.log("Name: " + e.target.name);
    // console.log("Value: " + e.target.value);
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }
  
  const onSubmit = () => {
    console.log("Formulario enviado.");
    console.log(formData);
  }
  return (
    <div className='register-form'>
      <h1>Empieza a escuchar con una cuenta de Musicfy Gratis.</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type='text'
            name='email'
            placeholder='Correo Electronico'
            icon='mail outline'
            //error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Contraseña'
            icon={showPassword ? (<Icon name='eye slash outline' link onClick={handlerShowPassword}/>) : (<Icon name='eye' link onClick={handlerShowPassword}/>)}
            //error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type='text'
            name='username'
            placeholder='Nombre'
            icon='user circle outline'
            //error={}
          />
        </Form.Field>
        <Button type='submit'>
          Continuar
        </Button>
      </Form>
      <div className='register-form__options'>
        <p onClick={() => {setSelectedForm(null)}}>Volver</p>
        <p>¿Ya tienes Musicfy? {""}
          <span onClick={() => {setSelectedForm("login")}}>Iniciar Sesion</span>
        </p>
      </div>
    </div>
  )
}

function defaulValueForm() {
  return {
    email: "",
    password: "",
    username: "",
  }
}
