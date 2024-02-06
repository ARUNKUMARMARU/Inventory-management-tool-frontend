import React, { useState } from 'react';
import authService from '../service/auth';

function Customer() {
    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [totalPurchase, setTotalPurchase] = useState('');

    const [view, setView] = useState('');

    const handleCustomer =async (e)=>{
      e.preventDefault();
      
      const newCustomer = {
        customername : name,
        mobile_number : mobileNo,
        total_purchase : totalPurchase
    };

    const res = await authService.addcustomer(newCustomer);

    setMobileNo('');
    setName('');
    setTotalPurchase('');

    console.log(res.message)

    setView(res.message)
    }


  return (
    <div style={{paddingTop :'20px'}}>
       <div><b><u> <h2 style={{color:'darkgreen', textAlign : "center", paddingTop:'10px'}}>Add New Customer</h2></u></b></div> <br /><br />

        <form action="" onSubmit={handleCustomer}>

        <label htmlFor="name">Customer Name : </label>
        <input type="text" autoFocus style={{backgroundColor : 'lightcyan'}}
        placeholder='name here...'
        value={name}
        onChange={(e)=>setName(e.target.value)}/> &nbsp;

        <label htmlFor="name">Mobile Number :  : </label>
        <input type="tel" pattern='[0-9]{10}' style={{backgroundColor : 'lightcyan'}} placeholder='10 digits'
        value={mobileNo}
        onChange={(e)=>setMobileNo(e.target.value)}/>&nbsp;

        <label htmlFor="name">Total Purchase (₹) : </label>
        <input type="number" style={{backgroundColor : 'lightcyan'}}
        value={totalPurchase}
        placeholder='₹00.00'
        onChange={(e)=>setTotalPurchase(e.target.value)} /> &nbsp;&nbsp;&nbsp;

        <button type='submit' style={{backgroundColor : 'lightskyblue'}}>Submit</button>
        </form>
        <br />

       <p>{view}</p>

    </div>
  )
}

export default Customer;


