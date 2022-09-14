import React from "react";
import { LetterType } from "../../../board/game";
import { Square } from '../../../board/components/square';
import styles from '../../tutorial.module.scss';

interface Props {
    word: string,
    type: LetterType,
    index: number,
}

export const Row = ({ word, type, index } : Props) => {
    return (
        <div className={styles.letterRow}>
            {word.split('').map((letter, i) => <Square key={`${word}${i}`} letterGuessed={letter} status={i === index ? type : "empty"} reveal={i === index} revealTime={0}/>)}
        </div>
    )
}