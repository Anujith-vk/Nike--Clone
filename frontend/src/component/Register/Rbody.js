import React, { useState } from 'react'
import '../Register/Rbody.css'
import favicon from './favicon.ico'
import {ToastContainer} from 'react-toastify'
import { handleerror, handlesuccess } from '../../Toast';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const Rbody = () => {
  const navigate=useNavigate()
  const[formdata,setformdata]=useState({
    email:'',
    password:'',
    firstname:'',
    lastname:'',
    dateofBirth:''
  })
  const Handledata=(e)=>{
    const{name,value}=e.target;
    setformdata((prev)=>({...prev,[name]:value}))
  }

  const HandleSubmit=async (e)=>{
    e.preventDefault();
    try {
        const {email,password,firstname,lastname,dateofBirth}=formdata
        if(!email||!password||!firstname||!lastname||!dateofBirth)
        {
            handleerror("Please Fill All the Feilds")
        }
        else{
        const  response=await axios.post('https://nike-clone-3etr.onrender.com/Create/user',{email,password,firstname,lastname,dateofBirth})
        if(response)
        {
            handlesuccess(response.data.message)
            setTimeout(() => {
              navigate('/')
            }, 2000);
        }
    }
    } catch (error) {
        handleerror(error.response.data.message)
    }
  }
  return (
    <div className='registermain'>
     <form  className='formclass' onSubmit={HandleSubmit}>
       <div className="regtop">
         <img src={favicon} alt="k" />
         <h5>BECOME A NIKE MEMBER</h5>
         <p>Create your Nike Member profile and get first access to the very best of Nike products. inspiration and Community</p>
       </div>
       <div className="rcontents">
        <input type="text" placeholder='Email address' name='email' value={formdata.email} className='rinputfeild' onChange={Handledata}/>
        <input type="text" placeholder='Password' name='password' value={formdata.password} className='rinputfeild' onChange={Handledata}/>
        <input type="text" placeholder='First Name' name='firstname' value={formdata.firstname} className='rinputfeild'onChange={Handledata}/>
        <input type="text" placeholder='Last Name' name='lastname' value={formdata.lastname} className='rinputfeild'onChange={Handledata}/>
        <input type="date" name='dateofBirth' value={formdata.dateofBirth}  className='rinputfeilddate' onChange={Handledata}/>
       </div>
       <div className="termcond">
        <p>By creating an account, you agree to Nike's <a href="">Privacy policy</a> and <a href="">Terms of Use</a> </p>
       </div>
       <div className="rbutton">
        <button type='submit'>Join Us</button>
       </div>
       <div className="rlog">
        <p>Already a Member? <a href="/Login">Login</a></p>
       </div>
       <ToastContainer/>
     </form>
    </div>
  )
}

export default Rbody
