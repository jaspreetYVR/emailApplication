import React from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import "../css/send-mail.css";
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeSendMessage } from '../features/mailSlice';
import { useForm } from 'react-hook-form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const SendMail = () => {

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleClose = () => {
        dispatch(closeSendMessage());
    }

    const submitHandler = async (data) => {
        // console.log(data);

        const mailCollection = collection(db, "emails");

        const mailDoc = await addDoc(mailCollection, {
            recipient: data.recipient,
            subject: data.subject,
            message: data.message,
            timeStamp: serverTimestamp()
        })

        dispatch(closeSendMessage())
    }

    return (
        <div className='send__mail'>
            <div className="send__mail__header">
                <h4>New Message</h4>
                <CloseOutlinedIcon onClick={handleClose} fontSize='small' />
            </div>

            <form className="send__mail__body" onSubmit={handleSubmit(submitHandler)}>
                <input
                    {...register('recipient', { required: true })}
                    type="email"
                    placeholder='Recipients'
                />
                {errors.recipient && <p className='send__mail__error'>Recipient is required</p>}
                <input
                    type="text"
                    {...register('subject', { required: true })}
                    placeholder='Subject'
                />
                {errors.subject && <p className='send__mail__error'>Subject is required</p>}
                <textarea
                    {...register('message', { required: true })}
                    className='send__mail__message__input'
                    cols="30"
                    rows="10">
                </textarea>
                {errors.message && <p className='send__mail__error'>Message is required</p>}
                <div className="send__mail__button">
                    <Button type='submit' variant='contained' color='primary'>Send</Button>
                </div>
            </form>
        </div>
    )
}

export default SendMail