import React, { createContext, useState } from 'react';

export const productContext = createContext();

export const ProductProvider = ({ children }) => {
  const [sharedProduct, setSharedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const updateProducts = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  return (
    <productContext.Provider value={{ sharedProduct, setSharedProduct, products, updateProducts }}>
      {children}
    </productContext.Provider>
  );
};
