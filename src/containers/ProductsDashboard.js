import React, { useState } from 'react'
import ProductsForm from './ProductsAlertForm';
import ProductsTableForDashboard from '../components/ProductsTableForDashboard';

export default function ProductsDashboard() {

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className='employeeSections containers p-4 '>
        <button className='btn d-flex btn-dark mb-3 mt-2' onClick={toggleForm}>Add Product</button>
        <ProductsTableForDashboard/>

          {showForm && (
            <div className="alert-overlay">
              <div className="alert-content col-12 col-md-4">
                <ProductsForm/>
                <button className='btn mb-2 mt-1' onClick={toggleForm}>Close</button>
              </div>
            </div>
          )}

         





    </div>
  )
}


