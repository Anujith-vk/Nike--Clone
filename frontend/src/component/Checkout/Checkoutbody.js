import React, { useEffect, useState } from 'react';
import './Checkoutbody.css'
import axios from 'axios'
import { handleerror, handlesuccess } from '../../Toast'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Checkoutbody = () => {
  const [products, setProducts] = useState([]);
  const [form, setform] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    alternativenumber: '',
    email: '',
    address: '',
    pincode: ''
});
const navigate=useNavigate()

  const fetchProducts = async () => {
    const token = localStorage.getItem('UserToken');
    try {
      const response = await axios.get('https://nike-clone-3etr.onrender.com/product/cart/items', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response && response.data.details) {
        setProducts(response.data.details);
      }
    } catch (error) {
      handleerror(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const calculateSubtotal = () => {
    return products.reduce((total, item) => {
      return total + (item.product.discountPrice * item.quantity);
    }, 0);
  };
  const calculateDelivery = () => {
    const total = calculateSubtotal();
    return (total / 100) * 5;
  };
  const calculateTotalMRP = () => {
    const total = calculateSubtotal();
    const delivery = calculateDelivery();
    return total + delivery;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform((prevdata) => ({
      ...prevdata,
      [name]: value 
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  const orderData = {...form,
    Subtotal: calculateTotalMRP(),
    delivery_charge: calculateDelivery(),
    total: calculateSubtotal(),
    products:products.map(item => ({product: item.product._id,quantity: item.quantity,size: item.size}))
  };
  try {
      const token = localStorage.getItem('UserToken');
      const response = await axios.post('https://nike-clone-3etr.onrender.com/product/order', orderData, {
          headers: { Authorization: `Bearer ${token}` }
      });
      if (response) {
        handlesuccess(response.data.message)
        localStorage.setItem('cartReset', 'true');
        setTimeout(() => {
          navigate('/Orders')
        }, 1200);
      } 
  } catch (error) {
      handleerror(error.response.data.message);
  }
};
  return (
    <div className="checkmain">
      <form className="checkform" onSubmit={handleSubmit}>
        <div className="checkformtitle">
         <h5>Enter Your Name And Address</h5>
         <input type="text" placeholder='Enter Your First Name' name='firstname' value={form.firstname}   onChange={handleChange}/>
         <input type="text"  placeholder='Enter Your Lastname' name='lastname' value={form.lastname} onChange={handleChange}/>
         <input type="text" placeholder='Enter Your Mobile Number'name='phone' value={form.phone} onChange={handleChange} />
         <input type="text" placeholder='Enter Alternative Number' name='alternativenumber' value={form.alternativenumber} onChange={handleChange}/>
         <input type='email' placeholder='Enter Your Email Id' name='email' value={form.email} onChange={handleChange} />
         <input type="text" placeholder='Enter Your Address' name='address' value={form.address} onChange={handleChange}/>
         <input type="text" placeholder='Enter Your PinCode'name='pincode' value={form.pincode} onChange={handleChange}/>
         <button className='orderplacebutton' type='submit'>Place Order</button>
        </div>
      </form>
      <div className="checksum">
        <div className="checksumtop">
          <h5>Summary</h5>
          <p>Subtotal: ₹{calculateSubtotal()}</p>
          <p>Delivery: ₹{(calculateDelivery())}</p>
          <p>Total: ₹{calculateTotalMRP()}</p>
          <hr />
        </div>
        {products && products.length > 0 ? (
          products.map((item, index) => (
            <div className="imagesum" key={index}>
              <img src={item.product.image[0]} alt={item.product.title} className="sumimg" />
              <div className="sumdetails">
                <h5>{item.product.title}</h5>
                <p>{item.product.category}</p>
                <p>Size: {item.size}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No Products</p>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Checkoutbody;
