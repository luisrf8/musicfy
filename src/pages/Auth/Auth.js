import React, {useState} from 'react'
import AuthOptions from '../../Components/Auth/AuthOptions'
import LoginForm from '../../Components/Auth/LoginForm'
import RegisterForm from '../../Components/Auth/RegisterForm'
import BackgroundAuth from '../../assets/jpg/background-auth.jpg'
import LogoNameWhite from '../../assets/png/logo-name-white.png'

import "./Auth.scss"

export default function Auth() {
  const [selectedForm, setSelectedForm] = useState(null);
  const handlerForm = () => {
    switch (selectedForm) {
      case "login": 
      return <LoginForm/>;
      case "register": 
      return <RegisterForm setSelectedForm={setSelectedForm}/>;
      default:
        return <AuthOptions setSelectedForm={setSelectedForm}/>;
    }
  }
  return (
    <div className='auth' style={{backgroundImage: `url(${BackgroundAuth})`}}>
      <div className='auth__dark'/>
      <div className='auth__box'>
        <div className='auth__box-logo'>
          <img src={LogoNameWhite} alt='Musicfy'/>
        </div>
        {handlerForm()}
      </div>
    </div>
  )
}
