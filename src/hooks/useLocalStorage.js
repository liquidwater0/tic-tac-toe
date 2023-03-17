import { useState, useEffect } from "react";

function getSavedValue(storageKey, initialValue) {
    const savedValue = localStorage.getItem(storageKey);
    if (!savedValue) return initialValue;
    return JSON.parse(savedValue);
}

export function useLocalStorage(storageKey, initialValue) {
    const [value, setValue] = useState(() => getSavedValue(storageKey, initialValue));

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value]);
    
    return [value, setValue];
}