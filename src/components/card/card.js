import React from 'react';
import {Button, ButtonToolbar, Card, Col} from "react-bootstrap";
import * as assumptionTypes from '../../util/assumption-types';
import style from './card.module.css';

const card = (props) => {
    const {image} = props;

    return (
        <Card className={style.Card}>
            <Card.Img variant="top" src={image}/>
            <Card.Body>
                <ButtonToolbar>
                    <Button
                        onClick={props.onButtonClick.bind(this, assumptionTypes.HIGHER)}
                        className={style.HigherButton}
                        size={'lg'}
                        variant="info">
                        Up
                    </Button>
                    <Button
                        onClick={props.onButtonClick.bind(this, assumptionTypes.LOWER)}
                        size={'lg'}
                        variant="info">
                        Down
                    </Button>
                </ButtonToolbar>
            </Card.Body>
        </Card>
    );
};

export default card;
