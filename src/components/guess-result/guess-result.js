import {Toast} from "react-bootstrap";
import React from "react";
import style from './guess-result.module.css';

const guessResult = (props) => {
    const {message} = props;
    if (!message) return null;
    return (
        <Toast className={style.Toast} onClose={props.closeToastPopup}>
            <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                />
                <strong className="mr-auto">Coding Challenge</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
};

export default guessResult;
