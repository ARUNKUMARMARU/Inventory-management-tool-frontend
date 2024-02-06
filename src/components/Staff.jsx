import React, { useState } from 'react';
import authService from '../service/auth';

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
}

  return (
    <div style={{paddingTop:'10px', paddingLeft:'10px', backgroundColor:'lightyellow'}}>
       <div><b><u> <h2 style={{color:'darkgreen', textAlign : "center", paddingTop:'10px'}}>Add New Staff</h2></u></b></div> <br />
        <form onSubmit={handleStaffDetails}>
            <label htmlFor="name">Staff Name <span style={{color:'red'}}>*</span> : </label> &nbsp;
            <input type="text" style={{backgroundColor:'lightgray'}}
            value={name}
            onChange={(e)=>setName(e.target.value)}/> <br /><br />

            <label htmlFor="age">Age <span style={{color:'red'}}>*</span>: </label> &nbsp; &nbsp;&nbsp; &nbsp;
            <input type="number" style={{backgroundColor:'lightgray'}}
            value={age}
            onChange={(e)=>setAge(e.target.value)}/> <br /><br />

            <label htmlFor="mobilenumber">Mobile Number <span style={{color:'red'}}>*</span>: </label> &nbsp;
            <input type="tel" style={{backgroundColor:'lightgray'}}
            value={mobileNumber}
            onChange={(e)=>setMobileNumber(e.target.value)}/> <br /><br />

            <label htmlFor="address">Address <span style={{color:'red'}}>*</span>: </label> 
            <input type="text" style={{backgroundColor:'lightgray'}}
            size={30}
            value={address}
            onChange={(e)=>setAddress(e.target.value)}/><br /><br />
            

            <label htmlFor="position">Position <span style={{color:'red'}}>*</span>: </label> &nbsp;
            <input type="text" style={{backgroundColor:'lightgray'}}
            value={position}
            onChange={(e)=>setPosition(e.target.value)}/> <br /><br />

            <label htmlFor="joineddate">Joined Date <span style={{color:'red'}}>*</span>: </label> &nbsp;
            <input type="date" style={{backgroundColor:'lightgray'}}
            value={joinedDate}
            onChange={(e)=>setJoinedDate(e.target.value)}/> <br /><br />

            <button type='submit' style={{backgroundColor:'blue', color:'white'}}>Add staff</button>

        </form> <br />
        <p>{view}</p>
    </div>
  )
}

export default Staff;