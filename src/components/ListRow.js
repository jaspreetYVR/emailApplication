import Checkbox from '@mui/material/Checkbox';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import React from 'react';
import "../css/list-row.css"
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentEmailData } from '../features/mailSlice';

const ListRow = ({ id, title, message, description, time }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function padTo2Digits(num) {
        return String(num).padStart(2, '0');
    }
    const date = new Date(time);
    const timeFormat = date.getHours() + ":" + padTo2Digits(date.getMinutes());

    const handleClick = () => {
        dispatch(setCurrentEmailData({
            id: id
            // title: title,
            // message: message,
            // description: description,
            // time: time
        }));
        navigate("/mail");
    }

    return (
        <div onClick={handleClick} className='list__row'>
            <div className="list__row__options">
                <Checkbox />
                <IconButton>
                    <StarBorderOutlinedIcon />
                </IconButton>
            </div>
            <h3 className='list__row__title'>{title}</h3>

            <div className="list__row__message">
                <h4>{description}
                    <span className='list__row__description'>- {message}</span>
                </h4>
            </div>
            <p className="list__row__time">{timeFormat}</p>
        </div>
    )
}

export default ListRow