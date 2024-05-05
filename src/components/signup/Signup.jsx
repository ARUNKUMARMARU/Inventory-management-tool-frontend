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
  
  const [errorMessage2, setErrorMessage2] = useState("")
  const [errorMessage3, setErrorMessage3] = useState("")
  const [errorMessage4, setErrorMessage4] = useState("")
  const [isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate()

  const validate = (value) => {

    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage3('')
      setErrorMessage4('Strong Password')
    } else {
      setErrorMessage4('')
      setErrorMessage3('Poor Password')
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
        setIsLoading(false);
        setErrorMessage2("This MailId Was Alredy Registered")
      } else {
        setEmail("");
        setName("");
        setPassword("");
        alert("Registration Compleated Successfully")
        navigate('/')
      }

    } else {
      setIsLoading(false);
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

          <label className='label2'><strong>Enter email id </strong> <span style={{ color: 'red' }}>*</span>
          </label>

          <input className='input' type="email" placeholder='email...' name='email'
            value={email}
            onChange={(e) => {setEmail(e.target.value), setErrorMessage2('')}}
          /><br /><br />

          <label className='label2'><strong>Enter your name </strong> <span style={{ color: 'red' }}>*</span> </label>
          <input className='input' type="text" placeholder='name...' name='name'
            value={name}
            onChange={(e) => {setName(e.target.value),setErrorMessage2('')}}
          /><br /><br />

          <label className='label2'><strong>Create password  </strong><span style={{ color: 'red' }}> *</span>  </label>
          <input className='input' type="password" name='password' autoComplete='on'
            value={password} placeholder='123ABab#%'
            onChange={(e) => {
              {setPassword(e.target.value),
              validate(e.target.value),
              setErrorMessage2('')}
            }} /><br />
          <p className='error-message'>{errorMessage3}</p>
          <p className='error-message2'><b>{errorMessage4}</b></p>
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