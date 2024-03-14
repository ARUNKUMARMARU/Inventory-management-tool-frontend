import React, { useState } from 'react';
import validator from 'validator';
import authService from '../../service/auth';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { Spin } from 'antd';

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [errorMessage2, setErrorMessage2] = useState("")
  const [isLoading,setIsLoading] = useState(false)

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


  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (email && name && password) {
      const user = {
        email: email,
        name: name,
        password: password
      };
      
      const res = await authService.signup(user);

      if (res.hasOwnProperty('error')) {
        setErrorMessage2("This MailId Was Alredy Registered")
      } else {
        setEmail("");
        setName("");
        setPassword("");

        navigate('/')
      }

    } else {
      setErrorMessage2("Kindily Fill All Manditory Fields")
    }
  }

  return (

    <div><header><h1><b>REGISTER</b></h1></header>
      <div style={{position:'sticky', top:0}}>
        <img className='img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXRaPIzjLZBtEwa0aJfQxzCRn1x_GhVoTeeg&usqp=CAU" alt="logo" height={'100px'} />
      </div>
      <div className='bodyb'>
        <form autoComplete='on' onSubmit={handleSignup} className='form'>

          <label className='label'>Enter email id : <span style={{ color: 'red' }}>*</span>
          </label>

          <input className='input' type="email" placeholder='email...' name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br /><br />

          <label className='label'>Enter your name : <span style={{ color: 'red' }}>*</span> </label>
          <input className='input' type="text" placeholder='name...' name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          /><br /><br />

          <label className='label'>Create password : <span style={{ color: 'red' }}> *</span>  </label>
          <input className='input' type="password" name='password' autoComplete='on'
            value={password} placeholder='123ABab#%'
            onChange={(e) => {
              setPassword(e.target.value)
              validate(e.target.value)
            }} /><br /><br />
          <p className='error-message'>{errorMessage}</p>
          <p >(Must contain at least one number and one uppercase and lowercase letter, and one special chatacter and at least 8 or more characters)</p> <br />

          <p className='error-message'>{errorMessage2}</p>
          {
            isLoading?<Spin></Spin>:<button type='submit' className='button'>Submit</button>
          }
        </form>
      </div>
    </div>


  )
}

export default Signup