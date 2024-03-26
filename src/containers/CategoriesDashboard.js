import React, { useState, useEffect, useContext } from 'react';
import authAxios from '../authAxios';
import CategoriesAlertForm from './CategoriesAlertForm';
import { categoriesContext } from '../components/CategoriesProvider';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';

const CategoriesDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const {sharedCategory } = useContext(categoriesContext);



  const fetchCategories = async () => {
    try {
      const response = await authAxios.get('/categories');
      if (Array.isArray(response.data.result)) {
        setCategories(response.data.result);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error.response);
    }
  };

  useEffect(() => {fetchCategories(); }, [sharedCategory]);


  const deleteCategory = async (category_id) => {
    if (confirmDelete && category_id === categoryToDelete) {
    try {
      await authAxios.delete(`/categories/${category_id}`);
      setCategories(prevCategories =>
        prevCategories.filter(category => category.category_id !== category_id)
      );
      toast.success("Category deleted successfully!", {
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
      console.error("Error deleting category:", error.response);
    } finally {
      setConfirmDelete(false);
    }
  } else {
    setCategoryToDelete(category_id);
    setConfirmDelete(true);
  }
  }

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className='container-fluid containers employeeSections p-4'>
      <div className='row'>
        <div className='0'>
          <table className='table table-borderd col-12 col-md-6 dashboardTable'>
            <thead className='tableHeader'>
              <tr>
                <th>Image</th>
                <th>Category Name</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.category_id}>
                  
                  <td><img src={`http://localhost:8000/uploads/categories/${category.image_name}`} alt={category.category_name} className='' /></td>
                  <td className=''>{category.category_name}</td>
                  <td>
                    <button className='btn border btn-dark' onClick={() => deleteCategory(category.category_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='btn btn-dark d-flex' onClick={toggleForm}>Add Category</button>
          {showForm && (
            <div className="alert-overlay">
              <div className="alert-content">
                <CategoriesAlertForm/>
                <button className='btn mb-2 mt-1' onClick={toggleForm}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this category?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setConfirmDelete(false)}>Cancel</Button>
                            <Button variant="danger" onClick={() => deleteCategory(categoryToDelete)}>Delete</Button>
                        </Modal.Footer>
                    </Modal>
    </div>
  );
};

export default CategoriesDashboard;
