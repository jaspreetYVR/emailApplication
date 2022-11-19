import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import ListSections from './ListSections';
import ListRow from "./ListRow";
import Checkbox from '@mui/material/Checkbox';
import "../css/list.css"
import { IconButton } from '@mui/material';
import { useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';

const List = () => {

    const [emails, setEmails] = useState([]);

    useEffect(() => {
        const emailCollection = collection(db, 'emails');
        const q = query(emailCollection, orderBy("timeStamp", "desc"))
        const unSubscribe = onSnapshot(q, snapShot => {
            setEmails(snapShot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })));
        })

        return () => {
            unSubscribe();
        }
    }, []);

    return (
        <div className='list'>
            <div className="email__list__settings">
                <div className="email__list__settings__left">
                    <Checkbox className='email__settings__button' />
                    <IconButton>
                        <ArrowDropDownIcon className='email__settings__button' />
                    </IconButton>

                    <IconButton>
                        <RefreshRoundedIcon className='email__settings__button' />
                    </IconButton>

                    <IconButton>
                        <MoreVertRoundedIcon className='email__settings__button' />
                    </IconButton>
                </div>
                <div className="email__list__settings__right">
                    <IconButton>
                        <ChevronLeftRoundedIcon className='email__settings__button' />
                    </IconButton>

                    <IconButton>
                        <ChevronRightRoundedIcon className='email__settings__button' />
                    </IconButton>
                </div>
            </div>

            <div className="list__sections">
                <ListSections Icon={InboxOutlinedIcon} title="Primary" color="red" selected />
                <ListSections Icon={LocalOfferRoundedIcon} title="Promotions" color="#1A73EB" />
                <ListSections Icon={GroupRoundedIcon} title="Social" color="green" />
            </div>

            <div className="list__section__rows">

                {emails.map(({ id, data: { recipient, message, subject, timeStamp } }) => (
                    <ListRow
                        id={id}
                        key={id}
                        title={recipient}
                        description={subject}
                        message={message}
                        time={new Date(timeStamp?.seconds * 1000).toUTCString()}
                    />))}
            </div>
        </div>
    )
}

export default List