import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import { Avatar, IconButton } from '@mui/material';
import "../css/header.css";
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUserLoggedIn } from '../features/userSlice';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Header = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUserLoggedIn);
    console.log("Curent user in header: " + JSON.stringify(user));

    const handleLogout = async () => {
        try {
            await signOut(auth)
            dispatch(logout());
            console.log("Logout is successfull");
        } catch (error) {
            console.log("Eroror aaagya while signing out!");
        }
    }

    return (
        <div className='header'>
            <div className="header__left">
                <IconButton><MenuIcon /></IconButton>
                <img src="https://logodownload.org/wp-content/uploads/2018/03/gmail-logo-1-1.png" alt="gmail logo" />
            </div>
            <div className="header__right">
                <div className="header__right__search">
                    <IconButton><SearchIcon /></IconButton>
                    <input type="text" placeholder='Search mail' />
                    <IconButton><TuneIcon /></IconButton>
                </div>
                <div className="header__right__menu__options">
                    <IconButton><HelpOutlineIcon /></IconButton>
                    <IconButton><SettingsOutlinedIcon /></IconButton>
                    <IconButton><AppsRoundedIcon /></IconButton>
                    <Avatar onClick={handleLogout} className='header__right__avatar'>
                        {/* {user?.displayName[0]} */}
                    </Avatar>
                </div>
            </div>
        </div>
    )
}

export default Header