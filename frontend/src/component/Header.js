import React, { useEffect, useState } from 'react';
import './Style/Header.css';
import image1 from '../assets/nikelandpage.jpg';
import image2 from '../assets/fullscreen/branding.jpg';
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import playback from '../assets/videoplayback.mp4'
import vomero1 from '../assets/vomero2.png'
import vomero from '../assets/VOMERO17-G.png'
import jordan2 from '../assets/jordan2.png'
import jordan from '../assets/jordan.png'
import city from '../assets/city.png'
import city2 from '../assets/city2.png'
import cloths from '../assets/cloth.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Header = () => {
  const navigate=useNavigate()
 const[showIcons,setshowIcons]=useState(true)
 const[showkid,setshowkid]=useState(true)
 const[showshoe,setshowshoe]=useState(true)
 const[showcloth,setshowcloth]=useState(true)
  const detectsize=()=>{
    setwindowdimension({
        winWidth:window.innerWidth,
        winheigh:window.innerHeight
    })
  }
  const handleScroll=(direction)=>{
    const container=document.querySelector('.third-content')
    const scrollamount=499;
    if(direction==='left')
    {
      container.scrollLeft-=scrollamount
    }
    else{
      container.scrollLeft+=scrollamount
    }
  }
  const handleScroll1=(direction)=>{
    const container=document.querySelector('.fcontent')
    const scrollamount=499;
    if(direction==='left')
    {
      container.scrollLeft-=scrollamount
    }
    else{
      container.scrollLeft+=scrollamount
    }
  }
 useEffect(() => {
    window.addEventListener('resize',detectsize)
 }, [])

    const[windowdimension,setwindowdimension]=useState({
        winWidth:window.innerWidth,
        winheigh:window.innerHeight
    })


    const seticon = () => {
      if (windowdimension.winWidth < 768) { 
        setshowIcons(prevState => !prevState);
      }
    };
    
    const setshoe=()=>{
      if (windowdimension.winWidth < 768) { 
        setshowshoe(prevState => !prevState);
      }
    }

    const setcloth=()=>{
      if (windowdimension.winWidth < 768) { 
        setshowcloth(prevState => !prevState);
      }
    }
    const setkid=()=>{
      if (windowdimension.winWidth < 768) { 
        setshowkid(prevState => !prevState);
      }
    }
    
    useEffect(() => {
     if(windowdimension.winWidth<768)
     {
      setshowIcons(false)
      setshowkid(false)
      setshowcloth(false)
      setshowshoe(false)
     }
     else
     {
      setshowIcons(true)
      setshowkid(true)
      setshowcloth(true)
      setshowshoe(true)
     }
    }, [windowdimension.winWidth])

const Handlehome=()=>{
  navigate('/home')
}
const [selectedcategory,setselectedcategory]=useState('')
const Handlefirst = (category) => {
  setselectedcategory(category);
  navigate("/home", { state: { selectedcategory: category } }); 
};

const [products,setproducts]=useState([])
const fetchproducts=async ()=>{
  try {
    const response=await axios.get('http://localhost:2000/products/display')
    if(response && response.data.products)
    {
      const sortedProducts = response.data.products.reverse()
      setproducts(sortedProducts.slice(0, 5))
    }
  } catch (error) {
    console.log("error",error);  
  }
}
useEffect(() => {
  fetchproducts()
}, [])

const Handlebuy=(id)=>{
  navigate(`/Product/${id}`)
}
  return (
    <header>
      <div className='main  '> 
        <div className="first">
            {
                windowdimension.winWidth> 768 ? (
                <img src={image2} alt="land" className='img-fluid' onClick={Handlehome}/>
                ):(
                <img src={image1} alt="land" className='img-fluid'onClick={Handlehome} />
                )
            }
           <div className="first-text">
            <p>Just In</p>
            <h1>NOTHING BEATS THE CITY</h1>
            <p>Built to overcome anything the city throws your way</p>
           <button className='shopbut' onClick={Handlehome}>Shop</button>
           </div>
        </div>
        <div className="second">
            <div className="text">
                <p>Featured</p>
            </div>
            <div className="shoecontent">
                <div className='image-container'>
                <img src={vomero1} alt="shoe" className='custom-img'/>
                <div className='shoe1'>
                    <p>Run in the Rain</p>
                    <p>Nike Vomero NBHD</p>
                    <button className='spanbut' onClick={()=>Handlefirst('Nike Vomero')}>Shop</button>
                </div>
                </div>
                <div className='image-container'>
                <img src={jordan2} alt="shoe" className='custom-img'/>
                <div className='shoe1'>
                    <p>Just In</p>
                    <p>Air Jordan SE GS</p>
                    <button className='spanbut' onClick={()=>Handlefirst('Air Jordan')}>Shop</button>
                </div>
                </div>
                 <div className='image-container'>
                <img src={city2} alt="shoe" className='custom-img'/>
                <div className='shoe1'>
                    <p>Just In</p>
                    <p>Nike City</p>
                    <button className='spanbut'onClick={()=>Handlefirst('Nike City')}>Shop</button>
                </div>
                </div>
            </div>
        </div>
        <div className="third">
          <div className="top ">
            <p>New Arrivals Just Landed</p>
            <div className="slide-button">
<div >
<IoIosArrowDropleft className='leftarrow' onClick={()=>handleScroll("left")}/>
</div>
<div >
<IoIosArrowDropright className='rightarrow' onClick={()=>handleScroll("right")}/>
</div>
            </div>
          </div>

          <div className="third-content">
            {products.map((item,index)=>(
            <div className="contents" key={index} onClick={()=>Handlebuy(item._id)}>
              <img src={item.image[0]} alt="im" className='shoe' />
              <div className="info">
                <p>{item.title}</p>
                <p className='light-p'>{item.category}</p>
                <p>MRP :₹{item.discountPrice}</p>
              </div>
            </div>
            ))}
          </div>
        </div>
        <div className="fourth">
          <p>Don't Miss</p>
          <video autoPlay loop muted  src={playback} className='playback-video '/>
          <div className="fourth-text">
            <h5>Air Jordan</h5>
            <h1>RIDE EASY</h1>
            <p>With this Air Jordan, tomorrow will be even faster </p>
            <button className='shopbut' onClick={()=> Handlefirst('Air Jordan')}>Shop</button>
          </div>
        </div>
        <div className="fifth">
          <div className="top">
          <p>Shop By Category</p>
            <div className="slide-button">
<div >
<IoIosArrowDropleft className='leftarrow' onClick={()=>handleScroll1("left")}/>
</div>
<div >
<IoIosArrowDropright className='rightarrow' onClick={()=>handleScroll1("right")}/>
</div>
            </div>
          </div>
          <div className="fcontent">
          <div className="fifthcontent">
            <img src={vomero} alt="im" className='catimg' />
            <button className='fifbut'  onClick={()=>Handlefirst("Nike Vomero")}>Vomero</button>
          </div>
          <div className="fifthcontent">
            <img src={city} alt="im" className='catimg' />
            <button className='fifbut' onClick={()=>Handlefirst("Nike City")}>City</button>
          </div>
          <div className="fifthcontent">
            <img src={jordan} alt="im" className='catimg' />
            <button className='fifbut' onClick={()=>Handlefirst("Air Jordan")}>Jordan</button>
          </div>
          <div className="fifthcontent">
            <img src={cloths} alt="im" className='catimg' />
            <button className='fifbut' onClick={()=>Handlefirst("Clothings")}>Cloths</button>
          </div>
          </div>
          
        </div>
        <div className="sixth">
          <div className="sixthone">
            <h5 onClick={seticon}>icons</h5>
            {showIcons && (
              <ul>
              <li>Air Force 1</li>
              <li>Huarache</li>
              <li>Air Max 90</li>
              <li>Air Max 95</li>
              <li>Air Max 97</li>
              <li>Air Max 270</li>
              <li>Air Max 720</li>
              <li>All Air Max</li>
              <li>VaporMax</li>
            </ul>
            )}
          </div>
          <div className="sixthone">
            <h5 onClick={setshoe}>Shoes</h5>
            {showshoe && (
              <ul>
              <li>All Shoes</li>
              <li>Custom Shoes</li>
              <li>Jordan Shoes</li>
              <li>Running Shoes</li>
              <li>Basketball Shoes</li>
              <li>Football Shoes</li>
              <li>Gym & Training Shoes</li>
              <li>LifeStyle Shoes</li>
            </ul>
            )}
          </div>
          <div className="sixthone">
            <h5 onClick={setcloth}> Clothing's</h5>
            {showcloth && (
              <ul>
              <li>All Clothing</li>
              <li>Modest Wear</li>
              <li>Hoodies & Pullovers</li>
              <li>Shirts & Tops</li>
              <li>Jackets</li>
              <li>Compression & Nike Pro</li>
              <li>Trousers & Leggings</li>
              <li>Shorts</li>
            </ul>
            )}
          </div>
          <div className="sixthone">
            <h5 onClick={setkid}>Kid's</h5>
            {showkid && (
              <ul>
              <li>Infant & Toddler Shoes</li>
              <li>Kid's Shoes</li>
              <li>Kid's Jordan Shoes</li>
              <li>Kid's Basketball Shoes</li>
              <li>Kid's Running Shoes</li>
              <li>Kid's Clothing</li>
              <li>Kid's Backpacks</li>
              <li>Kid's Socks</li>
            </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
