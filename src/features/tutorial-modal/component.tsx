import React from "react";
import { Modal } from "../../components/modal";
import { Row } from "./components/row";
import styles from './tutorial.module.scss';

interface Props {
    closeModal: () => void,
}

export const TutorialModal = ({ closeModal } : Props) => {

    const closeModalHandler = () => {
        closeModal();
    }

    const Home = (
        <div className={styles.home}>
            <p>Welcome to Wordle Remake!</p>
            <p>A remake of <a target={"_blank"} href={"https://www.nytimes.com/games/wordle/index.html"} rel="noreferrer">Wordle</a></p>
                <div>
                    <h2>How to play</h2>
                    <p>Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
                    <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
                </div>
                <div>
                    <h2>Examples</h2>
                    <div>
                        <Row word={"HEAVY"} type={"correct_spot"} index={0} />
                        <p>The letter H is in the word and in the correct spot.</p>
                    </div>
                    <div>
                        <Row word={"SCOUT"} type={"wrong_spot"} index={2} />
                        <p>The letter O is in the word but in the wrong spot.</p>
                    </div>
                    <div>
                        <Row word={"POINT"} type={"invalid"} index={4} />
                        <p>The letter T is not in the word in any spot.</p>
                    </div>
                </div>
        </div> 
               
    )

    return (
        <Modal closeModal={closeModalHandler} header={"Tutorial"}>
            {Home}
        </Modal>
    )
}