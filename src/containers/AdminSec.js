import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import authAxios from '../authAxios';

export default function AdminSec() {
  const [usersCount, setUsersCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const[productsCount,setProductsCount]=useState(0);
  const[ordersCount,setOrdersCount]=useState(0);



  const fetchUserCount = async () => {
    try {
      const response = await authAxios.get('/users/count');
      const count = response.data.result['count(*)'];
      setUsersCount(count);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  const fetchCategoriesCount = async () => {
    try {
      const response = await authAxios.get('/categories/count');
      const count = response.data.result['count(*)'];
      setCategoriesCount(count);
    } catch (error) {
      console.error('Error fetching categories count:', error);
    }
  };

  const fetchProductsCount=async()=>{
    try{
      const response=await authAxios.get('/products/count')
      const count = response.data.result['count(*)'];
      setProductsCount(count);
    }catch(error){
      console.error('Error fetching products count:', error);
    }
  }

  const fetchOrdersCount=async()=>{
    try{
      const response=await authAxios.get('/orders/count')
      const count = response.data.result['count(*)'];
      setOrdersCount(count);
    }catch(error){
      console.error('Error fetching orders count:', error);
    }
  }

  useEffect(() => {
    fetchUserCount();
    fetchCategoriesCount();
    fetchProductsCount();
    fetchOrdersCount()
  }, []);

  const arr = [
    { description: 'Total Customers', count: usersCount },
    { description: 'Total Categories', count: categoriesCount },
    { description: 'Total Products', count: productsCount },
    { description: 'Total Orders', count: ordersCount }
  ];

  return (
    <div className='employeeSections containers container-fluid p-5'>
      <div className='row'>
        {arr.map((item, index) => (
          <div key={index} className='col-12 col-md-4 col-lg-3'>
            <DashboardCard descriptionCard={`${item.description}: ${item.count}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
