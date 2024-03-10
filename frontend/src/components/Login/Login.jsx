import React, { useState } from 'react'
import './Login.css'
import { loginimg } from '../../Staticfiles/static'
import { Link } from 'react-router-dom';
let user;
const Login = () => {
    const[name,setName]=useState("");
    
    const setUser=()=>{
        user=name;
        setName("");
    }
  return (
    <div className='LoginContainer'>
     <div className='LoginBox'>
      <img src={loginimg} alt='logo'/>
        <h1>C chat</h1>
        <input type='text' id="inputid" onChange={(e)=>setName(e.target.value)}/>
        <Link onClick={(e)=>!name?e.preventDefault():null}to="/chat"><button className='Loginbtn' onClick={setUser}>Login</button></Link>
     </div>
    

    </div>
  )
}

export default Login
export {user}