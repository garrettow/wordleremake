import React from "react";

type rowHistoryType = string[][]

interface config {
    tutorial_dismissed: boolean,
    row_history: (string | undefined)[][],
}

export const useLocalStorage = () => {
    
    const [storedValue, setStoredValue] = React.useState<config>(() => {

        try {
            const newConfig : config = {} as any;

            const tutorialDismised = window.localStorage.getItem("tutorial_dismissed") || false;
            const rowHistory = window.localStorage.getItem("row_history") || false;

            if(tutorialDismised && typeof JSON.parse(tutorialDismised) == "boolean") {
                return tutorialDismised ? newConfig["tutorial_dismissed"] = JSON.parse(tutorialDismised) : newConfig["tutorial_dismissed"] = false;
            } 

/*             if(rowHistory && typeof JSON.parse(rowHistory) == typeof rowHistory) {
                return rowHistory ? newConfig["row_history"] = JSON.parse(rowHistory) : newConfig["row_history"] = false;
            } 
 */
            window.localStorage.setItem("tutorial_dismissed", JSON.stringify(false));
            return {tutorial_dismissed: false}

        } catch (error) {
            console.log(error);

            window.localStorage.setItem("tutorial_dismissed", JSON.stringify(false));
            return {tutorial_dismissed: false}
        }
    })

    const setTutorialDismissed = () => {
        if(storedValue.tutorial_dismissed) return;

        window.localStorage.setItem("tutorial_dismissed", JSON.stringify(true));
        setStoredValue(curr => {
            return {
                ...curr,
                "tutorial_dismissed": true,
            }
        })
    }
    
    return [storedValue, setTutorialDismissed] as const;
}