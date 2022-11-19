import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import List from './components/List';
import Sidebar from './components/Sidebar';
import Mail from "./components/Mail";
import SendMail from './components/SendMail';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectSendMessageIsOpen } from './features/mailSlice';
import { selectUserLoggedIn, setIsLoggedIn, logout } from "./features/userSlice";
import Login from './components/Login';
import { auth } from './firebase';

function App() {

  const isSendMessageOpen = useSelector(selectSendMessageIsOpen);
  const userLoggedIn = useSelector(selectUserLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(setIsLoggedIn({
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
          photoUrl: authUser.photoURL
        }))
      } else {
        dispatch(logout())
      }
    })
  }, []);

  return (
    <Router>
      {!userLoggedIn ? <Login /> :
        (<div className="app">
          <Header />
          <div className='app-body'>
            <Sidebar />
            <Routes>
              <Route path='/mail' element={<Mail />} />
              <Route path='/' element={<List />} />
            </Routes>
          </div>
          {isSendMessageOpen && <SendMail />}
        </div>
        )}
    </Router>
  );
}

export default App;
