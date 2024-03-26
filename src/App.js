import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import EmployeesDashboard from './pages/EmployeesDashboard';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import Home from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import ToastProvider from './components/ToastProvider';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/employeesDashboard" element={<EmployeesDashboard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/categories/:category_name" element={<CategoryPage />} />
        </Routes>
        <ToastProvider/> 
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
