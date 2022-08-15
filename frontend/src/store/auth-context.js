import React, {useState, useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogOut: () => {},
    onLogIn: (username,password) => {}
});

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      if(localStorage.getItem('isLogged')==='1'){
        setIsLoggedIn(true);
      }
    }, []);
    const loginHandler = (username, password) => {
      localStorage.setItem('Username',username);
      localStorage.setItem('Password',password);
      localStorage.setItem('isLogged','1');
      setIsLoggedIn(true);
    };
  
    const logoutHandler = () => {
      localStorage.removeItem('Username');
      localStorage.removeItem('Password');
      localStorage.removeItem('isLogged');
      setIsLoggedIn(false);
    };


    return <AuthContext.Provider
    value={{
        isLoggedIn :isLoggedIn,
        onLogOut: logoutHandler,
        onLogIn: loginHandler
    }}>{props.children}</AuthContext.Provider>
}


export default AuthContext;