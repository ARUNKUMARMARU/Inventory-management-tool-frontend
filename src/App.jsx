import React from 'react';
import { Routes, Navigate, BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import Signup from './components/signup/Signup';
import Signin from './components/login/Signin';
import Item from './components/item/Item';
import Bill from './components/bill/Bill';
import Dashboard from './components/dashboard/Dashboard';
import Customer from './components/customer/Customer';
import Attendence from './components/attendence/Attendence';
import Staff from './components/staff/Staff';
import Supplier from './components/supplier/Supplier';


function App() {
  return (
    <div>
       <ToastContainer/>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>        
            <Route path='/additem' element={<Item/>}/>
            <Route path='/billing' element={<Bill/>}/>
            <Route path='/dashboard' element={<Protected><Dashboard/></Protected>}/>
            <Route path='/addcustomer' element={<Customer/>}/>
            <Route path='/attendence' element={<Attendence/>}/>
            <Route path='/addstaff' element={<Staff/>}/>
            <Route path='/addsupplier' element={<Supplier/>}/>
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App


function Protected({children}) {
  const token = sessionStorage.getItem('token')
  if(token){
    return children
  }
  return (
    
      <Navigate to="/"></Navigate>
    
  )
}

