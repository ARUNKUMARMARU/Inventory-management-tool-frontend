import React, { useState } from 'react';
import authService from '../../service/auth';
import './Supplier.css';

function Supplier() {
    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [item, setItem] = useState('');
    const [payment, setPayment] = useState('');
    const [suppliedDate, setSuppliedDate] = useState('');

    const [view, setView] = useState('');
   
    const handleSupplier =async (e)=>{
        e.preventDefault();

        const newSupplier = {
            suppliername : name,
            mobile_number : mobileNo,
            supplied_item : item,
            payment : payment,
            supplied_date : suppliedDate
        };

        const res =await authService.addsupplier(newSupplier);

        setItem('');
        setMobileNo('');
        setName('');
        setPayment('');
        setSuppliedDate('');
        

        setView(res.message);
      
    }
  return (
    <body>
        <div >

       <header><h1><b>Add New Supplier</b></h1></header>

        <form onSubmit={handleSupplier}
         >

            <label 
            className='label'           
            htmlFor="name">
                Supplier Name  
                <span style={{color:'red'}}>*</span> : </label>&nbsp;
            <input 
            className='form-input'
            type="text" 
            value={name}
            onChange={(e)=>setName(e.target.value)} /> <br /><br />

           <label 
           className='label'
           htmlFor="name">
            Mobile Number  
            <span style={{color:'red'}}>*</span> : 
            </label>&nbsp;
           <input 
           className='form-input'
           type="tel" 
            value={mobileNo}
            onChange={(e)=>setMobileNo(e.target.value)} /> <br /><br />

            <label 
            className='label'
            htmlFor="name">
                Supplied Item  
                <span style={{color:'red'}}>*</span> : 
                </label>&nbsp;
            <input 
            className='form-input'
            type="select" 
            value={item}
            onChange={(e)=>setItem(e.target.value)} /> <br /><br />

            <label 
            className='label'
            htmlFor="payment">
                Pending Payment (₹)  <span style={{color:'red'}}>*</span> : </label> &nbsp;
            <input 
            className='form-input'
            type="number" 
            value={payment}
            onChange={(e)=>setPayment(e.target.value)} /> <br /><br />

            <label 
            className='label'
            htmlFor="supplied date">
                Supplied Date  <span style={{color:'red'}}>*</span> : </label> &nbsp;
            <input 
            type="date" 
            value={suppliedDate}
            onChange={(e)=>setSuppliedDate(e.target.value)} /> <br /><br />

            <button 
            className='button0'
            type='submit'>
                Add Supplier
                </button>
        </form> <br />

        <p >{view}</p> <br />
        
        
    </div>
    </body>
  )
}

export default Supplier;