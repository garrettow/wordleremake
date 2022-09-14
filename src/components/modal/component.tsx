import React from "react";
import styles from './modal.module.scss';

interface Props {
    header: string,
    children: React.ReactNode,
    closeModal: () => void,
}

export const Modal = ({ children, closeModal, header } : Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h1 className={styles.topHeader}>{header}</h1>
                <button className={styles.exitButton} onClick={closeModal}>X</button>
            </div>
            {children}
        </div>
    )
}