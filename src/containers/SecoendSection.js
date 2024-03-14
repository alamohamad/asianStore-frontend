import React, { useEffect, useState } from 'react'
import authAxios from '../authAxios';
import CategoryCard from '../components/CategoryCard';
export default function SecoendSection() {

  const [categories, setCategories] = useState([]);
  const fetchCategoriesImages=async()=>{
    try {
      const response = await authAxios.get('/categories');
      if (Array.isArray(response.data.result)) {
        setCategories(response.data.result);
        console.log(categories);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error.response);
    }


  }
  
  useEffect(() => {(fetchCategoriesImages()) }, []);


  return (
    <div className='container containers '>
        <h2>New Collection</h2>
        <h6> Where Style meets comfort for every member of the family.</h6>
      <div className='row mt-5'>
        {
         categories.map((item)=>
            <div className='col-4'>
                < CategoryCard { ... item}/>

            </div>
         )
         }
      </div>
    </div>
  )
}
