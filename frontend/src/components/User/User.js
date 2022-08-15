import React, {useState, useContext} from "react";
import Card from "../UI/Card/Card";
import AuthContext from '../../store/auth-context';
import axios from "axios";

const User = (props) => {

    const cntx = useContext(AuthContext);
    const [userLogged,setUserLogged] = useState('');
    async function doGetRequest() {

        let res = await axios.get('http://localhost:3030/api/users');
      
        let data = res.data;
        console.log(data);
      }

    return (
        <Card>
        <h1>Welcome {localStorage.getItem('Username')}</h1>
        <button onClick={doGetRequest}>click click</button>
        <h3>What would you like to do today?</h3>
        </Card>
    )
};

export default User;