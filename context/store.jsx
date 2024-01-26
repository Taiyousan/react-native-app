import React, { createContext, useContext, useRef, useState } from "react";

const AppContext = createContext();

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
}

export function AppContextProvider({ children }) {
    // states
    const [currentPokemon, setCurrentPokemon] = useState('ss');


    const contextValues = {
        currentPokemon,
        setCurrentPokemon
    };

    return (
        <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
    );
}