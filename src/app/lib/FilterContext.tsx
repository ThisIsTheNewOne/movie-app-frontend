"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type FilterContextType = {
  selectedGenres: string[] | null;
  setSelectedGenres: (genres: string[] | null) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[] | null>(null);

  return (
    <FilterContext.Provider value={{ selectedGenres, setSelectedGenres }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};