import React, { useEffect, useState } from 'react';
import authAxios from '../authAxios';
import ProductCard from '../components/ProductCard';
export default function FourthSection() {

    const[products,setProducts]=useState([])
  const [currentPairIndex, setCurrentPairIndex] = useState(0);

  const handleImageChange = (pairIndex) => {
    setCurrentPairIndex(pairIndex);
  };

  const fetchProducts=async()=>{
    try{
        const response=await authAxios.get('/latestProducts')
        if (Array.isArray(response.data.result)) {
          setProducts(response.data.result);
            console.log(products);
          } else {
            console.error("Invalid response format:", response.data);
          }
    }catch(error){
        console.error("Error fetching products:", error.response);
    }
  }

  useEffect(() => {(fetchProducts()) }, []);


  return (
    <div className='contanier-fluid containers fourthSection mb-5'>
      <div className='row fourthSection'>
        <div className='col-4 sec4Left'>
          <p className='title1'>Latest Product Arrivals</p>
          <p className='title4'>Order now for prompt delivery to your doorstep.</p>
        </div>

        <div className='row col-8'>
          {products.slice(currentPairIndex * 2, currentPairIndex * 2 + 2).map((item, index) => (
            <div className='col-6' key={index}>
              <ProductCard {...item} />
            </div>
          ))}
        </div>
      </div>
      
      <div className='navigation'>
        {[...Array(Math.ceil(products.length / 2)).keys()].map((index) => (
          <div
            key={index}
            className={`dot ${index === currentPairIndex ? 'active' : ''}`}
            onClick={() => handleImageChange(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
