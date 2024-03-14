import React, { useEffect, useState } from 'react';
import authService from '../../service/auth';
import getService from '../../service/get';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';


function Attendence(){    
  const [status, setStatus] = useState({}); 
  const [getStaff, setGetStaff] = useState([]); 
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [view, setView] = useState('');

  useEffect(()=>{
   getService.getstaff().then((staffData)=>{
    setGetStaff(staffData)
    const initialStatus={};
    staffData.forEach((staff)=>{   
      initialStatus[staff._id]='Present'
      
  });   
  setStatus(initialStatus)
  
   }); 
   
  },[])


  const handleTodayAttendance = async ()=>{   
    setIsLoading(true);
    const newAttendence =       
    {
      date : date,
     details : getStaff.map((staff)=>({
        staffname:staff.staffname,  
        status:status[staff._id]   
      }))    
      
    }    
     
   const res = await authService.attendence(newAttendence);  
   console.log(res.message)
   setView(res.message)
   setIsLoading(false)    
  };
   
  return (
    <div>
       
       <header><h1><b>STAFF ATTENDENCE</b></h1></header>

       <div style={{padding:'10px'}}>
       <label htmlFor="date">Date : </label>
        <input 
        type="date"
        value={date}
        /> <br /> <br />

       </div>
        <div>
        <Table striped bordered hover>
        <thead>
            <tr>
                <th style={{backgroundColor:'black', color:'white',textAlign:'center'}}>S.No</th>
                <th style={{backgroundColor:'black', color:'white', textAlign:'center'}}>Staff Name</th>
                <th style={{backgroundColor:'black', color:'white', textAlign:'center'}}>Status</th>                
                <th style={{backgroundColor:'black', color:'white', textAlign:'center'}}>Remark</th>
            </tr>
            </thead>

            <tbody>
                 {
                  getStaff.map((staff,i)=>{
                    return(
                      <tr key={i+1}>
                      <td>{i+1}</td>
                      <td>{staff.staffname}</td>
                      <td>                        
                        <select
                      value={status[staff._id]}                                       
                      onChange={(e) => setStatus({...status, [staff._id]: e.target.value})}>                       
                        <option 
                        value='Present' 
                        >
                          Present</option>
                        <option 
                        value='Absent'>
                          Absent</option></select>                        
                      </td>                
                      <td>{status[staff._id]}</td>                   
                    </tr>
                    )
                  })                 
                 }
            </tbody>
        </Table>      
        <div>
         {
          isLoading?<Spin></Spin>:<button type="button" onClick={handleTodayAttendance}>
          Submit Attendance
         </button>
         }
         
      </div>
      <p style={{color:'green'}}>{view}</p>
        </div>
        <div><p><b>Note :</b> You can <Link to='/addstaff'>add a new staff</Link> here</p></div>
      
    </div>
  )
}

export default Attendence;
