import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryCard(props) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/categories/${props.category_name}`);
  };

  return (
    <div className='categoryCard container-fluid' onClick={handleButtonClick}>
      <div className='row justify-content-center'>
        <img src={`http://localhost:8000/uploads/categories/${props.image_name}`} alt='not found' />
        <button className='bg-white'>
          {props.category_name}
        </button>
      </div>
    </div>
  );
}
