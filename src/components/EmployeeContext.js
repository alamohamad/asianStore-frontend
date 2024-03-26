import React, { createContext, useState } from 'react';

export const employeeContext = createContext();

export const EmployeeContextProvider = ({ children }) => {
  const [employee, setEmployee] = useState({});

  return (
    <employeeContext.Provider value={{ employee, setEmployee }}>
      {children}
    </employeeContext.Provider>
  );
};
