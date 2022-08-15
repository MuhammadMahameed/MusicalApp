import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [usernameState, dispatchUsername] = useReducer(
    (state, action) => {
      if (action.type === "USERNAME") {
        return { value: action.val, isValid: action.val.trim().length > 3 };
      }
      if (action.type === "USERNAME_VALID") {
        //Need to check validation from DB.
        return { value: state.value, isValid: state.value.trim().length > 3 };
      }
      return { value: "", isValid: false };
    },
    {
      value: "",
      isValid: false,
    }
  );

  const [passwordSate,dispatchPW] = useReducer((state,action)=>{
    if(action.type === "USER_PW"){
      return {value:action.val, isValid:action.val.trim().length > 6 };
    }
    if(action.type === "USER_PW_VALIDATION"){
      return {value:state.value, isValid:state.value.trim().length > 6};
    }
    return {value:'',isValid:false};
  },{
    value:'',
    isValid:false
  });
  const cntx = useContext(AuthContext); 
  
  const emailInputRef = useRef(usernameState.value);
  const passwordInputRef = useRef(passwordSate.value);

  //Checking if both email&PW is valid, and puts them in another object for validation
  const {isValid:usernameIsValid} = usernameState; //The point for it, is for useEffect not to run
  const {isValid:passwordIsValid} = passwordSate; //if already the validation is true, and the component is still changing.

  useEffect(()=> {
    const timer = setTimeout(() => {
      //console.log("typing"); Waiting for 500 before typing it.
      setFormIsValid(
        usernameIsValid && passwordIsValid)
    }
    ,500)
    return () => { //Returns function on useEffect launches right when the component creates and b4 the main useEffect function.
      clearTimeout(timer); //Cleaning the setTimeout timer so it wont send request to server
      //console.log("cleanup") Runs when ever cleanup runs
    }
  },[usernameIsValid,passwordIsValid])


  const usernameChangeHandler = (event) => {
    dispatchUsername({ type: "USERNAME", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPW({type:"USER_PW", val:event.target.value});
  };

  const validateUserHandler = () => {
    dispatchUsername({ type: "USERNAME_VALID" });
  };

  const validatePasswordHandler = () => {
    dispatchPW({type:"USER_PW_VALIDATION"})
  };

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      axios.post("http://localhost:3030/api/user/login", {
        username: usernameState.value,
        password: passwordSate.value,
      }).then(res => {
        if(typeof(res.data) === typeof("string")){ //Checks if a Token came back.
        cntx.onLogIn(usernameState.value, passwordSate.value);
        navigate('/');
        }
        else{
          switch(res.data.status){ //Checks if an object with error message came back
            case 400:
              console.log("Validation failed");
              break;
            case 500:
              console.log("Something went wrong, try again later :-)");
              break;
            case 411:
              console.log("Username or E-mail already exists.");
              break;
            default:
              break;
          }
        }
        // cntx.onLogIn(usernameState.value, passwordSate.value);
        // navigate('/');
      }).catch(res => {})
        // cntx.onLogIn(usernameState.value, passwordSate.value);
        // navigate('/');
    }
    else if(!usernameIsValid){
      emailInputRef.current.focus();
    }
    else {
      passwordInputRef.current.focus();
    }
  };

  const navToRegisterHandler= () => {
    navigate('/register');
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input          //E-mail input
        ref={emailInputRef}
        id="username"
        name="Username"
        type="text"
        isValid={usernameIsValid}
        value={usernameState.value}
        onChange={usernameChangeHandler}
        onBlur={validateUserHandler} />

        <Input          //Password input
        ref={passwordInputRef}
        id="password"
        name="Password"
        type="password"
        isValid={passwordIsValid}
        value={passwordSate.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler} />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
      <p style={{textAlign: "center"}}>Not a member yet? <u onClick={navToRegisterHandler}>Click here</u> to sign up!</p>
    </Card>
  );
};

export default Login;
