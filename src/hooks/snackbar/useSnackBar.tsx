import React from "react";
import { nanoid } from "nanoid";
import { Snack } from './components/snackbar';

interface Snack {
    message: string,
    id: string,
}
        
export const useSnackBar = () => {

    const [snack, setSnack] = React.useState<Snack[]>([]);

    const dispatch = (message: string) => {
        setSnack(current => {
            return [...current, {message: message, id: nanoid()}]
        })
    }

    const remove = (id: string) => {
        setSnack(current => {
            return current.filter(x => x.id !== id)
        })
    }

    return [snack?.map(x => <Snack key={x.id} message={x.message} remove={() => remove(x.id)}/>), dispatch] as const

}