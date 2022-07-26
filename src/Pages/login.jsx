import React, { useState, useEffect, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Alert from "../Components/alert";
import TodoContext from '../TodoContext';
import { validateLogin } from "../util/validations"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style/Forms.module.css';

function Login () {
  const [typePassword, setTypePassword] = useState("password");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState(false);
  
  const { 
    users,
    setUsers,  
    showAlert,
    setShowAlert,
    setMessageErro, 
    setNameUser,  
  } = useContext(TodoContext);

  useEffect(() => {
    const getUsers = JSON.parse(localStorage.getItem('users'));
    if(getUsers) setUsers(getUsers)
  }, []);

  function change({ currentTarget }, input) {
    setShowAlert(false);

    if (input === "email") setEmail(currentTarget.value);
    else setPassword(currentTarget.value);
  }

  function sowPassword() {
    console.log(users);
    if (typePassword === "password") setTypePassword('text');
    else setTypePassword("password");
  }

  function go() {
    const messageErro = validateLogin(users, email, password);
    if (messageErro !== true) {
      setMessageErro(messageErro);
      setShowAlert(true);
    }
    else {
      setValidation(true);
    } 
  }

  if (validation) return <Navigate to='/home' />

  const classError = showAlert ? style.Error : null;
	return (
    <main className={style.Form}>
        <h1>Login</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email adress</Form.Label>
            <Form.Control
              size="lg" 
              type="email" 
              placeholder="Add your E-mail"
              value={email}
              onChange={(e) => change(e, "email")}
              className={classError}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type={typePassword} 
              placeholder="Add your password"
              size="lg"
              value={password}
              onChange={(e) => change(e, "password")}
              className={classError}
            />
            <Form.Check
              type="checkbox" 
              label="Show password"
              onClick={sowPassword} 
            />
          </Form.Group>
          <Alert />
        </Form>
        <Button 
          variant="info" 
          size="lg"
          onClick={go}
        >
          Login
        </Button>
        <Link to="/register">Creat Register</Link>
    </main>
	);
}

export default Login;
