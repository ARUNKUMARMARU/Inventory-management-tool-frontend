import React, { useEffect, useState } from 'react';
import authService from '../service/auth';
import getService from '../service/get';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';


function Attendence(){  
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState("present"); 
  const [getStaff, setGetStaff] = useState([]);
  
  const [view, setView] = useState('');

  useEffect(()=>{
   getService.getstaff().then((a)=>{setGetStaff(a)});
   
  },[])

  const handleTodayAttendence = (a,status)=>{    
    const newAttendence = {     
    staffname : a,
    status : status
    }

    authService.attendence(newAttendence);
    setId('');
    setName('');
   
    
  };
   
  return (
    <div>
       <div style={{padding:'10px'}}>
       <label htmlFor="date">Date : </label>
        <input type="date"/> <br /> <br />

       </div>
        <div>
        <Table striped bordered hover>
        <thead>
            <tr>
                <th style={{backgroundColor:'black', color:'white',textAlign:'center'}}>S.No</th>
                <th style={{backgroundColor:'black', color:'white', textAlign:'center'}}>Staff Name</th>
                <th style={{backgroundColor:'black', color:'white', textAlign:'center'}}>Status</th>
                <th style={{backgroundColor:'black', color:'white', textAlign:'center'}}>Action</th>
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
                        <select id="att"
                      value={status[staff._id]}                                       
                      onChange={e=>setStatus({...status,[staff._id]:e.target.value})}>
                        <option value="">--select--</option>
                        <option value='present' name=''>Present</option>
                        <option value='absent'>Absent</option></select>                        
                      </td>               
                      <td>
                      <button type='submit' onClick={()=>handleTodayAttendence(staff?.staffname, status[staff._id])} >Submit</button></td>   
                      <td>{status[staff._id]}</td>                   
                    </tr>
                    

                    )
                  })                 
                 }
            </tbody>
        </Table>
       
          
          
          <div>
          
          
          </div>
        </div>
      
    </div>
  )
}

export default Attendence;