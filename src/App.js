import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import React from 'react';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import EmployeesDashboard from './pages/EmployeesDashboard';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import Home from './pages/Home';


function App() {
   // const dispatch=useDispatch();

    // const {count}=useSelector(state=>this.state);
    // const {name}=useSelector(state=>this.state);

    // const increase=()=>{dispatch({type:INCREASE})}
    // const decrease=()=>{dispatch({type:DECREASE})}
    // const change_info=()=>{dispatch({type:CHANGE_INFO})}

  return (
    <BrowserRouter>
      <div className="App">
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/adminDashboard" element={<AdminDashboard/>}/>
          <Route path="/employeesDashboard" element={<EmployeesDashboard/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path='/categories/:category_name' element={<CategoryPage />} />        
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
