import React, { useContext, useState } from 'react';
import authAxios from '../authAxios';
import { categoriesContext } from '../components/CategoriesProvider';
import { toast } from 'react-toastify';

const CategoriesAlertForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState({ category_name: '', img: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const {setSharedCategory } = useContext(categoriesContext);


  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('category_name', categoryName);
    formData.append('img', image);

    try {
      const response = await authAxios.post('/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.errors && response.data.errors.errors.length > 0) {
        const newErrors = {};
        response.data.errors.errors.forEach(error => {
            newErrors[error.path] = error.msg;
        });
        setErrorMessage(newErrors);
        setSuccessMessage('');




    } 
     else {
      setErrorMessage({});
      setSuccessMessage(response.data.result.message);
      toast.success(response.data.result.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });


      
      setSharedCategory({
        category_name: categoryName,
        img: response.data.result.fileData[0].new_name

    });


      }
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div className='container-fluid formCateg '>
      <div className='row'>
        <div className='form-container col-12'>
          <h6 className=' mt-2'>Add Category</h6>
          <form onSubmit={handleSubmit} className='form'>
            <div className='form-group'>
              <label className='d-flex' htmlFor="categoryName">Category Name:</label>
              <input type="text" id="categoryName" value={categoryName} onChange={handleCategoryNameChange} />
              {errorMessage.category_name && <span className="error text-danger">{errorMessage.category_name}</span>}
              
            </div>

            <div className='form-group'>
              <label className='d-flex' htmlFor="image">Select Image:</label>
              <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
              {errorMessage.img && <span className="error text-danger">{errorMessage.img}</span>}
            </div>

            <button className='btn w-100 btn-dark mb-3' type="submit">Submit</button>
            {successMessage && <div className="success mb-2">{successMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoriesAlertForm;
