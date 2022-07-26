import React, { useState, useContext } from 'react';
import { Navigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Alert from "../Components/alert";
import TodoContext from '../TodoContext';
import { 
  validateEmail, 
  validatePassword, 
  validateConfirmPassord,
  validateName, 
} from "../util/validations"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style/Forms.module.css';

function Register () {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword]= useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validation, setValidation] = useState(false);

  const { 
    users,  
    setShowAlert,
    messageError, 
    setMessageErro 
  } = useContext(TodoContext);

  function change({ currentTarget }, input) {
    setMessageErro('');
    setShowAlert(false);

    if (input === "email") setEmail(currentTarget.value);

    else if(input ===  "name") setName(currentTarget.value);

    else if(input ===  "password") setPassword(currentTarget.value);

    else setConfirmPassword(currentTarget.value);
  }

  function validateInputs() {
    const messageErroEmail = validateEmail(email, users);
    const messageErroPassword = validatePassword(password);
    const messageErroConfirmPassword = validateConfirmPassord(password, confirmPassword);
    const messageErroName = validateName(name); 

    if (messageErroName !== true) {
      setMessageErro(messageErroName);
      setShowAlert(true);
      return false;
    }

    if (messageErroEmail !== true) {
      setMessageErro(messageErroEmail);
      setShowAlert(true);
      return false;
    }

    if (messageErroPassword !== true) {
      setMessageErro(messageErroPassword);
      setShowAlert(true);
      return false;
    }

    if (messageErroConfirmPassword !== true) {
      setMessageErro(messageErroConfirmPassword);
      setShowAlert(true);
      return false;
    }
    
    return true;
  }

  function addNewUser() {
    const check = validateInputs();
    if(check) {
      const newUser = {
        name,
        email,
        password
      }
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      setValidation(true);
    }
  }

  if (validation) return <Navigate to="/home" />

	return(
    <main className={style.Form}>
        <h1>Resgister</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type='text'
              size="lg"
              value={name} 
              placeholder="Add your Name"
              onChange={(e) => change(e, "name")}
              className={
                (messageError.includes("name")) ? style.Error : null
              } 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
              <Form.Control 
                type='email'
                size="lg"
                value={email} 
                placeholder="Add your E-mail"
                onChange={(e) => change(e, "email")}
                className={
                  (messageError.includes("email")) ? style.Error : null
                } 
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type='password'
              size="lg"
              value={password}
              placeholder="Add your password"
              onChange={(e) => change(e, "password")}
              className={
                (messageError.includes("Password")) ? style.Error : null
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Confirm the Password</Form.Label>
            <Form.Control 
              type='password'
              size="lg"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(e) => change(e, "confirPassword")}
              className={
                (messageError.includes("Incorrect password")) ? style.Error : null
              }
            />
          </Form.Group>
        </Form>
        <Alert />  
        <Button 
          variant="info" 
          size="lg"
          onClick={() => addNewUser()}
        >
          Submit
        </Button>
    </main>
	);
}

export default Register;
