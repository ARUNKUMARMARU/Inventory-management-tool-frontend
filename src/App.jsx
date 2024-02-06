import React from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';


import Signup from './components/Signup';
import Signin from './components/Signin';
import Item from './components/Item';
import Bill from './components/Bill';
import Dashboard from './components/Dashboard';
import Customer from './components/Customer';
import Attendence from './components/Attendence';
import Staff from './components/Staff';
import Supplier from './components/Supplier';


function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>        
            <Route path='/additem' element={<Item/>}/>
            <Route path='/billing' element={<Bill/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
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