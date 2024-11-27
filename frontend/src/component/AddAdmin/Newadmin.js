import React, { useState } from 'react'
import favicon from '../../assets/favicon.ico'
import {ToastContainer} from 'react-toastify'
import { handleerror, handlesuccess } from '../../Toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Newadmin = () => {
    const navigate=useNavigate()
    const[data,setdata]=useState({
        email:''
    })
    const HandleChange=(e)=>{
        const{name,value}=e.target;
        setdata(prev=>({...prev,[name]:value}))
    }
    const HandleSubmit=async (e)=>{
        e.preventDefault();
        try {
           const token=localStorage.getItem('AdminToken')
           const{email}=data
           if(!email)
            {
                handleerror("Please Enter The Email")
            } 
            else{
                const response=await axios.post('http://localhost:2000/Admin/New/admin',{email},{headers  :{Authorization :`Bearer ${token}`}})
                if(response)
                {
                    handlesuccess(response.data.message)
                    setTimeout(() => {
                        navigate('/')
                    }, 1500);
                }
            }
        } catch (error) {
            handleerror(error.response.data.message)
        }
    }
    return (
        <div className="registermain1">
          <form className="formclass" onSubmit={HandleSubmit}>
            <div className="regtop">
              <img src={favicon} alt="n" />
              <h5>Unleash The Power of Leadership at Nike</h5>
            </div>
            <div className="rcontents">
              <input
                type="email"
                placeholder="Email address"
                name="email"
                className="rinputfeild"
                value={data.email}
                onChange={HandleChange}
              />
            </div>
            <div className="termcond">
              <p>By Adding New Admin, you agree to Nike's <a href="#">Privacy policy</a> and <a href="#">Terms of Use</a>.</p>
            </div>
            <div className="rbutton">
              <button type="submit">Add</button>
            </div>
            <ToastContainer />
          </form>
        </div>
      )
}

export default Newadmin
