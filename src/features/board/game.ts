import { words } from "../../word_list";

export enum GUESS {
    NOT_EXIST = "NOT_EXIST",
    TOO_SHORT = "TOO_SHORT",
    VALID = "VALID",
    CORRECT = "CORRECT"
}

export type LetterType = "correct_spot" | "wrong_spot" | "invalid" | "empty"

export class Game {
    private _word!: string
    private _wordSplit!: string[] 
    
    constructor() {
        this.generateWord();
    }

    public generateWord() {
        this._word = words[Math.floor(Math.random() * words.length)];
        this._wordSplit = this._word.split('');   
    }

    public getWord() {
        return this._word;
    }

    public checkWord(word: string) {
        if(word.length < 5) {
            return GUESS.TOO_SHORT;
        } else if(!this.checkValidWord(word)) {
            return GUESS.NOT_EXIST;
        } else if (this.checkCorrectWord(word)) {
            return GUESS.CORRECT
        }

        return GUESS.VALID
    }

    public checkSpot(letter: string, index: number) : LetterType {
        if(this._wordSplit.includes(letter)) {
            if(this._wordSplit[index] === letter) {
                return "correct_spot"
            }

            return "wrong_spot";
        }

        return "invalid";
    }

    private checkCorrectWord(word: string) {
        if(this._word.toLowerCase() === word.toLowerCase()) {
            return true;
        }

        return false;
    }

    private checkValidWord(word: string) : boolean {
        return words.includes(word);
    }
}