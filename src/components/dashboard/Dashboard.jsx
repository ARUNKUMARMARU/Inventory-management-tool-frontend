import React from 'react';
import './Dashboard.css'


function Dashboard() {   
    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '500px',
    }

  return (
    <div>
        <header><h1><b>WELCOME</b></h1></header>

        <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXRaPIzjLZBtEwa0aJfQxzCRn1x_GhVoTeeg&usqp=CAU" alt="logo" height={'100px'}/>
        </div>
         <div className='pg'>        
             
        <div><b><u> <h2 className='dashboard-header'>Dashboard</h2></u></b></div> <br />

        <div className='dashboard-menu'>
            
        <ul>            
            <li >
                <a href="/billing" >Create Invoice</a>
            </li><br />
            <li >
                <a href='/additem' >Add Item To Stock</a>
            </li><br />
            <li className='demo'>
                <a href="/addcustomer">Add New Customer Details</a>
            </li><br />
            <li className='demo'>
                <a href="/attendence" >Attendence</a>
            </li><br />
            <li >
                <a href="/addsupplier">Add New Supplier Details</a>
            </li><br />
            <li >
                <a href="/addstaff">Add New Staff Details</a>
            </li> 
                  
        </ul>
        </div>       
        
    </div>
    </div>   
   
  )
}

export default Dashboard