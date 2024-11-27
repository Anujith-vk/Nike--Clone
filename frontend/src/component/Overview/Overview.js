import React, { useEffect, useState } from 'react';
import '../Overview/Overview.css';
import shoe9 from '../Overview/green.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleerror, handlesuccess } from '../../Toast'
import { ToastContainer } from 'react-toastify';
const Overview = ({ id }) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`http://localhost:2000/product/overview/${id}`);
            if (response.data && response.data.product) {
                setShow(response.data.product);
                setMainImage(response.data.product.image && response.data.product.image[0]);
            }
        };
        fetchProduct();
    }, [id]);

    if (!show) {
        return <div>Loading...</div>;
    }

    const handleImageClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    const handleAddToCart = async () => {
        if (!selectedSize) {
            handleerror("Please Select a Size")
            return;
        }
        try {
            const token=localStorage.getItem('UserToken')
            const response = await axios.post(`http://localhost:2000/product/addtocart/${id}`, { size: selectedSize }, { headers: { Authorization: `Bearer ${token}`, }, });
            if (response) {
                handlesuccess(response.data.message)
                setTimeout(() => {
                    navigate("/cart");
                }, 2000);
            }
        } catch (error) {
            handleerror(error.response.data.message)
        }
    };
    const Handleliked =async ()=>{
        if (!selectedSize) {
            handleerror("Please Select a Size")
            return;
        }
        try {
            const token=localStorage.getItem('UserToken')
            const response = await axios.post(`http://localhost:2000/product/favorite/${id}`, { size: selectedSize }, { headers: { Authorization: `Bearer ${token}`, }, });
            if (response) {
                handlesuccess(response.data.message)
                setTimeout(() => {
                    navigate("/Liked");
                }, 2000);
            }
        } catch (error) {
            handleerror(error.response.data.message)
        }
    }

    return (
        <div className='overmain'>
            <div className="overleft">
                <div className="allimage">
                    {show.image && show.image.length > 0 && show.image.map((im, index) => (
                        <div className="mini" key={index}>
                            <img
                                src={im}
                                alt={`product-image-${index}`}
                                className='miniimage'
                                onClick={() => handleImageClick(im)}
                            />
                        </div>
                    ))}
                </div>
                <div className="mainimage">
                    <img src={mainImage || shoe9} alt="main-product" className='imageinmain' />
                </div>
            </div>
            <div className="overright">
                <div className="overtop">
                    <h5>{show.title}</h5>
                    <p>Gender: {show.gender}</p>
                    <p>MRP: ₹{show.discountPrice}</p>
                    <div className="dialouge">
                        <p>Incl of taxes</p>
                        <p>(Also includes all applicable duties)</p>
                    </div>
                </div>
                <div className="size">
                    {show.sizes && show.sizes.map((size, index) => (
                        <div
                            className={`minisize ${selectedSize === size ? 'selected' : ''}`}
                            key={index}
                            onClick={() => setSelectedSize(size)}
                        >
                            <p>{size}</p>
                        </div>
                    ))}
                </div>
                <div className="overbutton">
                    <button className='addtobag' onClick={handleAddToCart } style={{display:localStorage.getItem('AdminToken') ? 'none' :'block'}}>Add to Bag</button>
                    <button className='Favourite' onClick={Handleliked} style={{display:localStorage.getItem('AdminToken') ? 'none' :'block'}}>Favourite</button>
                </div>
                <div className="overdescription">
                    <p>{show.detail}</p>
                </div>
                <div className="high">
                    <h6>Highlights</h6>
                    <div className="overhighlight">
                        {show.highlights && show.highlights.length > 0 ? (
                            show.highlights.map((highlight, index) => (
                                <p key={index}>{highlight}</p>
                            ))
                        ) : (
                            <p>No highlights available</p>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Overview;
