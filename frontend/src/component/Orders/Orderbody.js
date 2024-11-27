import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import { handleerror, handlesuccess } from '../../Toast'
import './Orderbody.css'

const Orderbody = () => {
  const [orders, setorders] = useState([])

  const fetchorders = async () => {
    try {
      const token = localStorage.getItem('AdminToken')
      const response = await axios.get('https://nike-clone-3etr.onrender.com/orders/list', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.details) {
        const filteredOrders = response.data.details.map(order => {const filteredProducts = order.products.filter(product => product.status !== 'Delivered' && product.status !== 'Rejected' );
          return { ...order, products: filteredProducts };
        });
        setorders(filteredOrders);
      }
    } catch (error) {
      handleerror(error.response.data.message)
    }
  }

  const Handlestatus = async (id,product,status) => {
    try {
        const token = localStorage.getItem('AdminToken');
        const response = await axios.put(
            `https://nike-clone-3etr.onrender.com/Admin/Orders/view/${id}/product/${product}`,
            { status },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response) {
            handlesuccess(response.data.message);
            fetchorders();
        }
    } catch (error) {
        handleerror(error.response?.data?.message || "An error occurred");
    }
};
const Handledelete=async (id,productid)=>{
try {
  const token = localStorage.getItem('AdminToken');
  const response=await axios.delete(`https://nike-clone-3etr.onrender.com/order/delete/${id}/product/${productid}`,{headers : {Authorization :`Bearer ${token}`}})
  if(response.status===200)
  {
    fetchorders()
  }
} catch (error) {
  handleerror(error.response.data.message||"An error occured")
}
}
useEffect(() => {
  fetchorders()
}, [])

  return (
    <div className='Likedmain'>
      {orders && orders.length > 0 ? (
        orders.flatMap((item, index) =>
          item.products.map((product, prodIndex) => (
            <div className="ordermainbody" key={`${index}-${prodIndex}`}>
              <div className="likedesc">
                <img
                  src={product.product.image[0]}  
                  alt={product.product.title}
                  className='showim'
                />
                <div className="toporder">
                  <h5>{product.product.title}</h5>
                    <RiDeleteBin6Line className='bin' style={{display:product.status === 'Cancelled' ? 'block' :'none'}} onClick={()=>Handledelete(item._id,product._id)}/>
                </div>
                <p>{product.product.category}</p>
                <p>Size: {product.size}</p>
                <p>MRP: ₹{product.product.discountPrice}</p>
                <p>Qty: {product.quantity}</p>
                <div className="butdiv">
                  <button className='addcbut' onClick={()=>Handlestatus(item._id,product._id,"Shipped")}>Shipped</button>
                  <button className='addcbut' onClick={()=>Handlestatus(item._id,product._id,"Delivered")}>Delivered</button>
                  <button className='addcbut' onClick={()=>Handlestatus(item._id,product._id,"Rejected")}>Reject</button>
                </div>
              </div>
              <div className="addr">
                <p>Name: {item.name.firstname} {item.name.lastname}</p>
                <p>Phone Number: {item.phone}</p>
                <p>Email: {item.email}</p>
                <p>Address: {item.address}</p>
                <p>Pin Code: {item.pincode}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Subtotal: ₹ {product.product.discountPrice*product.quantity}</p>
                <p>Delivery & shipping : ₹ {(product.product.discountPrice/100)*5}</p>
                <p>Total: ₹ {(product.product.discountPrice/100)*5 + product.product.discountPrice*product.quantity}</p>
                <p className={product.status ==='Shipped' ? 'status-shipped' : product.status === 'Cancelled' ? 'cancelled':'status-dispatch'}>
                Status: {product.status}</p>
              </div>
            </div>
          ))
        )
      ) : (
        <p>No Orders</p>
      )}
      <ToastContainer />
    </div>
  )
}

export default Orderbody
