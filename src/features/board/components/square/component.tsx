import React from "react";
import styles from './square.module.scss';
import classNames from 'classnames/bind';
import { LetterType } from '../../game';

const cx = classNames.bind(styles);

interface SquareProps {
    letterGuessed: null | string,
    status: LetterType,
    popUp?: boolean,
    reveal?: boolean,
    revealTime?: number,
}

export const Square = ({ letterGuessed, status, popUp, reveal, revealTime } : SquareProps) => {
    const letterShow = letterGuessed !== null ? letterGuessed : "";

    const [stateAnimation, setStartAnimation] = React.useState(false);
    const [animateOut, setAnimationOut] = React.useState(false);
    const [animateIn, setAnimateIn] = React.useState(false);

    const wrongSpot = status === "wrong_spot";
    const correctSpot = status === "correct_spot";
    const invalid = status === "invalid";
    const empty = status === "empty";

    const shouldntReveal = !reveal || revealTime === undefined;

    React.useEffect(() => {
        if(shouldntReveal || stateAnimation) {
            return;
        }

        setStartAnimation(true);

        setTimeout(() => {
            setAnimateIn(true);
            setTimeout(() => {
                setAnimationOut(true)
            }, 250)
        }, revealTime * 500)
    }, [])

    return (
        <div className={cx({
            square: true,
            empty: empty || stateAnimation && !animateOut,
            revealAnimation: animateIn && reveal,
            hideAnimation: animateOut,
            invalid: invalid && shouldntReveal || invalid && animateOut,
            correctSpot: correctSpot && shouldntReveal || correctSpot && animateOut,
            wrongSpot: wrongSpot && shouldntReveal || wrongSpot && animateOut,
            popUp: popUp,
        })}>
            {letterShow}
        </div>
    )
}