import React, { useEffect, useState } from 'react';
import './Style/Navbar.css';
import { IoCloseOutline } from "react-icons/io5";
import userimage from '../assets/user.png'
import nikeicon from '../assets/favicon.ico'
import searchicon from '../assets/search.png'
import like from '../assets/outline-heart.png'
import basket from '../assets/bag.png'
import hamburger from '../assets/hamburger.png'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const [user, setUser] = useState(false);
  const loginoption = ["Find a Store", "Help", "Join Us", "Signin"];
  const loginuseroption = ["Find a Store", "Help", "Hi"];
  const adminoptions = ["Add Products", "Make Admin","Orders","Hi"]
  const [isOpen, setisOpen] = useState(false)
  const [category, setcategory] = useState('')
  const [sideopen, setsideopen] = useState(false)
  const navigate = useNavigate()

  const Handlecontent = (category) => {
    setcategory(category)
  }
  const Handlesubcontent = () => {
    setsideopen(!sideopen);
  }

  const HamburgToggle = () => {
    setisOpen(prev => !prev)
    setsideopen()
  }
  const HandleRegister = () => {
    navigate('/Register')
  }
  const HandleLogin = () => {
    navigate('/Login')
  }
  const [firstname, setfirstname] = useState('')
  useEffect(() => {
    const adminToken = localStorage.getItem('AdminToken');
    const userToken = localStorage.getItem('UserToken');
    setfirstname(localStorage.getItem('firstname'))
    if (adminToken || userToken) {
      setUser(true);
    }
  }, []);
useEffect(() => {
  const timer = setTimeout(() => {
    localStorage.clear();
    navigate('/');
    setUser(!user)
  }, 600000);
  window.onbeforeunload = () => localStorage.clear();
  return () => clearTimeout(timer);
}, [navigate]);

  const HandleLogout = () => {
    localStorage.removeItem('AdminToken');
    localStorage.removeItem('UserToken');
    localStorage.removeItem('firstname')
    setUser(!user)
    navigate('/')
  }
  const HandleLand = () => {
    navigate('/')
  }
  const Handlecart = () => {
    navigate('/Cart')
  }
  const HandleFavorite = () => {
    navigate('/Liked')
  }
  const HandleAddproduct=()=>{
    navigate('/Admin/create')
  }
  const Handleaddadmin=()=>{
 navigate('/Admin/New/admin')
  }
  const Handleorders=()=>{
    navigate('/Admin/Oreders/view')
  }
  const HandleOrder=()=>{
    navigate('/Orders')
  }
  return (
    <nav className='navbar'>
      <div className="firstnav">
        <div className="logo">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M13.182 3.733c-.012-.039-.012-.039-.012-.072a.966.966 0 01.922-1.007.97.97 0 011.007.922.964.964 0 01-.917 1.007c-.027.004-.062 0-.101 0-.016.004-.04.004-.056.022-.056.084.14.073-.005.44 0 0 0 .038-.012.077-.012.14-.08.562-.096.793.029.04.04.05.029.13a6.003 6.003 0 01-.09.534c-.04.14-.096.174-.147.202-.073.298-.095.545-.281.905-.022.276-.045.35-.106.484-.017.4.01.46-.281 1.101-.08.3-.017.507.05.821.068.321.276.461.298.793.05.771.017 1.305-.163 1.907l.135.348c.18.084.618.326.36.675.343.19.865.394 1.28.781.176.147.35.315.513.5.316.057.276.08.506.231.675.438 1.749 1.304 2.373 1.906.112.067.147.112.236.163.01.023.017.034.01.04-.026.072-.026.072-.06.14.039.04.095.073.134.107.04.005.04-.006.096-.017.079.073.18.135.214.135.106-.022.084-.005.185-.1.029-.035.084 0 .084 0 .04-.04.113-.119.214-.176.079-.045.23-.045.23-.045.052.006.04.051.029.073-.057.023-.18.057-.247.108-.152.14-.276.353-.276.353.299-.033.484.045.719.023.136-.005.237.006.377-.09 0 0 .14-.096.265-.14.118-.05.23-.017.33.062.069.084.119.084 0 .196-.044.045-.1.096-.18.17-.133.123-.313.291-.5.432a3.11 3.11 0 01-.527.315c-.338.23-.26.174-.523.394-.03.022-.124.078-.163.106-.107.062-.135.006-.197-.118 0 0-.028-.045-.08-.14-.05-.107-.09-.23-.072-.23-.062-.007-.331-.344-.331-.41-.063-.013-.304-.26-.31-.31l-.214-.18c-.253.044-.31-.113-.961-.608-.08-.006-.197-.05-.36-.174-.298-.253-1.007-.815-1.124-.883-.13-.067-.281-.134-.383-.214-.146-.022-.218-.05-.298-.067-.08-.022-.14-.057-.326-.079-.303-.045-.618-.18-.911-.337-.14-.073-.264-.107-.382-.169-.27-.124-.506-.236-.686-.28a2.148 2.148 0 01-.568-.226c-.061-.034-.095-.06-.134-.073-.09-.022-.153.006-.192.022-.23.108-.438.203-.636.31-.18.09-.348.186-.528.286a7.971 7.971 0 01-.534.254s-.534.253-.832.348c-.26.197-.787.546-1.107.715-.158.073-.467.252-.608.292-.08.061-.371.258-.596.421-.18.124-.31.231-.31.231-.106.084-.101.13-.28.045a1.491 1.491 0 00-.13.096c-.14.095-.146.073-.202.067-.101.08-.113.04-.197.13-.061.084 0 .061-.118.106-.028.006-.04.04-.057.056-.094.073-.1.293-.325.304-.135.09-.107.203-.197.191 0 .102-.18.23-.214.23-.292.096-.304-.118-.646.035-.045.016-.113.072-.197.084-.152.022-.332-.006-.444-.102a1.93 1.93 0 01-.326-.398c-.051-.13-.017-.208.163-.332.073-.045.084-.079.208-.084.06-.024.045.01.15-.024.064-.016.064-.005.193-.005.028-.017.067-.022.124-.045.1-.034.196-.062.196-.062s.028-.023.124-.01c.078-.035.169-.08.214-.097-.012-.124.005-.124.06-.174.08-.062.09-.05.148-.01.022-.007.039-.013.027-.035-.01-.073-.061-.107-.045-.247-.022-.057-.061-.129-.05-.174.01-.045.028-.069.056-.079.029-.012.045.006.057.022.028.034.05.135.05.135.006.118.04.26.152.18.067-.062.084-.242.214-.203l.096.085c.084-.073.084-.073.14-.107 0 0-.08-.073-.012-.135.045-.039.108-.067.208-.175.276-.292.422-.42.714-.657a6.811 6.811 0 011.699-.939c.146-.174.28-.286.585-.304.377-.606 1.085-1.136 1.248-1.22.134-.23.19-.208.365-.247.135-.107.175-.107.23-.214.063-.23-.112-.86.383-.877.112-.146.078-.112.196-.248a2.19 2.19 0 01-.118-.5c-.005-.016-.196-.157-.13-.332a2.33 2.33 0 01-.268-.432.202.202 0 01-.063-.012c-.022-.005-.055-.005-.09-.005-.078.196-.163.208-.303.253-.26.512-.35.731-1.046 1.142-.28.298-.382.64-.382.634a.46.46 0 00-.012.321c-.045.107-.027.124-.027.124.01.045.056.106.106.112.079.023.169.023.158.118-.011.113-.163.09-.237.073-.275-.05-.185-.23-.365-.174-.141.085-.196.348-.416.31-.028-.023-.017-.074.006-.119.028-.06.084-.118.056-.14-.146.04-.433.123-.433.123-.135.04-.281-.039-.147-.124.063-.022.153-.05.265-.118 0 0 .062-.072-.057-.039a1.144 1.144 0 01-.416.045s-.257-.039-.292-.056c-.028-.022-.061-.107.017-.1a2.71 2.71 0 00.563-.068c.095-.035.28-.14.382-.186 0 0 .113-.157.18-.19.107-.114.19-.18.28-.299.09-.18.192-.46.5-.906a4.16 4.16 0 01.535-.646s.062-.338.343-.573c.063-.14.157-.31.259-.462a1.7 1.7 0 00.106-.168c.09-.13.186-.377.518-.41 0 0 .147-.102.197-.175.084-.073.074-.186.14-.259-.106-.106-.365-.309-.382-.573a.85.85 0 01.265-.692c.196-.185.398-.275.646-.258.309.055.366.157.455.258.09.101.13.04.163.146.259.073.248.045.237.236.045.057.106.108.1.214.085-.175.108-.208.344-.399.062-.157.1-.315.15-.478.052-.146.114-.298.154-.41-.04-.326.06-.377.196-.664-.022-.039-.016-.05-.006-.112.057-.192.136-.433.186-.596 0 0 .017-.063.085-.063.06-.202.157-.579.179-.663.062-.208.029-.287-.01-.41-.012-.04-.006-.09-.03-.136a5.483 5.483 0 01-.19-.41c-.028-.073-.08-.354-.08-.354-.004-.062-.004-.09-.004-.09z" clipRule="evenodd"></path>
          </svg>
        </div>
        <div className='first-right'>
          {user ? (
            <>
             {localStorage.getItem('AdminToken') ? (
  adminoptions.map((opt, index) => (
    <div className="user-logined" key={index}>
      {opt === 'Hi' ? (
        <div className="Hi-menu">
          <p>{opt}, {firstname}<img className='userimage' src={userimage}></img></p>
          <div className="Hisubmenu">
            <h5>Account</h5>
            <p>Profile</p>
            <p onClick={HandleLogout}>Log Out</p>
          </div>
        </div>
      ) : opt === 'Add Products' ? (
        <p onClick={HandleAddproduct}>{opt}</p>
      ) : opt === 'Make Admin' ? (
        <p onClick={Handleaddadmin}>{opt}</p>
      ) : opt === 'Orders' ? 
        <p onClick={Handleorders}>{opt}</p> 
        : (<p>{opt}</p>)}
    </div>
  ))
): (loginuseroption.map((opt, index) => (
                <div className="user-logined" key={index}>
                  {opt === 'Help' ? (
                    <div className="help-menu">
                      <p>{opt}</p>
                      <div className="submenu">
                        <h5>Help</h5>
                        <p>Order status</p>
                        <p>Dispatch and Delivery</p>
                        <p>Return</p>
                        <p>Contact Us</p>
                        <p>Privacy Policy</p>
                        <p>Terms and Sale</p>
                        <p>Send us Feedback</p>
                      </div>
                    </div>
                  ) : opt === 'Hi' ? (
                    <div className="Hi-menu">
                      <p>{opt}, {firstname}<img className='userimage' src={userimage}></img></p>
                      <div className="Hisubmenu">
                        <h5>Account</h5>
                        <p>Profile</p>
                        <p onClick={HandleOrder}>Orders</p>
                        <p onClick={HandleFavorite}>Favorites</p>
                        <p onClick={HandleLogout}>Log Out</p>
                      </div>
                    </div>
                  ) : (
                    <p>{opt}</p>
                  )}
                </div>
              ))
              )}
            </>
          ) : (
            loginoption.map((opt, index) => (
              <div className="user-logined" key={index}>
                {opt === 'Help' ? (
                  <div className="help-menu">
                    <p>{opt}</p>
                    <div className="submenu">
                      <h5>Help</h5>
                      <p>Order status</p>
                      <p>Dispatch and Delivery</p>
                      <p>Return</p>
                      <p>Contact Us</p>
                      <p>Privacy Policy</p>
                      <p>Terms and Sale</p>
                      <p>Send us Feedback</p>
                    </div>
                  </div>
                ) : opt === 'Join Us' ? (
                  <p onClick={HandleRegister}>{opt}</p>
                ) : opt === 'Signin' ? (
                  <p onClick={HandleLogin}>{opt}</p>
                ) : (
                  <p>{opt}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="secondnav">
        <div className="nikelogo">
          <img src={nikeicon} alt="log" onClick={HandleLand} />
        </div>
        <div className="secondcenter">
          <h4>New & Featured</h4>
          <h4>Men</h4>
          <h4>Women</h4>
          <h4>Kids</h4>
          <h4>Sale</h4>
          <h4>SNKRS</h4>
        </div>
        <div className="secondlast">

          <div className="searchiconbar">
            <img className='searchicon' src={searchicon} alt="j"  />
            <input className='searchbar' type='search' placeholder='Search'/>

          </div>
          <img className='likeicon' src={like} alt="li" onClick={HandleFavorite}   style={{ display: localStorage.getItem('AdminToken') ? 'none' : 'block' }}/>
          <img className='basketicon' src={basket} alt="bs" onClick={Handlecart}   style={{ display: localStorage.getItem('AdminToken') ? 'none' : 'block' }}/>
          <img className='hamburgericon' src={hamburger} alt="ham" onClick={HamburgToggle} />
        </div>
      </div>
      <div className='slidenavbarparent'>
        <div className={`slidenavbar ${isOpen ? 'open' : ''}`} >
          <svg className='closebutton' onClick={HamburgToggle} xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" /></svg>
          <div className="slidecontent">
            <h4 onClick={() => { Handlesubcontent(); Handlecontent('new&featured') }}>New & Featured</h4>
            <h4 onClick={() => { Handlesubcontent(); Handlecontent('men') }}>Men</h4>
            <h4 onClick={() => { Handlesubcontent(); Handlecontent('women') }}>Women</h4>
            <h4 onClick={() => { Handlesubcontent(); Handlecontent('kids') }}>Kids</h4>
            <h4 onClick={() => { Handlesubcontent(); Handlecontent('sale') }}>Sale</h4>
            <h4 onClick={() => Handlecontent('snkrs')}>SNKRS</h4>
          </div>
          <div className='jordansymbol'>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M13.182 3.733c-.012-.039-.012-.039-.012-.072a.966.966 0 01.922-1.007.97.97 0 011.007.922.964.964 0 01-.917 1.007c-.027.004-.062 0-.101 0-.016.004-.04.004-.056.022-.056.084.14.073-.005.44 0 0 0 .038-.012.077-.012.14-.08.562-.096.793.029.04.04.05.029.13a6.003 6.003 0 01-.09.534c-.04.14-.096.174-.147.202-.073.298-.095.545-.281.905-.022.276-.045.35-.106.484-.017.4.01.46-.281 1.101-.08.3-.017.507.05.821.068.321.276.461.298.793.05.771.017 1.305-.163 1.907l.135.348c.18.084.618.326.36.675.343.19.865.394 1.28.781.176.147.35.315.513.5.316.057.276.08.506.231.675.438 1.749 1.304 2.373 1.906.112.067.147.112.236.163.01.023.017.034.01.04-.026.072-.026.072-.06.14.039.04.095.073.134.107.04.005.04-.006.096-.017.079.073.18.135.214.135.106-.022.084-.005.185-.1.029-.035.084 0 .084 0 .04-.04.113-.119.214-.176.079-.045.23-.045.23-.045.052.006.04.051.029.073-.057.023-.18.057-.247.108-.152.14-.276.353-.276.353.299-.033.484.045.719.023.136-.005.237.006.377-.09 0 0 .14-.096.265-.14.118-.05.23-.017.33.062.069.084.119.084 0 .196-.044.045-.1.096-.18.17-.133.123-.313.291-.5.432a3.11 3.11 0 01-.527.315c-.338.23-.26.174-.523.394-.03.022-.124.078-.163.106-.107.062-.135.006-.197-.118 0 0-.028-.045-.08-.14-.05-.107-.09-.23-.072-.23-.062-.007-.331-.344-.331-.41-.063-.013-.304-.26-.31-.31l-.214-.18c-.253.044-.31-.113-.961-.608-.08-.006-.197-.05-.36-.174-.298-.253-1.007-.815-1.124-.883-.13-.067-.281-.134-.383-.214-.146-.022-.218-.05-.298-.067-.08-.022-.14-.057-.326-.079-.303-.045-.618-.18-.911-.337-.14-.073-.264-.107-.382-.169-.27-.124-.506-.236-.686-.28a2.148 2.148 0 01-.568-.226c-.061-.034-.095-.06-.134-.073-.09-.022-.153.006-.192.022-.23.108-.438.203-.636.31-.18.09-.348.186-.528.286a7.971 7.971 0 01-.534.254s-.534.253-.832.348c-.26.197-.787.546-1.107.715-.158.073-.467.252-.608.292-.08.061-.371.258-.596.421-.18.124-.31.231-.31.231-.106.084-.101.13-.28.045a1.491 1.491 0 00-.13.096c-.14.095-.146.073-.202.067-.101.08-.113.04-.197.13-.061.084 0 .061-.118.106-.028.006-.04.04-.057.056-.094.073-.1.293-.325.304-.135.09-.107.203-.197.191 0 .102-.18.23-.214.23-.292.096-.304-.118-.646.035-.045.016-.113.072-.197.084-.152.022-.332-.006-.444-.102a1.93 1.93 0 01-.326-.398c-.051-.13-.017-.208.163-.332.073-.045.084-.079.208-.084.06-.024.045.01.15-.024.064-.016.064-.005.193-.005.028-.017.067-.022.124-.045.1-.034.196-.062.196-.062s.028-.023.124-.01c.078-.035.169-.08.214-.097-.012-.124.005-.124.06-.174.08-.062.09-.05.148-.01.022-.007.039-.013.027-.035-.01-.073-.061-.107-.045-.247-.022-.057-.061-.129-.05-.174.01-.045.028-.069.056-.079.029-.012.045.006.057.022.028.034.05.135.05.135.006.118.04.26.152.18.067-.062.084-.242.214-.203l.096.085c.084-.073.084-.073.14-.107 0 0-.08-.073-.012-.135.045-.039.108-.067.208-.175.276-.292.422-.42.714-.657a6.811 6.811 0 011.699-.939c.146-.174.28-.286.585-.304.377-.606 1.085-1.136 1.248-1.22.134-.23.19-.208.365-.247.135-.107.175-.107.23-.214.063-.23-.112-.86.383-.877.112-.146.078-.112.196-.248a2.19 2.19 0 01-.118-.5c-.005-.016-.196-.157-.13-.332a2.33 2.33 0 01-.268-.432.202.202 0 01-.063-.012c-.022-.005-.055-.005-.09-.005-.078.196-.163.208-.303.253-.26.512-.35.731-1.046 1.142-.28.298-.382.64-.382.634a.46.46 0 00-.012.321c-.045.107-.027.124-.027.124.01.045.056.106.106.112.079.023.169.023.158.118-.011.113-.163.09-.237.073-.275-.05-.185-.23-.365-.174-.141.085-.196.348-.416.31-.028-.023-.017-.074.006-.119.028-.06.084-.118.056-.14-.146.04-.433.123-.433.123-.135.04-.281-.039-.147-.124.063-.022.153-.05.265-.118 0 0 .062-.072-.057-.039a1.144 1.144 0 01-.416.045s-.257-.039-.292-.056c-.028-.022-.061-.107.017-.1a2.71 2.71 0 00.563-.068c.095-.035.28-.14.382-.186 0 0 .113-.157.18-.19.107-.114.19-.18.28-.299.09-.18.192-.46.5-.906a4.16 4.16 0 01.535-.646s.062-.338.343-.573c.063-.14.157-.31.259-.462a1.7 1.7 0 00.106-.168c.09-.13.186-.377.518-.41 0 0 .147-.102.197-.175.084-.073.074-.186.14-.259-.106-.106-.365-.309-.382-.573a.85.85 0 01.265-.692c.196-.185.398-.275.646-.258.309.055.366.157.455.258.09.101.13.04.163.146.259.073.248.045.237.236.045.057.106.108.1.214.085-.175.108-.208.344-.399.062-.157.1-.315.15-.478.052-.146.114-.298.154-.41-.04-.326.06-.377.196-.664-.022-.039-.016-.05-.006-.112.057-.192.136-.433.186-.596 0 0 .017-.063.085-.063.06-.202.157-.579.179-.663.062-.208.029-.287-.01-.41-.012-.04-.006-.09-.03-.136a5.483 5.483 0 01-.19-.41c-.028-.073-.08-.354-.08-.354-.004-.062-.004-.09-.004-.09z" clip-rule="evenodd"></path></svg>
            <h6>Jordan</h6>
          </div>
          <div className="slidenavcontents">
            <p>Become a Nike Member for the best products, inspiration and stories in sport.<p1 className='blackp'>Learn more</p1></p>
          </div>
          <div className="slidebuttons" style={{display:localStorage.getItem('AdminToken')||localStorage.getItem('UserToken') ? 'none' : 'block'}}>
            <button className='button1' onClick={HandleRegister}>Join Us</button>
            <button className='button2' onClick={HandleLogin}>Sign in</button>
          </div>
          <div className="slidebuttonslogout" style={{display:localStorage.getItem('AdminToken')||localStorage.getItem('UserToken') ? 'block' : 'none'}}>
            <button className='button' onClick={()=>{HandleLogout();HandleLand()}}>Logout</button>
          </div>
          <div className="slide-end">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M484-247q16 0 27-11t11-27q0-16-11-27t-27-11q-16 0-27 11t-11 27q0 16 11 27t27 11Zm-35-146h59q0-26 6.5-47.5T555-490q31-26 44-51t13-55q0-53-34.5-85T486-713q-49 0-86.5 24.5T345-621l53 20q11-28 33-43.5t52-15.5q34 0 55 18.5t21 47.5q0 22-13 41.5T508-512q-30 26-44.5 51.5T449-393Zm31 313q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" /></svg>
              <p>Help</p>
            </div>
            <div onClick={Handlecart}>
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M220-80q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h110v-10q0-63 43.5-106.5T480-880q63 0 106.5 43.5T630-730v10h110q24 0 42 18t18 42v520q0 24-18 42t-42 18H220Zm0-60h520v-520H630v90q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-90H390v90q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-90H220v520Zm170-580h180v-10q0-38-26-64t-64-26q-38 0-64 26t-26 64v10ZM220-140v-520 520Z" /></svg>
              <p >Bag</p>
            </div>
            <div onClick={localStorage.getItem('UserToken') ? HandleOrder :   Handleorders }>
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M164-160v-517L82-853l56-27 90 203h505l90-203 56 27-82 176v517H164Zm232-297h170q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H396q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5ZM224-220h513v-397H224v397Zm0 0v-397 397Z" /></svg>
              <p >Orders</p>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M160-740v-60h642v60H160Zm5 580v-258h-49v-60l44-202h641l44 202v60h-49v258h-60v-258H547v258H165Zm60-60h262v-198H225v198Zm-50-258h611-611Zm0 0h611l-31-142H206l-31 142Z" /></svg>
              <p>Find a Store</p>
            </div>
          </div>
        </div>
        <div className={`slidesubcontent ${sideopen ? 'open' : ''}`}>
          {category === 'new&featured' ? (
            <div className="subsub">
              <div className="subtop">
                <div className="subtopfirst">
                  <svg onClick={Handlesubcontent} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                  <p>All</p>
                </div>
                <div className="subtoplast">
                  <svg onClick={HamburgToggle} xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                </div>
              </div>
              <div className="subhead">
                <h4>New & Featured</h4>
              </div>
              <div className="subend">
                <ul>
                  <li>New Arrivals</li>
                  <li>Bestsellers</li>
                  <li>Featured</li>
                  <li>Shop Icons</li>
                  <li>Shop By Sport</li>
                </ul>
              </div>
            </div>
          ) : (
            category === 'men' ? (<div className="subsub">
              <div className="subtop">
                <div className="subtopfirst">
                  <svg onClick={Handlesubcontent} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                  <p>All</p>
                </div>
                <div className="subtoplast">
                  <svg onClick={HamburgToggle} xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                </div>
              </div>
              <div className="subhead">
                <h4>Men</h4>
              </div>
              <div className="subend">
                <ul>
                  <li>New Arrivals</li>
                  <li>Bestsellers</li>
                  <li>Shoes</li>
                  <li>Clothing</li>
                  <li>Shop By Sport</li>
                  <li>Accessories and Equipment</li>
                </ul>
              </div>
            </div>)
              : (category === 'women' ? (<div className="subsub">
                <div className="subtop">
                  <div className="subtopfirst">
                    <svg onClick={Handlesubcontent} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                    <p>All</p>
                  </div>
                  <div className="subtoplast">
                    <svg onClick={HamburgToggle} xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                  </div>
                </div>
                <div className="subhead">
                  <h4>Women</h4>
                </div>
                <div className="subend">
                  <ul>
                    <li>New Arrivals</li>
                    <li>Bestsellers</li>
                    <li>Shoes</li>
                    <li>Clothing</li>
                    <li>Shop By Sport</li>
                    <li>Accessories and Equipment</li>
                  </ul>
                </div>
              </div>) : (category === 'kids' ? (<div className="subsub">
                <div className="subtop">
                  <div className="subtopfirst">
                    <svg onClick={Handlesubcontent} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                    <p>All</p>
                  </div>
                  <div className="subtoplast">
                    <svg onClick={HamburgToggle} xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                  </div>
                </div>
                <div className="subhead">
                  <h4>Kids</h4>
                </div>
                <div className="subend">
                  <ul>
                    <li>New Arrivals</li>
                    <li>Bestsellers</li>
                    <li>Featured</li>
                    <li>Shoes</li>
                    <li>Clothing</li>
                    <li>Kids By Age</li>
                    <li>Shop By Sports</li>
                    <li>Accessories and Equipment</li>
                  </ul>
                </div>
              </div>) : (category === 'sale' ? (<div className="subsub">
                <div className="subtop">
                  <div className="subtopfirst">
                    <svg onClick={Handlesubcontent} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                    <p>All</p>
                  </div>
                  <div className="subtoplast">
                    <svg onClick={HamburgToggle} xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                  </div>
                </div>
                <div className="subhead">
                  <h4>Sale</h4>
                </div>
                <div className="subend">
                  <ul>
                    <li>Shop All Sale</li>
                    <li>Bestsellers</li>
                    <li>Last Chance</li>
                    <li>Men's Sale</li>
                    <li>Women's Sale</li>
                    <li>Kid's Sale</li>
                    <li>Shop By Sport</li>
                  </ul>
                </div>
              </div>) : (category === 'snkrs' ? (<></>) : (<></>))))))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
