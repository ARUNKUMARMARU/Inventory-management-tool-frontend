import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../service/auth';

function Signin() {

  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSign = async(e)=>{
    e.preventDefault();

    const user = {
      email : email,
      password : password
    };

    console.log(user)
   await authService.signin(user)
   navigate('/dashboard')
  }

  return (
    <div>

      <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUsLYZ7w5xnXaYuI6pFOrwDELcpv71rD2sGB7U_UMAZxKf7zjLI9iDd-zpXY6ZP9nrXcM&usqp=CAU" alt="" /></div>
      
      <div style={{textAlign:'center'}}><h1>LOGIN</h1></div>

      <div style={{textAlign:'center'}}>
      <form autoComplete='on' onSubmit={handleSign}>

<div >
  <label htmlFor="email">Enter email id <span style={{color:'red'}}>*</span> </label>&nbsp;

  <input type="email" size={30} 
  placeholder='sample123@gmail.com'
  onChange={(e)=>setEmail(e.target.value)}/>
</div><br />

<div>
  <label htmlFor="password">Enter password <span style={{color:'red'}}>*</span>
  </label> &nbsp;
  <input type="password" autoComplete='on' 
  placeholder='AaBb#%&123'
  onChange={(e)=>setPassword(e.target.value)} 
   />
   <p style={{color:'red'}}>(Must contain at least one number and one uppercase and lowercase letter, and one special chatacter and at least 8 or more characters)</p>
</div>

{/* <div><p> <Link to='/forgotpassword'>Forgot Password?</Link></p></div><br /> */}

<div>
  <input type="submit" />
</div>
</form>
<div><p>Don't have an Account? <Link to='/signup'>SignUp</Link></p></div>
      </div>

     

    </div>
  )
}

export default Signin