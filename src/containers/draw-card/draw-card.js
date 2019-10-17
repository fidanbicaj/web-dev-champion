import React, {useEffect, useState, useRef} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Card from '../../components/card/card';
import GuessResult from '../../components/guess-result/guess-result';
import axios from '../../util/axios-config';
import * as assumptionTypes from '../../util/assumption-types';
import * as requestUrls from '../../util/request-urls';

const SYMBOL_CARDS = {
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14,
};

const initialState = {
    card: null,
    message: null,
};

const getValueOfCard = (card) => SYMBOL_CARDS[card.value] ? SYMBOL_CARDS[card.value] : card.value;

const DrawCard = props => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        fetchNewCard();
    }, []);

    const fetchNewCard = async (assumption = null) => {
        const response = await axios.get(requestUrls.DRAW_NEW_CARD_URL, {params: {counter: 1}});
        if (response.data) {
            // const {data} = response;
            const {data:{cards: [newCard]} } = response;
            const currentState = {...state};
            const currentCard = currentState.card;
            if (currentCard && assumption){
                const currentCardValue = getValueOfCard(currentCard);
                const newCardValue = getValueOfCard(newCard);
                currentState.message = getGuessMessage(currentCardValue, newCardValue, assumption);
            }
            currentState.card = newCard;
            setState(currentState);
        }
    };

    const getGuessMessage = (prevCardVal, currentCardVal, assumption) => {
        let condition = null;
        switch (assumption) {
            case assumptionTypes.LOWER:
                condition = currentCardVal < prevCardVal;
                break;
            case assumptionTypes.HIGHER:
                condition = currentCardVal > prevCardVal;
                break;
            default:
                condition =null;
        }
        if (condition === null) return 'UNKOWN';
        return condition ? 'YOU_WIN' : 'YOU_LOST';
    };


    const handleOnButtonClick = (assumption) => fetchNewCard(assumption);

    const closeToastPopup = () => {
        let currentState = {...state};
        currentState.message = null;
        setState(currentState);
    };

    const {card, message} = state;

    if (card === null) return null;
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <br/>
                </Col>
                <Col md={12}>
                    <GuessResult
                        message={message}
                        closeToastPopup={closeToastPopup}/>
                    <Card
                        image={card.image}
                        onButtonClick={handleOnButtonClick}/>
                </Col>
            </Row>
        </Container>

    );
}

export default DrawCard;
