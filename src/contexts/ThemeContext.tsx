import { useContext, useState, useEffect } from 'react'
import { createContext } from 'react'

interface Context {
  theme: 'light' | 'dark';
  changeTheme: () => void
}
const ThemeContext = createContext<Context>({
  theme: 'light',
  changeTheme: () => undefined
})

/**
 * 
 * @returns an object with the current theme and a function to toggle it
 */
export const useTheme = () => {
  return useContext(ThemeContext);
}

/**
 * 
 * Allows wrapped components to access ThemeContext values, through useTheme custom hook
 * 
 */
export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState< 'light' | 'dark' >('light');

  const [loading, setLoading] = useState<boolean>(true);

  const handletheme = () => {
    if (theme === 'dark'){
      localStorage.setItem('theme','light');
      setTheme('light');
    } else {
      localStorage.setItem('theme','dark');
      setTheme('dark');
    }
  };

  useEffect(() =>{
    let theme = localStorage.getItem('theme') as 'light' | 'dark';
    setTheme(theme);
    setLoading(false);
  },[]);

  const value: Context = {
    theme,
    changeTheme: handletheme
  }

  return (
    <ThemeContext.Provider value={value}>
      { !loading && children }
    </ThemeContext.Provider>
  )
}
