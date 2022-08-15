import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
import Song from './components/UI/Song/Song';
import DisplaySongs from './components/UI/Song/DisplaySongs';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './components/Register/Register';
import User from './components/User/User';

function App() {

//const cntx = useContext(AuthContext);
  return (
    <Router>
      <MainHeader/>
      <main>
      <Routes>
        {/* {!cntx.isLoggedIn && <Login />} */}
        {/* <Home /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/user' element={<User />} /> */}
        </Routes>
        {/* <DisplaySongs /> */}
        <User />
      </main>
    </Router>
  );
}

export default App;
