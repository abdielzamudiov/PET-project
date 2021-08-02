import React from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
interface Context {
  theme: string;
  setTheme: () => void
}
const ThemeContext = createContext({
  theme: "",
  setTheme: () => undefined
})

export const useTheme = () => {
  return useContext(ThemeContext);
}

export const ThemeProvider: React.FC = () => {
  // const [theme, setTheme] = useState< '' | 'dark-mode' >('');

  // const handletheme = () => {
  //   theme ? setTheme("") : setTheme("dark-mode");
  // };

  return (
    <div>
      
    </div>
  )
}
