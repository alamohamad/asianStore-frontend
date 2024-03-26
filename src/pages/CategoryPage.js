import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import authAxios from '../authAxios';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { category_name } = useParams();
  const navigate = useNavigate();
  const [productTypes, setProductTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState(products); 

  const handleCartClick = () => {

      navigate('/cart');
    
  };

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  const fetchProductTypes = async () => {
    try {
      const response = await authAxios.get('/products/type');
      if (Array.isArray(response.data.result)) {
        setProductTypes(response.data.result);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching product types:", error.response);
    }
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductsAccordingTypes = async () => {
    try {
      const response = await authAxios.get(`/products/${category_name}/${selectedProductType}`);
      if (Array.isArray(response.data.result)) {
        setProducts(response.data.result);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error.response);
    }
  };

  useEffect(() => {
    fetchProductsAccordingTypes();
  }, [selectedProductType]); 

  const handleProductTypeClick = async (productType) => {
    setSelectedProductType(productType);
  };

  return (
    <div className='container-fluid categoryPage'>
      <div className='row'>
        <header className='p-3 '>
          <div className='glass-button-container col-10 '>
            {productTypes.map((item) => (
              <div
                key={item.product_type}
                className={`glass-button ${selectedProductType === item.product_type ? 'active' : ''}`}
                onClick={() => handleProductTypeClick(item.product_type)}>
                {item.product_type}
              </div>
            ))}
          </div>
          <div className='categNavSec2 col-2 '>
            <label className='white-font glass-button cartNav' onClick={handleSignOut}>
              <li className='fa fa-sign-out'></li>
            </label>
            <label className='white-font glass-button cartNav' onClick={handleCartClick}>
              <li className='fa fa-cart-plus' />
            </label>
            <NavLink to={'/'} className='white-font glass-button cartNav'>
              <li className='fa fa-home'></li>
            </NavLink>
          </div>
        </header>
      </div>

      <div className='row pb-4 pt-2 ' style={{backgroundColor:'#ffffff'}}>
        <h4 className='mt-4 mb-3'>Picks for {category_name}</h4>
      <p style={{ fontSize: '14px' }} >Explore your style with our curated collection</p>
      </div>

      <div className='container-fluid mt-5'>
        <div className='row '>
          {products.map((item, index) => (
            <div className='col-6 col-md-3 col-lg-2 ' key={index}>
              <ProductCard {...item} />
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default CategoryPage;
