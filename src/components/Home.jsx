import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Home() {
  
  return (
    <div>
      <div>
        <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgQoYB5CWT6plO_Tmhdo-Mo5wJ0tNg2YarzA&s" alt="welcome" />
      </div>

      <div style={{textAlign:'center'}}><h1>Click <Link to='/signin'>here</Link> for Login</h1>
      
      <h2>Need to Create Account? <Link to='/signup'>Click here</Link></h2></div>



    </div>
  )}

export default Home