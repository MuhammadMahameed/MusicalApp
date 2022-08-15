import React, {
  useState,
  useRef,
  useReducer,
  useEffect,
  useNavigate,
} from "react";
import Button from "../UI/Button/Button";
import axios from "axios";

import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import classes from "./Register.module.css";
const Register = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  //Username reducer and validation
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

  const usernameChangeHandler = (event) => {
    dispatchUsername({ type: "USERNAME", val: event.target.value });
  };

  const validateUserHandler = () => {
    dispatchUsername({ type: "USERNAME_VALID" });
  };
  const usernameInputRef = useRef(usernameState.value);

  //E-mail reducer and validation
  const [emailSate, dispatchEmail] = useReducer(
    (state, action) => {
      if (action.type === "USER_EMAIL") {
        return { value: action.val, isValid: action.val.includes("@") };
      }
      if (action.type === "USER_EMAIL_VALIDATION") {
        //Need to check validation from DB.
        return { value: state.value, isValid: state.value.includes("@") };
      }
      return { value: "", isValid: false };
    },
    {
      value: "",
      isValid: false,
    }
  );

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_EMAIL", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "USER_EMAIL_VALIDATION" });
  };

  const emailInputRef = useRef(emailSate.value);

  //Password reducer and validation
  const [passwordSate, dispatchPW] = useReducer(
    (state, action) => {
      if (action.type === "USER_PW") {
        return { value: action.val, isValid: action.val.trim().length > 6 };
      }
      if (action.type === "USER_PW_VALIDATION") {
        return { value: state.value, isValid: state.value.trim().length > 6 };
      }
      return { value: "", isValid: false };
    },
    {
      value: "",
      isValid: false,
    }
  );

  const passwordChangeHandler = (event) => {
    dispatchPW({ type: "USER_PW", val: event.target.value });
  };

  const validatePasswordHandler = () => {
    dispatchPW({ type: "USER_PW_VALIDATION" });
  };
  const passwordInputRef = useRef(passwordSate.value);
  //----Use Effect ---//
  //Checking if both email&PW is valid, and puts them in another object for validation
  const { isValid: emailIsValid } = emailSate; //The point for it, is for useEffect not to run
  const { isValid: passwordIsValid } = passwordSate; //if already the validation is true, and the component is still changing.
  const { isValid: usernameIsValid } = usernameState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid && usernameIsValid);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid, usernameIsValid]);
  //--------------Submit dispatch----------------//
  //const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      //cntx.onLogIn(emailSate.value, passwordSate.value); -redirect to backend for login
      //navigate('/'); implement navigate after submit.
      axios.post("http://localhost:3030/api/user/signup", {
        email: emailSate.value,
        username: usernameState.value,
        password: passwordSate.value,
      }).then(res => {
        console.log(res.data);
      }).catch(res => {
        switch(res.data.status){
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
      })
    }
    if (!usernameIsValid) {
      usernameInputRef.current.focus();
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.register}>
      <h2>Welcome to Musical-App registeration page</h2>
      <h4>Please enter your shit and register already</h4>
      <form onSubmit={submitHandler}>
        <Input //Username input
          ref={usernameInputRef}
          id="username"
          name="Username"
          type="text"
          isValid={usernameIsValid}
          value={usernameState.value}
          onChange={usernameChangeHandler}
          onBlur={validateUserHandler}
        />
        <Input //E-mail input
          ref={emailInputRef}
          id="email"
          name="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailSate.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input //Password input
          ref={passwordInputRef}
          id="password"
          name="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordSate.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Register
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Register;
