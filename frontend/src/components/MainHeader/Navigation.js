import React, { useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';


const Navigation = () => {
  const navigate = useNavigate();

  const LoginNavigator = () => {
    navigate('/login');
  };
  const cntx = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {cntx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {cntx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {cntx.isLoggedIn && (
          <li>
            <button onClick={cntx.onLogOut}>Logout</button>
          </li>
        )}
        {!cntx.isLoggedIn && (
          <li>
            <button onClick={LoginNavigator}>Login</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
