import React, { useContext, useEffect, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ThemeContextType = {
    theme: string,
    toggleTheme: (value: string | undefined) => void
}

const ThemeContext = React.createContext<ThemeContextType>(null!);

export function useTheme() {
    return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useLocalStorage("tic-tac-toe_theme", "dark");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    function toggleTheme(value: string | undefined) {
        if (value === "dark" || value === "light") {
            setTheme(value);
        } else {
            setTheme((prev: string) => prev === "dark" ? "light" : "dark");
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    );
}