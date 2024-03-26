import React, { useContext, useState } from 'react';
import authAxios from '../authAxios';
import { toast } from 'react-toastify';
import { productContext } from '../components/ProductProvider';

const ProductsAlertForm = () => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [image, setImage] = useState(null);
  const {setSharedProduct } = useContext(productContext);
  const [errorMessage, setErrorMessage] = useState({ product_name: '', img: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };


  

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
  };

  const handlePrice = (event) => {
    setProductPrice(event.target.value);
  };

  const handleQuantity = (event) => {
    setProductQuantity(event.target.value);
  };

  const handleProductCategory = (event) => {
    setProductCategory(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('product_type', productType);
    formData.append('price', productPrice);
    formData.append('quantity', productQuantity);
    formData.append('product_category', productCategory);
    formData.append('img', image);
    try {
      const response = await authAxios.post('/products', formData, {
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
      } else {
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


        setSharedProduct({
          product_name: productName,
          product_type: productType,
          price: productPrice,
          quantity: productQuantity,
          product_category: productCategory,
          img: response.data.result.fileData[0]

      });
      

      }
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div className='container-fluid '>
      <div className='row '>
        <div className='form-container productForm table-responsive '>
          <label className='p-1 mt-2'>Add Product</label>
          <form onSubmit={handleSubmit} className='form'>

            <div className='form-group'>
                <div className='d-flex'> 
                <label className='d-flex' htmlFor="productName">Product Name:</label>
                {errorMessage.product_name && <span className="error text-danger">{errorMessage.product_name}</span>}
                </div>
              <input type="text" id="productName" value={productName} onChange={handleProductNameChange} />
            </div>



            <div className='form-group'>
                <div className='d-flex'>
                <label className='d-flex' htmlFor="productType">Product Type:</label>
                {errorMessage.product_type && <span className="error text-danger">{errorMessage.product_type}</span>}
                </div>
              <input type="text" id="productType" value={productType} onChange={handleProductTypeChange} />
            </div>


              
            <div className='form-group'>
            <div className='d-flex'>
            <label className='d-flex' htmlFor="category">Product Category:</label>
            {errorMessage.product_category && <span className="error text-danger">{errorMessage.product_category}</span>}
            </div>
              <input type="text" placeholder='Men, Women, Kids' id="category" value={productCategory} onChange={handleProductCategory } />
            </div>

            



            <div className='form-group'>
            <div className='d-flex'>
            <label className='d-flex' htmlFor="price">Product Price:</label>
            {errorMessage.price && <span className="error text-danger">{errorMessage.price}</span>}
            </div>
              <input type="text" id="price" value={productPrice} onChange={handlePrice} />
            </div>





            <div className='form-group'>
            <div className='d-flex'>
            <label className='d-flex' htmlFor="price">Product Quantity :</label>
            {errorMessage.quantity && <span className="error text-danger">{errorMessage.quantity}</span>}
            </div>

              <input type="text" id="price" value={productQuantity} onChange={handleQuantity } />


            </div>


            <div className='form-group'>
            <div className='d-flex'>
            <label className='d-flex' htmlFor="image">Select Image:</label>
            {errorMessage.img && <span className="error text-danger">{errorMessage.img}</span>}
            </div>
              <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
            </div>



            <button className='btn w-100 btn-dark mb-3' type="submit">Submit</button>
            {successMessage && <div className="success mb-2">{successMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsAlertForm;
