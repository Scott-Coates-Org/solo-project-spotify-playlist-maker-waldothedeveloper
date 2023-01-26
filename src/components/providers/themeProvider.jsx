import React, { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState("select a genre");

  return (
    <ThemeContext.Provider
      value={{
        setTheme: setSelectedGenre,
        theme: selectedGenre,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
