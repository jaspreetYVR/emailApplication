import React from 'react';
import "../css/sidebar.css";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openSendMessage } from '../features/mailSlice';


const Sidebar = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(openSendMessage())
    }

    const sidebarListItem = (Icon, title, stat, selected) => (
        <li className={`sidebar__list__item ${selected && 'sidebar--active'}`}>
            <Icon fontSize='small' />
            <p className='sidebar__list__item__text__title'>{title}</p>
            <p className='sidebar__list__item__text__stat'>{stat}</p>
        </li>
    )


    return (
        <div className='sidebar'>
            <Button onClick={handleClick} className='sidebar__compose__button' startIcon={<CreateOutlinedIcon fontSize='large' />}>Compose</Button>
            <div className="sidebar__menu">
                <ul>
                    {sidebarListItem(InboxOutlinedIcon, "Inbox", "853", true)}
                    {sidebarListItem(StarBorderOutlinedIcon, "Starred", "43")}
                    {sidebarListItem(AccessTimeOutlinedIcon, "Snoozed", "55")}
                    {sidebarListItem(SendOutlinedIcon, "Sent", "98")}
                    {sidebarListItem(DescriptionOutlinedIcon, "Drafts", "43")}
                    {sidebarListItem(KeyboardArrowDownOutlinedIcon, "More")}
                </ul>
            </div>

            <div className="sidebar__labels">

            </div>
        </div>
    )
}

export default Sidebar