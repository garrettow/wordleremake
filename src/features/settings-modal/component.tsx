import React from "react";
import styles from './settings.module.scss';
import classnames from 'classnames/bind';
import { Modal } from "../../components/modal";

const cx = classnames.bind(styles);

interface Props {
    show: boolean,
    closeModal: () => void,
}

export const SettingsModal = ({ show, closeModal } : Props) => {
    return (
        <Modal closeModal={closeModal} header={"Settings"}>
            <p>Hello World</p>
        </Modal>
    )
}