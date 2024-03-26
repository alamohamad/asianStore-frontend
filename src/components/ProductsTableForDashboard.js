import React, { useContext, useEffect, useState } from 'react';
import authAxios from '../authAxios';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { productContext } from './ProductProvider';

export default function ProductsTableForDashboard() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const { sharedProduct } = useContext(productContext);

 

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sharedProduct]);


  const fetchProducts = async () => {
    try {
      const response = await authAxios.get(`/products?page=${currentPage}`);
      if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const deleteProduct = async (product_id) => {
    if (confirmDelete && product_id === productToDelete) {
      try {
        await authAxios.delete(`/products/${product_id}`);
        setProducts(prevProducts =>
          prevProducts.filter(product => product.product_id !== product_id));

        toast.success("Product deleted successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.error("Error deleting product:", error.response);
      } finally {
        setConfirmDelete(false);
      }
    } else {
      setProductToDelete(product_id);
      setConfirmDelete(true);
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='container-fluid'>
      <div className='row table-responsive'>
        <table className='table table-bordered col-12 col-md-6 dashboardTable'>
          <thead>
            <tr className='tableHeader'>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.product_id}>
                <td>{product.product_name}</td>
                <td>{product.product_type}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                 <img src={`http://localhost:8000/uploads/products/${product.image_name}`} alt={product.image_name}         onError={() => console.log("Image not found:", product.image_name)} // Log if image fails to load
 />
                </td>
                <td>
                  <button className='btn border btn-dark mt-3' onClick={() => deleteProduct(product.product_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className='pagination d-flex justify-content-center' style={{ listStyleType: 'none', }}>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => handlePageChange(currentPage - 1)}>
          <a className='page-link'> <i className='fa fa-step-backward'></i> </a>
        </li>
        {[...Array(totalPages).keys()].map((page) => (
          <li key={page} className={`page-item ${currentPage === page + 1 ? 'mark' : ''}`} onClick={() => handlePageChange(page + 1)}>
            <a className='page-link'>{page + 1}</a>
          </li>



        ))}

        
        
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => handlePageChange(currentPage + 1)}>
          <a className='page-link'> <i className='fa fa-step-forward'></i> </a>
        </li>
      </ul>
      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this product?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setConfirmDelete(false)}>Cancel</Button>
                            <Button variant="danger" onClick={() => deleteProduct(productToDelete)}>Delete</Button>
                        </Modal.Footer>
                    </Modal>

    </div>
  )
}
