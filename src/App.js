import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './containers/Home';
import Footer from './containers/Footer';
import axios from 'axios';
// import { Provider, useDispatch, useSelector } from 'react-redux';
// import store from './redux/store';
import React, { useEffect, useState } from 'react';
// import { CHANGE_INFO, DECREASE, INCREASE } from './redux/action';




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




    const [users,setUsers]=useState([]);



    //1. Using async, await
    const listOfEmployee=async()=>{
      try{
        const user= await axios.get('http://localhost:8000/employees');
        // console.log(user);
        setUsers(user.data.result);
      }catch(err){

      }
      
    }

    //OR:

    //2. Using promise, then
    // const listOfEmployee=()=>{
    //   axios.get('http://localhost:8000/employees').then((res)=>{
    //    setUsers(res.data.result);
    //   }).catch((err)=>{
    //     console.log(err);
    //   })
    // }


    const putEmployee=()=>{
      axios.put('http://localhost:8000/employees/5',{employee_name:'Reem',hiring_date:'2023-12-11',job_position:'QA',salary:'2000'}).then((res)=>{
       setUsers(res.data.result);
      }).catch((err)=>{
        console.log(err);
      })
    }


        //to mirror all changes in the users state into userMapped
        const userMapped=users.map((user)=>{
          return <li>{user.employee_name}</li>
        })



  return (
    

      <BrowserRouter>

<div className="App">
<Navbar/>


<Home/>
<button onClick={listOfEmployee}>fetch data</button>
<button onClick={putEmployee}>post employee</button>
{userMapped}
<Footer/>
<Routes>
<Route></Route>
<Route></Route>
<Route></Route>
<Route></Route>
</Routes>

<p>welcome</p>




</div>





</BrowserRouter>

  
    
     
       






     

      


      
      
    
   
   




      
  
    
  );
}

export default App;
