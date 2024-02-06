import React from 'react';
import  '../style.css';

function Dashboard() {   
    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '500px',
    }

  return (
    <div className='pg'>

        <div  style={{textAlign : "center", paddingTop:'10px'}}> <b><h1>Welcome</h1></b>       
        </div>
        <div>
            <img style={{display : 'flex'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXRaPIzjLZBtEwa0aJfQxzCRn1x_GhVoTeeg&usqp=CAU" alt="logo" height={'100px'}/>
        </div>      
        <div><b><u> <h2 style={{color:'darkgreen', textAlign : "center"}}>Dashboard</h2></u></b></div> <br />

        <div style={style}>
            
        <ul>            
            <li className='demo'>
                <a href="/billing" className='demo'>Create Invoice</a>
            </li><br />
            <li className='demo'>
                <a href='/additem' className='demo'>Add Item To Stock</a>
            </li><br />
            <li className='demo'>
                <a href="/addcustomer" className='demo'>Add New Customer Details</a>
            </li><br />
            <li className='demo'>
                <a href="/attendence" className='demo'>Attendence</a>
            </li><br />
            <li className='demo'>
                <a href="/addsupplier" className='demo'>Add New Supplier Details</a>
            </li><br />
            <li className='demo'>
                <a href="/addstaff" className='demo'>Add New Staff Details</a>
            </li> <br /> 
                  
        </ul>
        </div>       
        
    </div>
  )
}

export default Dashboard