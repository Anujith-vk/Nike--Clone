import React, { useState, useEffect } from 'react'
import '../Home/Header.css'
import axios from 'axios'
import { Link, Navigate, useLocation } from 'react-router-dom'

const Header = () => {
  const [fetcheddata, setfetcheddata] = useState([])
  const [close, setclose] = useState(false)
  const [gender, setgender] = useState(false)
  const [price, setprice] = useState(false)
  const [colours, setcolours] = useState(false)
  const [sports, setsports] = useState(false)
  const [dis, setdis] = useState(false)
  const [ssize,setssize]=useState(false)
  const [filterbutton,setfilterbutton]=useState(false)

  const HandleButton=()=>{
    const ischecked=document.querySelectorAll('input[type="checkbox]:checked')
    setfilterbutton(ischecked)
  }
  const Handlesize=()=>{
    setssize(!ssize)
  }
  const HandleSmart = () => {
    setdis(!dis)
  }
  const Handlesports = () => {
    setsports(!sports)
  }
  const Handlecolours = () => {
    setcolours(!colours)
  }
  const Handleprice = () => {
    setprice(!price)
  }
  const Handlegender = () => {
    setgender(!gender)
  }
  const Handlehide = () => {
    setclose(!close)
  }
   
  const location = useLocation();
  const selectedcategory = location.state?.selectedcategory;

  useEffect(() => {
    if (selectedcategory) {
    setfilter((prev) => ({...prev,category: [selectedcategory],}));
    }
  }, [selectedcategory]); 
 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2000/products/display");
        if (response.data && response.data.products) {
          setfetcheddata(response.data.products);
          setfiltereddata(response.data.products);
        } else {
          console.log("No products found in the response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const Handlecheckclear = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    if(checkboxes){
      setfilterbutton(false)
    }
  };
  const [filtereddata,setfiltereddata]=useState([])
  const [filter,setfilter]=useState({
    colors:[],
    gender:[],
    price:[],
    category:[],
  sizes:[]
  })

  const HandleColourChange= (color) => {
    HandleButton()
    setfilter((prev) => {
      const updatedColors = prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color]; 
      return { ...prev, colors: updatedColors };
    });
  };
  const Handlegenderchange=(g)=>{
    HandleButton()
    setfilter((prev)=>{
      const updategender=prev.gender.includes(g)
      ? prev.gender.filter((c)=>c !== g)
      : [...prev.gender,g];
      return{...prev, gender:updategender}
    });
  };


  const HandlepriceChange = (min, max) => {
    HandleButton()
    setfilter((prev) => {
      const isRangeSelected = prev.price.some((range) => range.min === min && range.max === max);
      const updatedPrice = isRangeSelected
        ? prev.price.filter((range) => range.min !== min || range.max !== max)
        : [...prev.price, { min, max }];
      return { ...prev, price: updatedPrice };
    });
  };

  const Handlectegoryfilter = (cat) => {
    HandleButton()
    setfilter((prev) => {
      const updatedCategory = prev.category.includes(cat)
        ? prev.category.filter((p) => p !== cat)
        : [...prev.category, cat];
      return { ...prev, category: updatedCategory };
    });
  };

  const Handlesizefilter=(size)=>{
    HandleButton()
    setfilter((prev)=>{
      const updatedsize= prev.sizes.includes(size)
      ? prev.sizes.filter((e)=> e!== size)
      : [...prev.sizes,size]
    return {...prev,sizes:updatedsize}
    })
  }

  const [sort, setSort] = useState("");  
  const Handlesortchange = (value) => {
    HandleButton()
    setSort(value); 
  };
  

const applyFilters = () => {
  let filtered = [...fetcheddata];
  if (filter.colors.length > 0) {
    filtered = filtered.filter((product) =>
      product.colors.some((color) => filter.colors.includes(color))
    );
  }
  if (filter.gender.length > 0) {
    filtered = filtered.filter((product) =>
      filter.gender.includes(product.gender)
    );
  }
  if(filter.price.length>0){
    filtered=filtered.filter((product)=>
      filter.price.some((range)=>product.discountPrice>=range.min&&product.price<=range.max)
    );
  }
  if (filter.category.length > 0) {
    filtered = filtered.filter((product) =>
      filter.category.includes(product.category)
    );
  }
  if(filter.sizes.length>0)
  {
    filtered=filtered.filter((product)=>
    product.sizes.some((size)=>filter.sizes.includes(size))
    );
  }
  if (sort === "1") {
    filtered = [...filtered].reverse()
  } else if (sort === "2") {
    filtered = filtered.sort((a, b) => b.discountPrice - a.discountPrice);
  } else if (sort === "3") {
    filtered = filtered.sort((a, b) => a.discountPrice - b.discountPrice);
  }
  setfiltereddata(filtered);
};
  
   useEffect(() => {
   applyFilters()
   }, [filter,sort,fetcheddata])
   
   const Filterclear=()=>{
    setfilter({colors:[],gender:[],price:[],category:[],sizes:[]})
    setSort('')
  }

  return (

    <div className='homefirst'>
      <div className="topfirst">
        <p>Nike By You  ({filtereddata.length})</p>
        <div className="right">
          <div className="rightendone " onClick={Handlehide}>
            <p>{close ? 'Show Filters' : 'Hide Filters'}</p>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M710-150q-63 0-106.5-43.5T560-300q0-63 43.5-106.5T710-450q63 0 106.5 43.5T860-300q0 63-43.5 106.5T710-150Zm0-80q29 0 49.5-20.5T780-300q0-29-20.5-49.5T710-370q-29 0-49.5 20.5T640-300q0 29 20.5 49.5T710-230Zm-550-30v-80h320v80H160Zm90-250q-63 0-106.5-43.5T100-660q0-63 43.5-106.5T250-810q63 0 106.5 43.5T400-660q0 63-43.5 106.5T250-510Zm0-80q29 0 49.5-20.5T320-660q0-29-20.5-49.5T250-730q-29 0-49.5 20.5T180-660q0 29 20.5 49.5T250-590Zm230-30v-80h320v80H480Zm230 320ZM250-660Z" /></svg>
          </div>
          <div className="rightlast">
            <p>Sort by</p>
            <select name="Sort By" className='sort' onChange={(e)=>Handlesortchange(e.target.value)}>
              <option value="">Select Options</option>
              <option value="1" >
                Newest
              </option>
              <option value="2" >
                Price:High-Low
              </option>
              <option value="3" >
                Price:Low-High
              </option>
            </select>
          </div>
          <div className="rightlasthide" onClick={HandleSmart}>
            <p>Filter</p>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M710-150q-63 0-106.5-43.5T560-300q0-63 43.5-106.5T710-450q63 0 106.5 43.5T860-300q0 63-43.5 106.5T710-150Zm0-80q29 0 49.5-20.5T780-300q0-29-20.5-49.5T710-370q-29 0-49.5 20.5T640-300q0 29 20.5 49.5T710-230Zm-550-30v-80h320v80H160Zm90-250q-63 0-106.5-43.5T100-660q0-63 43.5-106.5T250-810q63 0 106.5 43.5T400-660q0 63-43.5 106.5T250-510Zm0-80q29 0 49.5-20.5T320-660q0-29-20.5-49.5T250-730q-29 0-49.5 20.5T180-660q0 29 20.5 49.5T250-590Zm230-30v-80h320v80H480Zm230 320ZM250-660Z" /></svg>
          </div>
        </div>
      </div>
      <div className="homebody">
        <div className={`homesidebar ${close ? 'close' : ''}`}>
          <div className="sidebarfirst">
            <p>lifestyle</p>
            <p>Nike By You</p>
          </div>
          <div className="sidebarsecond">
            <div className="secondefirst" onClick={Handlegender}>
              <h6 >Gender</h6>
              {gender ?
                <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" /></svg></p>
                :
                <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg></p>
              }

            </div>
            {gender && <>             <div className="scondinputlabel">
              <input type='checkbox' onChange={()=>Handlegenderchange("Men")}/>
              <h6>Men</h6>
            </div>
              <div className="scondinputlabel">
                <input type='checkbox'  onChange={()=>Handlegenderchange("Women")} />
                <h6>Women</h6>
              </div>
              <div className="scondinputlabel">
                <input type='checkbox'  onChange={()=>Handlegenderchange("Unisex")} />
                <h6>Unisex</h6>
              </div>

            </>

            }
          </div>
          <div className="sidebarsecond">
            <div className="secondefirst" onClick={Handleprice}>
              <h6 >Shop By Price</h6>
              {price ?
                <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" /></svg></p>
                :
                <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg></p>
              }

            </div>
            {price &&
              <>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=> HandlepriceChange(2501,7500)}/>
                  <h6>₹2501-7500</h6>
                </div>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=> HandlepriceChange(7501,12999)} />
                  <h6>₹7501-12999</h6>
                </div>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=> HandlepriceChange(13000,Infinity)}/>
                  <h6> Over 13000</h6>
                </div>
              </>

            }
          </div>
          <div className="sidebarsecond">
            <div className="secondefirst" onClick={Handlecolours}>
              <h6 >Colours </h6>
              {colours ?
                <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" /></svg></p>
                :
                <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg></p>
              }

            </div>
            {colours &&
              <div className='colourcollection'>
                <div className="scondinputlabelcolour">
                  <input type='checkbox' className='colourbox1' onChange={()=>HandleColourChange("Black")}/>
                  <h6>Black</h6>
                </div>
                <div className="scondinputlabelcolour">
                  <input type='checkbox' className='colourbox2' onChange={()=>HandleColourChange("Blue")} />
                  <h6>Blue</h6>
                </div>
                <div className="scondinputlabelcolour">
                  <input type='checkbox' className='colourbox3' onChange={()=>HandleColourChange("Brown")} />
                  <h6>Brown</h6>
                </div>
                <div className="scondinputlabelcolour">
                  <input type='checkbox' className='colourbox4' onChange={()=>HandleColourChange("Green")} />
                  <h6>Green</h6>
                </div>
                <div className="scondinputlabelcolour">
                  <input type='checkbox' className='colourbox5' onChange={()=>HandleColourChange("Grey")} />
                  <h6>Grey</h6>
                </div>
                <div className="scondinputlabelcolour">
                  <input type='checkbox' className='colourbox6' onChange={()=>HandleColourChange("White")} />
                  <h6>White</h6>
                </div>
                <div className="scondinputlabelcolour">
                  <input type='checkbox' className='colourbox7' onChange={()=>HandleColourChange("Yellow")} />
                  <h6>Yellow</h6>
                </div>
                <div className="scondinputlabelcolour">
                  <input type='checkbox' className='colourbox8' onChange={()=>HandleColourChange("Red")} />
                  <h6>Red</h6>
                </div>
              </div>

            }
          </div>
          <div className="sidebarsecond">
            <div className="secondefirst" onClick={Handlesports}>
              <h6 >Category</h6>
              {sports ?
                <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" /></svg></p>
                :
                <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg></p>
              }

            </div>
            {sports &&
              <>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=>Handlectegoryfilter("Air Jordan")} />
                  <h6>Air Jordan</h6>
                </div>
                <div className="scondinputlabel" >
                  <input type='checkbox' onChange={()=>Handlectegoryfilter("Nike City")}/>
                  <h6>Nike City</h6>
                </div>
                <div className="scondinputlabel"  >
                  <input type='checkbox' onChange={()=>Handlectegoryfilter("Nike Vomero")} />
                  <h6>Nike Vomero</h6>
                </div>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=>Handlectegoryfilter("Clothings")} />
                  <h6>Clothings</h6>
                </div>
              </>

            }
          </div>
          <div className="sidebarsecond">
            <div className="secondefirst" onClick={Handlesize}>
              <h6 >Size</h6>
              {ssize ?
                <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" /></svg></p>
                :
                <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg></p>
              }

            </div>
            {ssize &&
              <>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=>Handlesizefilter("5")} />
                  <h6>5</h6>
                </div>
                <div className="scondinputlabel" >
                  <input type='checkbox' onChange={()=>Handlesizefilter("6")}/>
                  <h6>6</h6>
                </div>
                <div className="scondinputlabel"  >
                  <input type='checkbox' onChange={()=>Handlesizefilter("7")} />
                  <h6>7</h6>
                </div>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=>Handlesizefilter("8")} />
                  <h6>8</h6>
                </div>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=>Handlesizefilter("9")} />
                  <h6>9</h6>
                </div>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=>Handlesizefilter("10")} />
                  <h6>10</h6>
                </div>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=>Handlesizefilter("11")} />
                  <h6>11</h6>
                </div>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=>Handlesizefilter("12")} />
                  <h6>12</h6>
                </div>
                <hr />
                <p>For Cloths</p>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=>Handlesizefilter("S")} />
                  <h6>S</h6>
                </div>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=>Handlesizefilter("M")} />
                  <h6>M</h6>
                </div>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=>Handlesizefilter("L")} />
                  <h6>L</h6>
                </div>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=>Handlesizefilter("XL")} />
                  <h6>XL</h6>
                </div>
                <div className="scondinputlabel">
                  <input type='checkbox' onChange={()=>Handlesizefilter("XXL")} />
                  <h6>XXL</h6>
                </div>
              </>

            }
          </div>
        </div>
        <div className="remaining">
          {filtereddata && filtereddata.map((option, index) => (
            <div className="showingcontent" key={index} >
              <Link to={`/Product/${option._id}`}>
              <img src={option.image[0]} alt={option.title} />
              </Link>
              <div className="showingcontentnp">
                <p>{option.title}</p>
                <p>{option.detail.slice(0, 25) + "...."}</p>
                <p>colors: {option.colors.length}</p>
                <p className='originalprice'>MRP:₹{option.price}</p>
                <p>MRP:₹ {option.discountPrice}</p>
              </div>
            </div>
          ))
          }
        </div>
      </div>
      <div className={`smartphonesidebar ${dis ? 'show' : ''}`}>
        <div className="smarttop">
          <p>Filter</p>
          <svg onClick={HandleSmart} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
        </div>
        <div className="smartsort">
  <p>Sort By</p>
  <div className="smartsort1">
    <input 
      type="radio" 
      name="sortOption" 
      id="featuredAgain" 
      value="1" 
      onChange={(e) => Handlesortchange(e.target.value)} 
    />
    <label htmlFor="featuredAgain">Newest</label>
  </div>
  <div className="smartsort1">
    <input 
      type="radio" 
      name="sortOption" 
      id="priceHighLow" 
      value="2" 
      onChange={(e) => Handlesortchange(e.target.value)} 
    />
    <label htmlFor="priceHighLow">Price: High-Low</label>
  </div>
  <div className="smartsort1">
    <input 
      type="radio" 
      name="sortOption" 
      id="priceLowHigh" 
      value="3" 
      onChange={(e) => Handlesortchange(e.target.value)} 
    />
    <label htmlFor="priceLowHigh">Price: Low-High</label>
  </div>
</div>
        <div className="smart1">
          <p>Gender</p>
          <div className="smartcheck">
            <input type='checkbox' id='men' onChange={()=>Handlegenderchange("Men")}/>
            <label htmlFor="men">Men</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='women' onChange={()=>Handlegenderchange("Women")}/>
            <label htmlFor="women">Women</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='unisex' onChange={()=>Handlegenderchange("Unisex")} />
            <label htmlFor="unisex">Unisex</label>
          </div>
        </div>
        <div className="smart1">
          <p>Shop By Price</p>
          <div className="smartcheck">
            <input type='checkbox' id='second' onChange={()=> HandlepriceChange(2501,7500)} />
            <label htmlFor="second">2501.00 - 7500.00</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='third' onChange={()=> HandlepriceChange(7501,12999)}/>
            <label htmlFor="third">7501.00 - 12999</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='fourth' onChange={()=> HandlepriceChange(13000,Infinity)} />
            <label htmlFor="fourth">Over 13000.00</label>
          </div>
        </div>
        <div className="smartcolour">
          <p>Colour</p>
          <div className='colourcollection'>
            <div className="scondinputlabelcolour">
              <input type='checkbox' className='colourbox1' onChange={()=>HandleColourChange("Black")} />
              <h6>Black</h6>
            </div>
            <div className="scondinputlabelcolour">
              <input type='checkbox' className='colourbox2' onChange={()=>HandleColourChange("Blue")} />
              <h6>Blue</h6>
            </div>
            <div className="scondinputlabelcolour">
              <input type='checkbox' className='colourbox3' onChange={()=>HandleColourChange("Brown")} />
              <h6>Brown</h6>
            </div>
            <div className="scondinputlabelcolour">
              <input type='checkbox' className='colourbox4' onChange={()=>HandleColourChange("Green")} />
              <h6>Green</h6>
            </div>
            <div className="scondinputlabelcolour">
              <input type='checkbox' className='colourbox5' onChange={()=>HandleColourChange("Grey")} />
              <h6>Grey</h6>
            </div>
            <div className="scondinputlabelcolour">
              <input type='checkbox' className='colourbox6' onChange={()=>HandleColourChange("White")} />
              <h6>White</h6>
            </div>
            <div className="scondinputlabelcolour">
              <input type='checkbox' className='colourbox7' onChange={()=>HandleColourChange("Yellow")} />
              <h6>Yellow</h6>
            </div>
            <div className="scondinputlabelcolour">
              <input type='checkbox' className='colourbox8' onChange={()=>HandleColourChange("Red")} />
              <h6>Red</h6>
            </div>
          </div>
        </div>
        <div className="smart1">
          <p>Categories</p>
          <div className="smartcheck">
            <input type='checkbox' id='second' onChange={()=>Handlectegoryfilter("Air Jordan")} />
            <label htmlFor="second">Air Jordan</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='third' onChange={()=>Handlectegoryfilter("Nike City")}/>
            <label htmlFor="third">Nike City</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='fourth' onChange={()=>Handlectegoryfilter("Nike Vomero")} />
            <label htmlFor="fourth">Nike Vomero</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='fourth' onChange={()=>Handlectegoryfilter("Clothing")} />
            <label htmlFor="fourth">Clothing</label>
          </div>
        </div>
        <div className="smart1">
          <p>Size</p>
          <div className="smartcheck">
            <input type='checkbox' id='first6'  onChange={()=>Handlesizefilter("5")} />
            <label htmlFor="first6">5</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='first7'  onChange={()=>Handlesizefilter("6")} />
            <label htmlFor="first7">6</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='first8'  onChange={()=>Handlesizefilter("7")} />
            <label htmlFor="first8">7</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='first9'  onChange={()=>Handlesizefilter("8")} />
            <label htmlFor="first9">8</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='first10'  onChange={()=>Handlesizefilter("9")} />
            <label htmlFor="first10">9</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='first11'  onChange={()=>Handlesizefilter("10")} />
            <label htmlFor="first11">10</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='first12'  onChange={()=>Handlesizefilter("11")} />
            <label htmlFor="first12">11</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='first13'  onChange={()=>Handlesizefilter("12")} />
            <label htmlFor="first13">12</label>
          </div>
          <hr />
          <p>For Cloths</p>
          <div className="smartcheck">
            <input type='checkbox' id='firsts'  onChange={()=>Handlesizefilter("S")} />
            <label htmlFor="firsts">S</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='firstm'  onChange={()=>Handlesizefilter("M")} />
            <label htmlFor="firstm">M</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='firstl'  onChange={()=>Handlesizefilter("L")} />
            <label htmlFor="firstl">L</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='firstxl'  onChange={()=>Handlesizefilter("XL")} />
            <label htmlFor="firstxl">XL</label>
          </div>
          <div className="smartcheck">
            <input type='checkbox' id='firsts'  onChange={()=>Handlesizefilter("XXL")} />
            <label htmlFor="firsts">XXL</label>
          </div>
        </div>
        <div className="smartslidebutton">
          <div className={`twosmartslidebut ${filterbutton ? 'show' :''}`}>
            <button className='smartbut1' onClick={HandleSmart}>Apply Filters</button>
            <button className='smartbut2' onClick={()=>{HandleSmart();Handlecheckclear();Filterclear()}}>Clear Filters</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header