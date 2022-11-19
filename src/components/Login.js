import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import "../css/login.css";
import { auth, provider } from '../firebase';
import { setIsLoggedIn } from '../features/userSlice';
import { Button } from '@mui/material';

const Login = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const credentials = await signInWithEmailAndPassword(auth, email, password);
            const user = credentials.user;
            console.log("user is : " + JSON.stringify(user));
            // const updatedUser = await updateProfile(user, {
            //     displayName: name
            // })
            // console.log("updated user is : " + JSON.stringify(updatedUser));

            dispatch(setIsLoggedIn({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            }))
        } catch (error) {

            if (error.code === "auth/user-not-found") {
                return setError("Not a user, please register.")
            }

            setError("Fill the form correctly, please.")
            console.log("Error is : " + error);
        }
    }

    const handleRegister = async () => {
        if (!name) {
            return alert('Name is a required input for registering.');
        }
        try {
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = credentials.user;
            console.log("user created is : " + JSON.stringify(user));

            dispatch(setIsLoggedIn({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            }))
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                return setError('Email already in use,please choose any other email!')
            }

            console.log("Error is : " + error)
        }
    }

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // console.log("User ggogle : " + JSON.stringify(user));

            dispatch(setIsLoggedIn({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoUrl: user.photoURL
            }))
        } catch (error) {
            console.log("error " + error.code);
        }

    }

    return (
        <div className='login'>
            <div className='formContainer'>
                <form>
                    <div>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            name='name'
                            type="text"
                            placeholder='Full name required if registering.'
                        />
                    </div>
                    <div>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            name='email'
                            type="email"
                            placeholder='Email'
                        />
                    </div>
                    <div>
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            name='password'
                            type="password"
                            placeholder='Password'
                        />
                    </div>
                    <Button className='formButton' variant='outlined' type='submit' onClick={handleLogin}>Login</Button>
                </form>
                <Button className='googleLoginButton' variant='contained' onClick={signInWithGoogle}>Login with Google</Button>
                <p >Don't have an account? <span className='registerText' onClick={handleRegister}>Register Now!</span> </p>

                {err && <p className='errorMessage'>{err}</p>}
            </div>
        </div>
    )
}

export default Login