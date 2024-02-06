import React, { useState } from 'react';
import validator from 'validator';
import authService from '../service/auth';
import { useNavigate } from 'react-router-dom';


function Signup() {  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
 
  const navigate = useNavigate()
  
  const validate = (value) => { 

      if (validator.isStrongPassword(value, { 
          minLength: 8, minLowercase: 1, 
          minUppercase: 1, minNumbers: 1, minSymbols: 1 
      })) { 
          setErrorMessage('Strong Password') 
      } else { 
          setErrorMessage('Poor Password') 
      } 
  };

  const handleSignup = async (e)=>{
    e.preventDefault();

    const user = {
      email : email,
      name : name,
      password : password      
    };
    console.log(user);
   const res = await authService.signup(user);
   

    setEmail("");
    setName("");
    setPassword("");
    
    navigate('/')
    
  }

  return (
    <div style={{ backgroundImage:
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbywcyMH8o93xAh3wJ2kGavMEl_4Ki_R8lqGZ5WWlA6eaO7WwhtqViWGqZvOUjuko3YVU&usqp=CAU')",
  height: "100vh",
  marginTop: "0px",
  fontSize: "20px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',}}>
      <form autoComplete='on' onSubmit={handleSignup}>

        <label >Enter email id : 
          <span style={{width: '30px',
          border: '1px solid black',
          padding: '1px', backgroundColor:'white'
          }}>&#9993;</span></label>

        <input type="email" placeholder='email...' name='email' size={30} 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        /><br /><br />

        <label>Enter your name : </label>
        <input type="text" placeholder='name...' name='name' 
        value={name}
        onChange={(e)=>setName(e.target.value)}
        /><br /><br />

        <label>Create password : <span style={{width: '30px',
          border: '1px solid black',
          padding: '1px', backgroundColor:'white'
          }}>&#128273;</span> </label>
        <input type="password"  name='password' autoComplete='on'  
        value={password} placeholder='123ABab#%'
        onChange={(e) =>{setPassword(e.target.value)
          validate(e.target.value) 
        }}/><br /><br />
        <p>{errorMessage}</p>
        <p style={{textAlign:'center'}}>(Must contain at least one number and one uppercase and lowercase letter, and one special chatacter and at least 8 or more characters)</p> <br />

       <button type='submit' style={{backgroundColor :'GrayText', color:'white'}}>Submit</button>
      </form>
   
    </div>
  )
}

export default Signup