import React, { useState,useEffect } from 'react'
import './Style/Footer.css'
const Footer = () => {
  const [resource,setresource]=useState(true)
  const [help,sethelp]=useState(true)
  const [company,setcompany]=useState(true)
  const[windowWidth,setWindowWidth]=useState(window.innerWidth)


  const HandleResize=()=>{
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
   window.addEventListener('resize',HandleResize)
  }, [])

 const HandleResource=()=>{
  if(window.innerWidth<960){
    setresource(!resource)
  }
 }
 const HandleHelp=()=>{
  if(window.innerWidth<960){
    sethelp(!help)
  }
 }
 const HandleCompany=()=>{
  if(window.innerWidth<960)
  {
    setcompany(!company)
  }
 }

 useEffect(() => {
 if(windowWidth<960)
 {
  sethelp(false)
  setcompany(false)
 }
 else
 {
  setcompany(true)
  sethelp(true)
  setresource(true)
 }
 }, [windowWidth])

  return (
    <div className='footermaindivision'>
      <div className="firstfooter">
        <div className="firstsection">
          <h5 onClick={HandleResource}>Resources</h5>
          {resource && 
          <div className="setdetails">
            <p>Find A Store</p>
            <p>Become A Member</p>
            <p>Send Us Feedback</p>
          </div>
          }
          </div>
        <div className="secondsection">
          <h5 onClick={HandleHelp}>Help</h5>
          {help && 
          <div className="setdetails">
            <p>Get Help</p>
            <p>Order Status</p>
            <p>Delivery</p>
            <p>Returns</p>
            <p>Payment Options</p>
            <p>Contact Us On Nike.com Inquiries</p>
            <p>Contact Us On All Other Inquiries</p>
          </div>
          }
        </div>
        <div className="thirdsection">
        <h5 onClick={HandleCompany}>Company</h5>
        {company && 
          <div className="setdetails">
            <p>About Nike</p>
            <p>News</p>
            <p>Careers</p>
            <p>Inverstors</p>
            <p>Sustainability</p>
          </div>
          }
        </div>
        <div className="fourthsection">
        <svg className='glob' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000005d"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/></svg>
        <h5>India</h5>
        </div>
      </div>
      <div className="footersecond">
     <h5>2024 Nike, Inc. All rights reserved</h5>
     <h5>Guides</h5>
     <h5>Terms of Sale </h5>
     <h5>Terms of Use</h5>
     <h5>Nike Privacy Policy</h5>
      </div>
      </div>
  )
}

export default Footer