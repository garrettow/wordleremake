import React from "react";
import { modalType } from "../../features/board";
import styles from './nav.module.scss';

interface Props {
    setModalDisplay: React.Dispatch<React.SetStateAction<modalType>>,
}

export const Nav = ({ setModalDisplay } : Props) => {
    return (
        <nav className={styles.nav}>
        <h1>Wordle Remake</h1>
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={() => setModalDisplay("tutorial")}>?</button>
            </div>
        </nav>
    )
}