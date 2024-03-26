import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EmployeeContextProvider } from './components/EmployeeContext';
import { UserContextProvider } from './components/UserProvider';
import { ProductProvider } from './components/ProductProvider';
import { CategoriesProvider } from './components/CategoriesProvider';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CategoriesProvider>
    <EmployeeContextProvider>
              <UserContextProvider>
<ProductProvider>

    <App/>
    </ProductProvider>
    </UserContextProvider>

    </EmployeeContextProvider>
    </CategoriesProvider>
    
  
  
);



