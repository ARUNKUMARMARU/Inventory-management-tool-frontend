import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../service/auth';
import './Signin.css'
import {message} from 'antd'
import {Spin} from 'antd';

function Signin() {

  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [isLoading,setIsLoding]=useState(false);
  const navigate = useNavigate();

  const handleSign = async(e)=>{
    e.preventDefault();
setIsLoding(true)
  if(email && password){
    
      const user = {
        email : email,
        password : password
      };
  
    
     const success = await authService.signin(user)
     //let res = ""
    //  if("error" in success){
    //   res = "error"
    //  }
     //console.log(res)
setIsLoding(false)
     if(success.hasOwnProperty('error')){     
      
      setError("Kindly Enter Valid MailId & Password")
      
     }else if(success){
      message.success('Loged in successfully')
      navigate('/dashboard');
     }
     else{
      message.error("Kindly Enter Valid MailId & Password")
     }
    
    
  }else{
    setIsLoding(false)
    setError("Please fill in both username and password fields.")
  }
  }
  return (
    
    <div >
      
      <header ><h1><b>LOGIN</b></h1></header>
      <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXRaPIzjLZBtEwa0aJfQxzCRn1x_GhVoTeeg&usqp=CAU" alt="logo" height={'100px'}/>
        </div>
 <div className='container'>   
    
      <div  className='form-container'>
      <form autoComplete='on' onSubmit={handleSign}>
        <p><b><u>Login</u></b></p>

<div>
  <label htmlFor="email">Enter email id <span style={{color:'red'}}>*</span> </label>&nbsp;

  <input type="email" 
  placeholder='sample123@gmail.com'
  onChange={(e)=>{setEmail(e.target.value), setError('')}}/>
</div><br />

<div>
  <label htmlFor="password">Enter password <span style={{color:'red'}}>*</span>
  </label> &nbsp;
  <input type="password" autoComplete='on' 
  placeholder='AaBb#%&123'
  onChange={(e)=>{setPassword(e.target.value),setError('')}} 
   />
   <p style={{color:'black'}}>(Must contain at least one number and one uppercase and lowercase letter, and one special chatacter and at least 8 or more characters)</p>
</div>

{/* <div><p> <Link to='/forgotpassword'>Forgot Password?</Link></p></div><br /> */}
{error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
<div>

    {isLoading?<Spin></Spin> : <button type="submit" style={{ width: '30%', padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', textAlign:'center', }}>Login </button>}   
</div>
</form> <br />
<div><p>Don't have an Account? <Link to='/signup'>SignUp</Link></p></div>
      </div>
     
 </div>  
 
    </div>
  )
}

export default Signin