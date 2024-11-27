import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import {handleerror} from '../../Toast'
const Orderstatus = () => {
  const[orders,setorders]=useState([])
  const fetchorder=async ()=>{
    try {
        const token=localStorage.getItem('UserToken')
        const response=await axios.get('https://nike-clone-3etr.onrender.com/user/orders',{headers :{Authorization :`Bearer ${token}`}})
        if(response){
          const filtered = response.data.products.map(order => {const filteredProducts = order.products.filter(product => product.status !== 'Cancelled' )
            return { ...order, products: filteredProducts };
          });
            setorders(filtered)
        }
    } catch (error) {
        handleerror(error.response.data.message)
    }
  }
 
  const Handlecancel = async (id, product, status) => {
    try {
        console.log("Sending data:", { id, product, status });
        const token = localStorage.getItem('UserToken');
        const response = await axios.put(
            `https://nike-clone-3etr.onrender.com/Admin/Orders/view/${id}/product/${product}`,
            { status },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response) {
            fetchorder();
        }
    } catch (error) {
        handleerror(error.response?.data?.message || "An error occurred");
    }
};


  useEffect(() => {
  fetchorder()
  }, [])

  return (
<div className='Likedmain2'>
    {orders && orders.length>0 ? (orders.flatMap((item,index)=>(item.products.map((products,proindex)=>(
      <div className="likedmainbody2" key={`${index}-${proindex}`}>
        <img src={products.product.image[0]} alt="test" className='showimg' />
        <div className="likedesc2">
          <div className="toplike">
          <h5>{products.product.title}</h5>
          </div>
          <p>{products.product.category}</p>
          <p>size: {products.size}</p>
          <p>Qty: {products.quantity}</p>
          <p>MRP:₹ {products.product.discountPrice}</p>
          <p>Subtotal:₹ {products.product.discountPrice*products.quantity}</p>
          <p>Delivery & Shipping:₹ {((products.product.discountPrice*products.quantity)/100)*5} </p>
          <p>Total:₹ {products.product.discountPrice*products.quantity+((products.product.discountPrice*products.quantity)/100)*5}</p>
          <p className={products.status === 'Dispatching' ? 'dispatching' : products.status === 'Shipped' ? 'shipped' : products.status === 'Rejected' ? 'rejected' : 'delivered'}>Status: {products.status}</p>
          <button className='addcbut' onClick={()=>Handlecancel(item._id,products._id,"Cancelled")} style={{display:products.status==='Delivered'||products.status==='Rejected' ? 'none' : 'block'}} >Cancel Order</button>
        </div>
      </div>
      ))))):(<p>No Orders</p>)}
      <ToastContainer/>
    </div>
  )
}

export default Orderstatus
