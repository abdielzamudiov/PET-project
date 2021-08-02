import React, { createContext, ReactNode, useContext } from 'react'
import { useState } from 'react';

interface Context {
  search: string;
  setSearch: (search: string) => void;
}
interface Props {
  children: ReactNode;
}

const SearchContext = createContext<Context>({
  search: "",
  setSearch: (string: string) => undefined
});

/**
 * 
 * @returnsan An object, with a search string value, and a function to set that string value, both values from SearchContext
 */
export const useSearch = () => {
  return useContext(SearchContext);
}

/**
 * 
 * Allows wrapped components to access SearchConext values, through useSearch custom hook
 */
export const SearchProvider: React.FC<Props> = ({ children }) => {

  const [search, setSearch] = useState<string>("");

  const values = {
    search,
    setSearch
  };
  return (
    <SearchContext.Provider value={values}>
      {children}
    </SearchContext.Provider>
  )
}
