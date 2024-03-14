import React, { useState } from 'react';
import authService from '../../service/auth';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Staff() {

const [name, setName] = useState('');
const [age, setAge] = useState('');
const [mobileNumber, setMobileNumber] = useState('');
const [address, setAddress] = useState('');
const [position, setPosition] = useState('');
const [joinedDate, setJoinedDate] = useState('');

const [view, setView] = useState('');

const handleStaffDetails = async (e)=>{
   await e.preventDefault();

   const newStaff = {
    staffname : name,
    age,
    mobile_number : mobileNumber,
    address,
    position,
    joining_date : joinedDate
   }

  const res = await authService.addstaff(newStaff);

   setAddress('');
   setAge('');
   setJoinedDate('');
   setMobileNumber('');
   setName('');
   setPosition('');

      setView(res.message);
      if(view!=""){
        notify()
      }
}

const notify = () => {
  const style = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };
toast.success(view, style);
};

  return (
    <div >
       <header><h1><b>Add New Staff</b></h1></header>

        <form
        className='form-input'
        onSubmit={handleStaffDetails}>
            <label 
            className='label'
            htmlFor="name">
              Staff Name <span style={{color:'red'}}>*</span> : </label> &nbsp;
            <input 
             className='form-input'
            type="text" 
            value={name}
            onChange={(e)=>setName(e.target.value)}/> <br /><br />

            <label 
            className='label'
            htmlFor="age">
              Age <span style={{color:'red'}}>*</span>: </label> &nbsp; &nbsp;&nbsp; &nbsp;
            <input 
             className='form-input'
            type="number" 
            value={age}
            onChange={(e)=>setAge(e.target.value)}/> <br /><br />

            <label 
            className='label'
            htmlFor="mobilenumber">
              Mobile Number <span style={{color:'red'}}>*</span>: </label> &nbsp;
            <input 
             className='form-input'
            type="tel"
            value={mobileNumber}
            onChange={(e)=>setMobileNumber(e.target.value)}/> <br /><br />

            <label 
            className='label'
            htmlFor="address">Address <span style={{color:'red'}}>*</span>: </label> 
            <input 
             className='form-input'
            type="text" 
            size={30}
            value={address}
            onChange={(e)=>setAddress(e.target.value)}/><br /><br />
            

            <label 
            className='label'
            htmlFor="position">
              Position <span style={{color:'red'}}>*</span>: </label> &nbsp;
            <input type="text" 
             className='form-input'
            value={position}
            onChange={(e)=>setPosition(e.target.value)}/> <br /><br />

            <label 
            className='label'
            htmlFor="joineddate">
              Joined Date <span style={{color:'red'}}>*</span>: </label> &nbsp;
            <input 
            type="date" 
            value={joinedDate}
            onChange={(e)=>setJoinedDate(e.target.value)}/> <br /><br />

            <button 
            className='button0'
            type='submit'>Add staff</button>

        </form> <br />
        <p>{view}</p>
    </div>
  )
}

export default Staff;