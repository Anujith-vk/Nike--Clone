import React, { useEffect, useState } from 'react';
import '../Cart/Cartbody.css';
import { ImBin } from "react-icons/im";
import axios from 'axios';
import { handleerror } from '../../Toast';
import { useNavigate } from 'react-router-dom';

const Cartbody = () => {
    const navigate = useNavigate();
    const [products, setProduct] = useState([]);
    const [count, setCount] = useState({});  
    const fetchProducts = async () => {
        try {
            const token =  localStorage.getItem('UserToken');
            const response = await axios.get('https://nike-clone-3etr.onrender.com/product/cart/items', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response && response.data.details) {
                setProduct(response.data.details);
            } else {
                handleerror("No cart items found");
            }
        } catch (error) {
            handleerror("Error fetching cart items"); 
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleRemoveItem = async (productId) => {
        try {
            const token = localStorage.getItem('UserToken');
            const response = await axios.delete(`https://nike-clone-3etr.onrender.com/product/cart/delete/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setProduct(prevProducts => prevProducts.filter(item => item._id !== productId));
                setCount(prevCount => {
                    const newCount = { ...prevCount };
                    delete newCount[productId];
                    return newCount;
                });
            } else {
                handleerror("Failed to Delete Item");
            }
        } catch (error) {
            handleerror("Error removing item from cart");
        }
    };

    const handleCountChange = async (e, productId) => {
        const { value } = e.target;
        const newQuantity = Number(value);
        setCount(prevCount => ({ ...prevCount, [productId]: newQuantity }));

        try {
            const token = localStorage.getItem('UserToken');
            const response = await axios.put(`https://nike-clone-3etr.onrender.com/product/cart/update/${productId}`, { quantity: newQuantity }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response) {
            }
        } catch (error) {
            handleerror(error.response?.data?.message || "Error updating cart item quantity");
        }
    };

     const calculatesubtotal = () => {
        return products.reduce((total, item) => {
            const productCount = count[item._id] || 1;
            return total + (item.product.discountPrice * productCount);
        }, 0);
    };
    const calculateDelivery = () => {
        const total = calculatesubtotal();
        return (total / 100) * 5; 
    };
    const calculateTotalMRP = () => {
        const total = calculatesubtotal();
        const delivery = calculateDelivery();
        return total + delivery;
    };
    const Handlecheckout = () => {
        navigate('/product/checkout');
    };
const Clearcart=async ()=>{
    try {
        const token=localStorage.getItem('UserToken')
        const response=await axios.delete('https://nike-clone-3etr.onrender.com/product/cart/delete',{headers : {Authorization :`Bearer ${token}`}})
    } catch (error) {
        handleerror(error.response.data.message)
    }
}
    useEffect(() => {
        const cartResetFlag = localStorage.getItem('cartReset');
        if (cartResetFlag === 'true') {
           Clearcart()
           localStorage.removeItem('cartReset')
        } 
        fetchProducts()
    }, []);

    return (
        <div className="cartmain">
            <div className="cartleft">
                <h5>Bag</h5>
                   
               {products && products.length > 0 ? (
                    products.map((item) => (
                        <div className="cartdisplay" key={item._id}>
                            <img src={item.product.image[0]} alt="Product" className="disimage" />
                            <div className="cartdisplaycontent">
                                <div className="cartdisplayconttop">
                                    <h6>{item.product.title}</h6>
                                    <p>MRP: ₹{item.product.discountPrice}</p>
                                </div>
                                <p>{item.product.category}</p>
                                <p>Size: {item.size}</p>
                                <p className="sell">
                                    Qty: 
                                    <input 
                                        type="number" 
                                        min="1" 
                                        className="selectcart" 
                                        value={count[item._id] || 1} 
                                        onChange={(e) => handleCountChange(e, item._id)}  
                                    />
                                </p>
                                <ImBin onClick={() => handleRemoveItem(item._id)} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products in the cart.</p>
                )}
            </div>
            <div className="cartright">
                <h5>Summary</h5>
                <div className="cartrightmain">
                    <div className="cartsub">
                        <p>Subtotal</p>
                        <p>₹{calculatesubtotal()}</p>
                    </div>
                    <div className="cartsub">
                        <p>Estimated Delivery & Handling</p>
                        <p>₹{calculateDelivery()}</p>
                    </div>
                    <div className="cartsub">
                        <p>Total</p>
                        <p>₹{calculateTotalMRP()}</p>
                    </div>
                    <div className="crbutton">
                        <button onClick={Handlecheckout} disabled={products.length===0}>Member Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cartbody;
