import React from "react";
import { LetterType } from "../../../board/game";
import styles from './key.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props {
    children: string
    keyState: LetterType,
    onClick: () => void,
    util?: boolean,
}

export const Key = ({ keyState, children, onClick, util } : Props) => {
    return (
        <div className={cx({
            'util': util,
            'keyContainer': !util,
            'empty': keyState === "empty",
            'notInWord': keyState === "invalid",
            'rightSpot': keyState === "correct_spot",
            'wrongSpot': keyState === "wrong_spot"
        })} onClick={onClick}>{children}</div>
    )
}