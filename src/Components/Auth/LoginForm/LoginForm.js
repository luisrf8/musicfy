import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
// import { validateEmail } from "../../../Utils/Validations";
import firebase from "../../../Utils/Firebase";
import "firebase/auth";

import "./LoginForm.scss";

export default function LoginForm(props) {
  const { setSelectedForm } = props
  const [formData, setFormData] = useState(defaulValueForm())
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userActive, setUserActive] = useState(true)
  const [user, setUser] = useState(null)

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = e => {
    // console.log("Name: " + e.target.name);
    // console.log("Value: " + e.target.value);
    setFormData({
      ...formData, [e.target.name]: e.target.value,
    })
  }

  const onSubmit = () => {
    // console.log("Login...");
    // console.log(formData);
    setFormError({})
    let errors = {}
    let formOk = true
    // esto es para tener la validacion por email
    // if(!validateEmail(formData.email)) {
    //   errors.email = true; 
    //   formOk = false; 
    // }
    // end esto es para tener la validacion por email
    if(!formData.email) {
      errors.email = true; 
      formOk = false; 
    }
    if(formData.password.length < 6) {
      errors.password = true;
      formOk = false; 
    }
    setFormError(errors);

    if (formOk) {
      setIsLoading(true);
      firebase.auth( ).signInWithEmailAndPassword(formData.email, formData.password)
      .then(response => {
        console.log(response.user)
        setUserActive(true)
      })
      .catch(err => {
        console.log(err.code)
        handlerErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
        // setSelectedForm(null);
      })
    }
  };
  return (
    <div className="login-form">
      <h1>Musica para todos</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo Electronico"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && (
            <span className='error-text'>
              Introduzca un correo Valido
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handlerShowPassword}
                />
              ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
            error={formError.password}
          />
          {formError.password && (
            <span className='error-text'>
              Introduzca un contraseña de mas de 6 digitos.
            </span>
          )}
        </Form.Field>
        <Button type="submit" loading = {isLoading}>Continuar</Button>
      </Form>

      {!userActive && (
        <buttonResetSendEmailVerification
          user={user}
          setIsLoading={setIsLoading}
          setUserActive={setUserActive}
        />
      )}

      <div className="login-form__options">
        <p
          onClick={() => {
            setSelectedForm(null);
          }}
        >
          Volver
        </p>
        <p>
          ¿No tienes cuenta?{" "}
          <span
            onClick={() => {
              setSelectedForm("register");
            }}
          >
            Registrarse
          </span>
        </p>
      </div>
    </div>
  );
}
function buttonResetSendEmailVerification (props) {
  const { user, setIsLoading, setUserActive } = props;

  const resendEmailVerification = () => {
    user.sendEmailVerification().then(() => {
      toast.success("se ha enviado el correo correctamente")
    })
    .catch((err) => {
      console.log("dsadsad")
      handlerErrors(err.code)
    })
    .finally(() => {
      setIsLoading(false);
      setUserActive(null); 
    })
  }
  return (
    <div className="resend-verification">
      <p>
        Si no has recibido el email de verificacion, puedes volver a envialo <span onClick={resendEmailVerification}>aqui</span>
      </p>
    </div>
  )
} 

function handlerErrors(code) {
  switch (code) {
    case "auth/wrong-password": 
    toast.warning("contraseña incorrect")
    break;
    case "auth/too-manu-request":
      toast.warning("has intentado demasiadas veces")
    break;
    case "auth/user-not-found":
      toast.warning("usuario o contraseña incorrectos.")
    break;
    default:
    break;
  }
}
function defaulValueForm() {
  return {
    email: "",
    password: "",
  }
}