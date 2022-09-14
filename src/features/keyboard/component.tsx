import React from "react";
import styles from './keyboard.module.scss';
import { Game, LetterType } from "../board/game";
import classnames from 'classnames/bind';
import { Key } from './components/key';

const cx = classnames.bind(styles);

const keyboardLayout = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['Enter', 'Z','X','C','V','B','N','M', 'Backspace']
]

interface Props {
    rightSpotLetters: string[],
    wrongSpotLetters: string[],
    notInLetters: string[],
}

export const Keyboard = ({ rightSpotLetters, wrongSpotLetters, notInLetters } : Props) => {
    const renderKeyboard = () => {
        const total = [];

        const eventCreator = (key: string) => {
            return () => window.dispatchEvent(new KeyboardEvent('keydown', {
                key: key
            }))
        }

        for(let y = 0; y < keyboardLayout.length; y++) {
            const row = [];
            for(let x = 0; x < keyboardLayout[y].length; x++) {
                if(keyboardLayout[y][x] === 'Backspace') {
                    row.push(<Key onClick={eventCreator('Backspace')} keyState={"empty"} key={"Backspace"} util={true}>{"Del"}</Key>)
                } else if (keyboardLayout[y][x] === 'Enter') {
                    row.push(<Key onClick={eventCreator('Enter')} keyState={"empty"} key={"Enter"} util={true}>{"Enter"}</Key>)
                } else {

                    const letter = keyboardLayout[y][x];
                    let keyState: LetterType;

                    if(rightSpotLetters.includes(letter.toLowerCase())) {
                        keyState = "correct_spot"
                    } else if (wrongSpotLetters.includes(letter.toLowerCase())) {
                        keyState = "wrong_spot"
                    } else if (notInLetters.includes(letter.toLowerCase())) {
                        keyState = "invalid"
                    } else {
                        keyState = "empty"
                    }

                    row.push(<Key onClick={eventCreator(letter)} keyState={keyState} key={x + letter}>{letter}</Key>)
                }
            }
 
            switch(y) {
                case 1:
                    total.push(<div className={styles.row} key={"Row" + y}><div className={styles.spacer}/>{row}<div className={styles.spacer}/></div>)      
                    break;
                default:
                    total.push(<div className={styles.row} key={"Row" + y}>{row}</div>)
            }

        }
        return total;
    }

    return (
        <div className={styles.keyboardContainer}>
            {renderKeyboard()}
        </div>
    )
}