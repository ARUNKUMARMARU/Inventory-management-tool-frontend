import React, { useState } from 'react';
import authService from '../service/auth';

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
        <div style={{paddingTop:'10px', paddingLeft:'10px', backgroundColor:'lightyellow'}}>
        <form onSubmit={handleSupplier}>

            <label htmlFor="name">Supplier Name  <span style={{color:'red'}}>*</span> : </label>&nbsp;
            <input type="text" style={{backgroundColor:'lightgrey'}}
            value={name}
            onChange={(e)=>setName(e.target.value)} /> <br /><br />

           <label htmlFor="name">Mobile Number  <span style={{color:'red'}}>*</span> : </label>&nbsp;
           <input type="tel" style={{backgroundColor:'lightgrey'}}
            value={mobileNo}
            onChange={(e)=>setMobileNo(e.target.value)} /> <br /><br />

            <label htmlFor="name">Spplied Item  <span style={{color:'red'}}>*</span> : </label>&nbsp;
            <input type="select" style={{backgroundColor:'lightgrey'}}

            value={item}
            onChange={(e)=>setItem(e.target.value)} /> <br /><br />

            <label htmlFor="payment">Pending Payment (₹)  <span style={{color:'red'}}>*</span> : </label> &nbsp;
            <input type="number" style={{backgroundColor:'lightgrey'}}
            value={payment}
            onChange={(e)=>setPayment(e.target.value)} /> <br /><br />

            <label htmlFor="supplied date">Supplied Date  <span style={{color:'red'}}>*</span> : </label> &nbsp;
            <input type="date" style={{backgroundColor:'lightgrey'}}
            value={suppliedDate}
            onChange={(e)=>setSuppliedDate(e.target.value)} /> <br /><br />

            <button type='submit' style={{backgroundColor:'blue', color:'whitesmoke'}}>Add Supplier</button>
        </form> <br />

        <p >{view}</p> <br />
        
        
    </div>
    </body>
  )
}

export default Supplier;