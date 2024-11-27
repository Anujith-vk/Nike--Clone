import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import favicon from '../../assets/favicon.ico'
import { ToastContainer } from 'react-toastify'
import { handleerror, handlesuccess } from '../../Toast'
import axios from 'axios'

const Loginbody = () => {
  const navigate = useNavigate()

  const [logindata, setlogindata] = useState({
    email: '',
    password: ''
  })

  const HandleChange = (e) => {
    const { name, value } = e.target
    setlogindata(prev => ({ ...prev, [name]: value }))
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = logindata;

    if (!email || !password) {
        handleerror("Please fill all the fields");
        return;
    }

    try {
        const response = await axios.post('https://nike-clone-3etr.onrender.com/login/user', { email, password });
        if (response && response.data) {
            handlesuccess(response.data.message);
            const token = response.data.AdminToken || response.data.UserToken;
            const tokenname=response.data.AdminToken ? "AdminToken" : "UserToken"
            const firstname=response.data.user.firstname
            localStorage.setItem('firstname',firstname)
            if (token) {
                localStorage.setItem(tokenname,token);  
                setTimeout(() => {

                    navigate('/');  
                }, 2000);
            } else {
                handleerror("No token received. Please try again.");
            }
        } else {
            handleerror("Unexpected response format");
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            handleerror(error.response.data.message);
        } else {
            handleerror("An unexpected error occurred. Please try again.");
        }
    }
};

  return (
    <div className="registermain1">
      <form className="formclass" onSubmit={HandleSubmit}>
        <div className="regtop">
          <img src={favicon} alt="k" />
          <h5>Your Account For Everything Nike</h5>
        </div>
        <div className="rcontents">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            className="rinputfeild"
            value={logindata.email}
            onChange={HandleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="rinputfeild"
            value={logindata.password}
            onChange={HandleChange}
          />
        </div>
        <div className="termcond">
          <p>By logging in, you agree to Nike's <a href="#">Privacy policy</a> and <a href="#">Terms of Use</a>.</p>
        </div>
        <div className="rbutton">
          <button type="submit">Login</button>
        </div>
        <div className="rlog">
          <p>Not a member? <a href="/Register">Join us</a></p>
        </div>
        <ToastContainer />
      </form>
    </div>
  )
}

export default Loginbody
