import React from "react";
import styles from './snackbar.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

export const Snack = ({ remove, message } : { remove : () => void, message: string}) => {
    
    React.useEffect(() => {
        setTimeout(() => {
            remove();
        }, 1200)
    }, [])

    return (
        <div className={cx({
            snackBar: true,
            popIn: true,
        })}>{message}</div>
    )
}