import React, {useContext} from 'react';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';


import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => {

  //const cntx = useContext(AuthContext);
  return (
    <>
    <Card className={classes.home}>
      <h1>Welcome To Musical-App</h1>
    </Card>
    </>
  );
};

export default Home;
