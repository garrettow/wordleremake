import React from "react";
import styles from './end.module.scss';

type EndState = "loss" | "victory"

const EndMessage: Record<EndState, string> = {
    "loss": "Loss",
    "victory": "Victory!",
  };

interface Props {
    state: EndState,
    gameWord: string,
    resetGame: () => void,
}

export const EndModal = ({ state, resetGame, gameWord } : Props) => {
    
    return (
        <div className={styles.modal}>
            <p className={styles.message}>{EndMessage[state]}</p>
            <p className={styles.wordWas}>The word was {gameWord}</p>
            <button type={"button"} onClick={resetGame} className={styles.button}>PLAY AGAIN</button>
        </div>
    )
}