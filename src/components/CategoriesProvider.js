import React, { createContext, useState } from 'react';

export const categoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [sharedCategory, setSharedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const updateCategories = (newCategory) => {
    setCategories([newCategory, ...categories]);
  };

  return (
    <categoriesContext.Provider value={{ sharedCategory, setSharedCategory, categories, updateCategories }}>
      {children}
    </categoriesContext.Provider>
  );
};
