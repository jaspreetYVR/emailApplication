import React, { useState } from 'react';
import "../css/mail.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import { selectCurrentEmailData } from "../features/mailSlice.js"
import { Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Mail = () => {

    const [currentEmail, setCurrentEmail] = useState(null);

    const navigate = useNavigate();
    const selectCurrentEmail = useSelector(selectCurrentEmailData)

    if (selectCurrentEmail?.id !== null, selectCurrentEmail?.id !== undefined) {
        sessionStorage.setItem('emailId', selectCurrentEmail?.id);
    }

    const handleClick = () => {
        navigate("/");
    }


    useEffect(() => {
        async function getTheDoc() {
            const emailCollection = collection(db, "emails");
            const docRef = doc(emailCollection, sessionStorage.getItem('emailId'));
            const docSnap = await getDoc(docRef);

            const data = docSnap.exists() ? docSnap.data() : null;

            // console.log("========  + " + JSON.stringify(data));
            if (data === null || data === undefined) {
                setCurrentEmail(null)
            } else {
                setCurrentEmail(data)
                // console.log("-=-=-==-=" + JSON.stringify(currentEmail));
            }


        }

        getTheDoc();
    }, []);


    return (
        <div className='mail'>
            <div className="mail__menu">
                <div className="mail__top__menu__left">
                    <div className="mail__top__menu__left__backbutton">
                        <IconButton onClick={handleClick}>
                            <ArrowBackIcon fontSize='small' />
                        </IconButton>
                    </div>
                    <div className="mail__top__menu__left__section__1">
                        <IconButton>
                            <ArchiveOutlinedIcon fontSize='small' />
                        </IconButton>
                        <IconButton>
                            <ReportGmailerrorredIcon fontSize='small' />
                        </IconButton>
                        <IconButton>
                            <DeleteOutlineOutlinedIcon fontSize='small' />
                        </IconButton>
                    </div>
                    <span className="vertical-line"></span>
                    <div className="mail__top__menu__left__section__2">
                        <IconButton>
                            <MailOutlineIcon fontSize='small' />
                        </IconButton>
                        <IconButton>
                            <AccessTimeIcon fontSize='small' />
                        </IconButton>
                        <IconButton>
                            <AddTaskIcon fontSize='small' />
                        </IconButton>
                    </div>
                    <span className="vertical-line"></span>
                    <div className="mail__top__menu__left__section__3">
                        <IconButton>
                            <DriveFileMoveOutlinedIcon fontSize='small' />
                        </IconButton>
                        <IconButton>
                            <LabelOutlinedIcon fontSize='small' />
                        </IconButton>
                        <IconButton>
                            <MoreVertOutlinedIcon fontSize='small' />
                        </IconButton>
                    </div>
                </div>
                <div className="mail__top__menu__right">
                    <IconButton>
                        <ChevronLeftOutlinedIcon fontSize='small' />
                    </IconButton>
                    <IconButton>
                        <ChevronRightOutlinedIcon fontSize='small' />
                    </IconButton>
                </div>
            </div>

            <div className="mail__body__area">
                <div className="mail__subject">
                    <h2>{currentEmail?.subject}</h2>
                    <div className="subject__area__options">
                        <IconButton>
                            <LocalPrintshopOutlinedIcon fontSize='small' />
                        </IconButton>
                        <IconButton>
                            <OpenInNewOutlinedIcon fontSize='small' />
                        </IconButton>
                    </div>
                </div>
                <div className="mail__body__container">
                    <div className="mail__body__header">
                        <div className="mail__body__avatar">
                            <Avatar />
                        </div>

                        <div className="mail__body__header__info">
                            <div className="mail__body__header__left">
                                <h4>
                                    {currentEmail?.recipient}
                                </h4>
                            </div>
                            <div className="mail__body__header__right">
                                {/* <p>{currentEmail?.timeStamp}</p> */}
                                <IconButton>
                                    <StarBorderOutlinedIcon fontSize='small' />
                                </IconButton>

                                <IconButton>
                                    <ReplyRoundedIcon fontSize='small' />
                                </IconButton>

                                <IconButton>
                                    <MoreVertOutlinedIcon fontSize='small' />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className="mail__body">
                        <p>{currentEmail?.message}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mail