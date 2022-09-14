import React from 'react';
import styles from './board.module.scss';
import { Square } from './components/square';
import classNames from 'classnames/bind';
import { Game, GUESS } from './game';
import { Keyboard } from '../keyboard';
import { SettingsModal } from '../settings-modal';
import { EndModal } from '../end-modal';
import { TutorialModal } from '../tutorial-modal';
import { useSnackBar } from '../../hooks/snackbar/useSnackBar'
import { Nav } from '../../components/nav';

const cx = classNames.bind(styles);

const ALPHABET = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

export type modalType = "tutorial" | "end" | "settings" | "none"

export const Board = () => {

    const [modalDisplay, setModalDisplay] = React.useState<modalType>("none");

    const [SnackBarElements, SnackBarDispatch] = useSnackBar();

    const game = React.useRef(new Game());

    const [rowHistory, setRowHistory] = React.useState<(string | undefined)[][]>([]);
    const [currentRowInput, setCurrentRowInput] = React.useState<string[]>([]);
    const [currentRowIndex, setCurrentRowIndex] = React.useState(0);

    const [rightSpotLetters, setRightSpotLetters] = React.useState<string[]>([]);
    const [wrongSpotLetters, setWrongSpotLetters] = React.useState<string[]>([]);
    const [notInLetters, setNotInLetters] = React.useState<string[]>([]);

    const [gameWon, setGameWon] = React.useState<boolean>(false);

    const [shakeRow, setShakeRow] = React.useState<boolean>(false);

    const keyboardListener = React.useRef<(e: KeyboardEvent) => void>();

    const previousKeyPressWasLetter = React.useRef<boolean>();

    const [disableTyping, setDisableTyping] = React.useState<boolean>(false);

    const modalRender = () => {
        switch(modalDisplay) {
            case "end":
                return (<EndModal state={gameWon ? "victory" : "loss"} resetGame={resetGame} gameWord={game.current.getWord()} />)
            case "tutorial":
                return (<TutorialModal closeModal={() => setModalDisplay("none")} />)
            case "settings":
                return (<SettingsModal show={true} closeModal={() => setModalDisplay("none")}/>)
            case "none": 
                return (null)
        }
    }

    React.useEffect(() => {
        if(modalDisplay === "none") {
            setDisableTyping(false);
            return;
        }
        setDisableTyping(true);
    }, [modalDisplay])

    const resetGame = () => {
        setGameWon(false);
        setRowHistory([]);
        setCurrentRowInput([]);
        setCurrentRowIndex(0);

        setModalDisplay("none")

        setRightSpotLetters([]);
        setWrongSpotLetters([]);
        setNotInLetters([]);

        setGameWon(false);
        setShakeRow(false);

        setDisableTyping(false);

        game.current.generateWord();
    }

    const shakeRowDispatch = () => {
        setShakeRow(true);

        setTimeout(() => setShakeRow(false), 600);
    }

    const revealRowDispatch = (callback: () => void) => {
        
        setDisableTyping(true);

        setTimeout(() => {
            callback();
            setDisableTyping(false);
        }, 1600)
    }

    React.useEffect(() => {

        keyboardListener.current = (e : KeyboardEvent) => {
            if(disableTyping) return;

            setCurrentRowInput((currentRowInput) => {
                
                if(ALPHABET.includes(e.key.toLowerCase()) && currentRowInput.length < 5) {
                    previousKeyPressWasLetter.current = true;
                    return currentRowInput.concat(e.key.toLowerCase());
                } else if (e.key === "Backspace") {
                    previousKeyPressWasLetter.current = false;
                    const updatedCurrentRowInput = [...currentRowInput];
                    updatedCurrentRowInput.pop();
                    return updatedCurrentRowInput;
                } else if (e.key === "Enter") {
                    previousKeyPressWasLetter.current = false;
                    const word = currentRowInput.join('');
                    const status = game.current.checkWord(word);

                    switch(status) {
                        case GUESS.TOO_SHORT:
                            SnackBarDispatch("Not enough letters")
                            shakeRowDispatch();
                            break;
                        case GUESS.NOT_EXIST:
                            SnackBarDispatch("Not in word list")
                            shakeRowDispatch();
                            break;
                        case GUESS.CORRECT:
                            setRowHistory(currentRowHistory => currentRowHistory.concat([currentRowInput]));
                            setCurrentRowIndex(currentIndex => currentIndex += 1);
                            revealRowDispatch(() => {
                                currentRowInput.forEach((letter, index) => {
                                    switch(game.current.checkSpot(letter, index)) {
                                        case "correct_spot":
                                            setRightSpotLetters(rsCurrent => {
                                                if(!rsCurrent.includes(letter)) return rsCurrent.concat(letter)
    
                                                return rsCurrent;
                                            });
                                            break;
                                        case "wrong_spot":
                                            setWrongSpotLetters(wsCurrent => {
                                                if(!wsCurrent.includes(letter)) return wsCurrent.concat(letter);
                                                return wsCurrent;
                                            }) 
                                            break;
                                        case "invalid":
                                            setNotInLetters(niCurrent => {
                                                if(!niCurrent.includes(letter)) return niCurrent.concat(letter);
                                                return niCurrent;
                                            })
                                            break;
                                    }
                                });
                                setModalDisplay("end");
                                setGameWon(true);
                            });
                            return []
                            break;
                        case GUESS.VALID:
                            setCurrentRowIndex(current => current += 1);
                            setRowHistory(sdf => sdf.concat([currentRowInput]));
                            revealRowDispatch(() => {
                            currentRowInput.forEach((letter, index) => {
                                switch(game.current.checkSpot(letter, index)) {
                                    case "correct_spot":
                                        setRightSpotLetters(rsCurrent => {
                                            if(!rsCurrent.includes(letter)) return rsCurrent.concat(letter)

                                            return rsCurrent;
                                        });
                                        break;
                                    case "wrong_spot":
                                        setWrongSpotLetters(wsCurrent => {
                                            if(!wsCurrent.includes(letter)) return wsCurrent.concat(letter);
                                            return wsCurrent;
                                        }) 
                                        break;
                                    case "invalid":
                                        setNotInLetters(niCurrent => {
                                            if(!niCurrent.includes(letter)) return niCurrent.concat(letter);
                                            return niCurrent;
                                        })
                                        break;
                                }
                                if(currentRowIndex === 5) {
                                    setModalDisplay("end");
                                }
                            })
                            });
                            return []
                            break;
                    }
                }
                return currentRowInput;
            })
        }

        window.addEventListener('keydown', keyboardListener.current);

        return () => window.removeEventListener('keydown', keyboardListener.current as (e: KeyboardEvent) => void);
    }, [disableTyping]);

    const renderBoard = () => {
        const wordleGridContainer = [];

        for(let y = 0; y < 6; y++) {
            const rowSquares : JSX.Element[] = [];

            for(let l = 0; l < 5; l++) {

                if(currentRowIndex === y) {
                    if(currentRowInput[l] !== undefined) {                   
                        const shouldPopUpSqauare = (currentRowInput.length - 1 === l) && previousKeyPressWasLetter.current

                        rowSquares.push(<Square popUp={shouldPopUpSqauare} letterGuessed={currentRowInput[l]} status={"empty"} key={`row: ${y} letter: ${l}`} />)
                        continue;
                    } else {
                        rowSquares.push(<Square letterGuessed={null} status={"empty"} key={`row: ${y} letter: ${l}`} />)
                        continue;
                    }
                } 

                if(rowHistory[y] === undefined) {
                    rowSquares.push(<Square letterGuessed={null} status={"empty"} key={`row: ${y} letter: ${l}`}/>)
                    continue;
                } else { 
                    const rotateDelay = [0,0.5,1,1.5,2];
                    rowSquares.push(<Square reveal={(currentRowIndex - 1 === y) && disableTyping} revealTime={rotateDelay[l]} letterGuessed={rowHistory[y][l] as string} status={game.current.checkSpot(rowHistory[y][l] as string, l)} key={`row: ${y} letter: ${l}`}/>)
                    continue;
                }
            }

            const shouldShakeRow = currentRowIndex === y && shakeRow;
             
            wordleGridContainer.push(<div className={cx({
                row: true,
                shake: shouldShakeRow
            })} key={Math.random()}>{rowSquares}</div>);
        }

        return wordleGridContainer;
    }

    const memorizedBoard = React.useMemo(() => renderBoard(), [currentRowIndex, currentRowInput, rowHistory, shakeRow])
    
    return (
        <>
            <div className={styles.modalOverlay}>
                {modalRender()}
            </div>
            <div className={styles.snackBarOverlay}>
                {SnackBarElements}
            </div>
            <div className={styles.gameContainer}>
                <Nav setModalDisplay={setModalDisplay}/>
                <div className={styles.snackbarOverlay} id={"snackbarOverlay"}></div>
                    <div className={styles.board}>
                        {memorizedBoard}
                    </div>
                    <Keyboard rightSpotLetters={rightSpotLetters} wrongSpotLetters={wrongSpotLetters} notInLetters={notInLetters} />
            </div>
        </>
    )
}