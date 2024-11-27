import React, { useEffect, useState } from 'react'
import './Likedbody.css'
import { handleerror, handlesuccess } from '../../Toast'
import axios from 'axios'
import { ImBin } from "react-icons/im";
import { ToastContainer } from 'react-toastify';
const Likedbody = () => {
  const[products,setproducts]=useState([])
  const fetchproducts=async ()=>{
    try {
        const token=localStorage.getItem('UserToken')
        const response=await axios.get('https://nike-clone-3etr.onrender.com/product/favorite/display',{headers :{Authorization :`Bearer ${token}`}})
        if(response && response.data.details)
        {
          setproducts(response.data.details)
        }
    } catch (error) {
      handleerror(error.response.data.message)
    }
  }
  useEffect(() => {
   fetchproducts()  
  }, [])
  const Handlecart=async (item_id,id,selectedSize)=>{
  try {
       const token=localStorage.getItem('UserToken')
      const respose=await axios.post(`https://nike-clone-3etr.onrender.com/product/addtocart/${id}`,{size:selectedSize},{headers :{Authorization :`Bearer ${token}`}})
      if(respose){
        handlesuccess( respose.data.message)
        Handledelete(item_id)
      }
  } catch (error) {
    handleerror(error.response.data.message)
  }
  }
  const  Handledelete=async (id)=>{
  try { 
        const token=localStorage.getItem('UserToken')
        const response=await axios.delete(`https://nike-clone-3etr.onrender.com/product/favourite/delete/${id}`,{headers :{Authorization :`Bearer ${token}`}})
        if(response)
        {
          setproducts((products)=>products.filter((product)=>product._id !== id))
        }
  } catch (error) {
    handleerror(error.response.data.message)
  }
  }
  return (
    <div className='Likedmain'>
      {products  && products.length > 0 ? (products.map((item,index)=>(
      <div className="likedmainbody" key={index}>
        <img src={item.product.image[0]} alt="test" className='showim' />
        <div className="likedesc">
          <div className="toplike">
          <h5>{item.product.title}</h5>
          <ImBin onClick={()=>Handledelete(item._id)}/>
          </div>
          <p>{item.product.category}</p>
          <p>size:{item.size}</p>
          <p>MRP:₹{item.product.discountPrice}</p>
          <button className='addcbut' onClick={()=>Handlecart(item._id,item.product._id,item.size)}>Add To Cart</button>
        </div>
      </div>
      ))):(<p>No Favorite Item</p>) }
      <ToastContainer/>
    </div>
  )
}

export default Likedbody
