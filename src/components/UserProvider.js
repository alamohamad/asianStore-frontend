import React, { createContext, useState } from 'react';

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [customer, setCustomerState] = useState(localStorage.getItem('customer') || '');

  const setCustomer = (customerName) => {
    localStorage.setItem('customer', customerName);
    setCustomerState(customerName);
  };

  return (
    <userContext.Provider value={{ customer, setCustomer }}>
      {children}
    </userContext.Provider>
  );
};
