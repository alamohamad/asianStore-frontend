import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './containers/Home';
import Footer from './containers/Footer';
import SignUp from './containers/SignUp';
import React from 'react';

function App() {
   // const dispatch=useDispatch();

    // const {count}=useSelector(state=>this.state);
    // const {name}=useSelector(state=>this.state);

    // const increase=()=>{dispatch({type:INCREASE})}
    // const decrease=()=>{dispatch({type:DECREASE})}
    // const change_info=()=>{dispatch({type:CHANGE_INFO})}




              //BACKEND PART//

    //Assume that we want to display the list of employees in the first render of the page
    // useEffect (()=>{
    //   listOfEmployee();
    // },[]);




    // const [users,setUsers]=useState([]);



    //1. Using async, await
    // const listOfEmployee=async()=>{
    //   try{
    //     const user= await axios.get('http://localhost:8000/employees');
    //     // console.log(user);
    //     setUsers(user.data.result);
    //   }catch(err){

    //   }
      
    // }

    //OR:

    //2. Using promise, then
    // const listOfEmployee=()=>{
    //   axios.get('http://localhost:8000/employees').then((res)=>{
    //    setUsers(res.data.result);
    //   }).catch((err)=>{
    //     console.log(err);
    //   })
    // }


    // const putEmployee=()=>{
    //   axios.delete('http://localhost:8000/employees/5').then((res)=>{
    //    setUsers(res.data.result);
    //   }).catch((err)=>{
    //     console.log(err);
    //   })
    // }


        //to mirror all changes in the users state into userMapped
        // const userMapped=users.map((user)=>{
        //   return <li>{user.employee_name}</li>
        // })


       

  return (
    <BrowserRouter>
      <div className="App">
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
