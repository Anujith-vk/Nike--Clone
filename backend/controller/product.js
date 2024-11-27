const { ProductSchema, Userschema, CartSchema, LikedSchema, OrderSchema } = require('../Schema/schema');
const cloudinary = require('cloudinary').v2; 
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const CreateProduct = async function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "All images are required." });
    }
    const { image1, image2, image3, image4, image5 } = req.files;
    const allowedFormats = ['image/png', 'image/jpeg', 'image/webp', 'image/jpg'];
    const images = [image1, image2, image3, image4, image5];
    for (let image of images) {
        if (image && !allowedFormats.includes(image.mimetype)) {
            return res.status(400).json({ message: `File format not supported for ${image.name}.` });
        }
    }
    try {
        const {
            title,
            detail,
            price,
            discount,
            sizes,
            colors,
            category,
            stock,
            rating,
            origin,
            gender,
            highlights,
        } = req.body;
        if (!title || !detail || !price || !discount || !sizes || !colors || !stock || !origin || !highlights) {
            return res.status(400).json({ message: "Please fill all the fields." });
        }
        const imageUrls = [];
        const uploadImage = async (image) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(image.tempFilePath, (error, result) => {
                    if (error) {
                        reject(error); 
                    } else {
                        resolve(result.secure_url); 
                    }
                });
            });
        };
        for (let image of images) {
            if (image) {
                try {
                    const url = await uploadImage(image);
                    imageUrls.push(url);
                } catch (err) {
                    return res.status(500).json({ message: "Image upload failed.", error: err.message });
                }
            }
        }
        const afterDiscount = Math.round(price * (1 - discount / 100));
        const product = await ProductSchema.create({
            title,
            detail,
            price,
            discount,
            sizes,
            colors,
            category,
            stock,
            rating,
            origin,
            image: imageUrls,
            gender,
            highlights,
            discountPrice: afterDiscount,
        });

        return res.status(200).json({ message: "Product added successfully", product });

    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occurred", error: error.message });
    }
};

const GetAllProducts= async function (req,res) {
    try {
        const products= await ProductSchema.find({})
        if(!products)
        {
            return res.status(400).json({message:"Products are Empty",products})
        }
        else{
            return res.status(200).json({message:"Products Fetched Successfully",products})
        }
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occurred", error: error.message });
    }
}

const UpdateProductbyId=async function (req,res) {
    const { id } = req.params;
    const {
        title,
        detail,
        price,
        discount,
        sizes,
        colors,
        category,
        kids,
        stock,
        rating,
        origin,
        declaration,
        marketedby,
        image,
        gender,
        highlights,
    } = req.body;
    try{
    if (!title || !detail || !price || !discount || !sizes || !colors ||  !stock || !origin || !declaration || !marketedby || !image || !highlights) {
        return res.status(400).json({ message: "Please fill all the fields." });
    }
    else{
    const afterDiscount = Math.round(price * (1 - discount / 100));
    const product = await ProductSchema.findByIdAndUpdate(id,{
        title,
        detail,
        price,
        discount,
        sizes,
        colors,
        category,
        kids,
        stock,
        rating,
        origin,
        declaration,
        marketedby,
        image,
        gender,
        highlights,
        discountPrice: afterDiscount  
    },{new:true});
    return res.status(200).json({ message: "Product Updated successfully", product });
}
} catch (error) {

    return res.status(500).json({ message: "Unexpected error occurred", error: error.message });
}
}

const DeleteProductbyId=async function (req,res) {
    const { id } = req.params;
    try {
        const data=await ProductSchema.findByIdAndDelete(id)
        if(!data)
        {
            return res.status(400).json({message:"No Data Found"})
        }
        else
        {
            return res.status(200).json({message:"Product deleted Successfully",data})
        }
    } catch (error) {
        return res.status(500).json({message:"An Unexpected Error Occured"})
    }
}

const FetchproductbyId=async function (req,res) {
    const {id}=req.params;
    try {
        const product=await ProductSchema.findById(id)
        if(!product)
        {
            return res.status(400).json({message:'No product'})
        }
        else
        {
            return res.status(200).json({message:'product fetched successfully',product})
        }
    } catch (error) {
        return res.status(500).json({message:"An Unexpected Error Occured"})
    }
}

const CreateUser=async function (req,res) {
    const{email,firstname,lastname,password,role,dateofBirth}=req.body
    if(!email||!firstname||!lastname||!password||role)
    {
        return res.status(400).json({message:"Please Fill All The Feilds"})
    }
    let existinguser=await Userschema.findOne({email})
    if(existinguser)
    {
        return res.status(400).json({message:"User Already Exists in This Mail"})
    }
    else{
        try {
         let hashedpassword=await bcrypt.hash(password,10)
         let newuser=await Userschema.create({
            email,
            role,
            firstname,
            lastname,
            dateofBirth,
            password:hashedpassword
         }) 
         if(!newuser)
         {
            return res.status(400).json({message:"Failed to Create User"})
         }
         else{
            return res.status(200).json({message:"User Created Successfully",newuser})
         }
        } catch (error) {
            
            return res.status(500).json({message:"Unexpected Error Occured",error:error.message})
        }
    }
}

const  loginuser=async function (req,res) {
    const{email,password}=req.body
    if(!email||!password)
    {
        res.status(400).json({message:"please enter all the feilds"})
    }
    try {
        const user=await Userschema.findOne({email})
        if(!user)
        {
            return res.status(400).json({message:"No User Find in This Email"})
        }
        else{
            const checkpass=await bcrypt.compare(password,user.password)
            if(!checkpass)
            {
                res.status(400).json({message:"Password is Incorrect"})
            }
            else{
                const token=jwt.sign({_id:user._id},process.env.jwt_key,{expiresIn:"1H"})
                 let tokenname=user.role=== "Admin" ? "AdminToken" :"UserToken"
                return res.status(200).json({message:"Login Successfull",user,[tokenname]:token})
            }
        }
    } catch (error) {
        return res.status(500).json({message:"Unexpected Error Occured",error:error.message})
    }
   
}

const addToCart = async function (req, res) {
    try {
        const { id } = req.params;
        const  userid  = req.user;  
        const { size} = req.body;

        if (!size) {
            return res.status(400).json({ message: "Please provide all the data" });
        }
        const cart = await CartSchema.create({
            product: id,
            user: userid,
            size,
        });
        return res.status(201).json({ message: "Item added to cart successfully", cart });
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occurred", error: error.message });
    }
};

const liked = async function (req, res) {
    try {
        const { id } = req.params;
        const  userid  = req.user;  
        const { size} = req.body;

        if (!size) {
            return res.status(400).json({ message: "Please provide all the data" });
        }
        const cart = await LikedSchema.create({
            product: id,
            user: userid,
            size,
        });
        return res.status(201).json({ message: "Item added to Favorite successfully", cart });
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occurred", error: error.message });
    }
};
const fetchliked =async function (req,res) {
    const userid=req.user
    try {
        const details=await LikedSchema.find({user:userid}).populate('product')
        if(!details)
        {
            return res.status(400).json({message:"Failed to Fetch Favorite Items"})
        }
        else
        {
            return res.status(200).json({message:"Liked Fetched Successfully",details})
        }
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occurred", error: error.message });
    }
}

const DeleteFromliked=async function (req,res) {
    const {id}=req.params;
    try {
        const product=await LikedSchema.findByIdAndDelete(id)
        if(!product)
        {
            return res.status(400).json({message:"Failed to Delete Favorite Items"})
        }
        else
        {
            return res.status(200).json({message:"Item Deleted From Favorite Successfully",product})
        }
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occurred", error: error.message });
    }
}

const fetchCart =async function (req,res) {
    const userid=req.user
    try {
        const details=await CartSchema.find({user:userid}).populate('product')
        if(!details)
        {
            return res.status(400).json({message:"Failed to Fetch Cart Items"})
        }
        else
        {
            return res.status(200).json({message:"Cart Fetched Successfully",details})
        }
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occurred", error: error.message });
    }
}

const DeleteFromCart=async function (req,res) {
    const {id}=req.params;
    try {
        const product=await CartSchema.findByIdAndDelete(id)
        if(!product)
        {
            return res.status(400).json({message:"Failed to Delete Cart Items"})
        }
        else
        {
            return res.status(200).json({message:"Item Deleted From Cart Successfully",product})
        }
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occurred", error: error.message });
    }
}
const DeleteAllFromCart = async function (req, res) {
    try {
        const id=req.user
        const result = await CartSchema.deleteMany({user:id});
        if (result.deletedCount === 0) {
            return res.status(400).json({ message: "No items found in the cart to delete" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occurred", error: error.message });
    }
};

const UpdateFromCart=async function (req,res) {
    const{id}=req.params;
    const{quantity}=req.body
    try {
        const product=await CartSchema.findByIdAndUpdate(id,{quantity},{new:true})
        if(!product)
        {
            return res.status(400).json({message:"Failed to Update Cart Items"})
        }
        else
        {
            return res.status(200).json({message:"Item Updated Successfully",product})
        }
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occurred", error: error.message });
    }
}


const Makenewadmin=async function (req,res) {
    try {
        const{email}=req.body
        if(!email){
            return res.status(400).json({message:"Please Enter The Email"})
        }
        else{
            const isuser=await Userschema.findOne({email})
            if(!isuser)
            {
                return res.status(400).json({message:"Can't Find The User !! Check The Email Please"})
            }
            else{
                const response=await Userschema.findByIdAndUpdate(isuser._id, {role:'Admin'},{new:true})
                if(response)
                {
                    return res.status(200).json({message:"New Admin Added Successfully"})
                }
            }
        }
    } catch (error) {
        return res.status(500).json({message:"Unexpected Error Occured",error:error.message})
    }
   
}

const CreateOrder=async function (req,res) {
    const userId=req.user
    const {
        firstname,
        lastname,
        phone,
        alternativenumber,
        email,
        address,
        pincode,
        Subtotal,
        delivery_charge,
        total,
        products,
        status
    } = req.body;
    if(!firstname||!lastname||!phone||!email||!address||!pincode)
    {
        return res.status(400).json({message:"All Feilds Are Required"})
    }
    else{
    try {
        const order=await OrderSchema.create({userId, name: { firstname, lastname },
            phone,
            alternativenumber,
            email,
            address,
            pincode,
            Subtotal,
            delivery_charge,
            total,
            status,
            products})
            if(order)
            {
               return  res.status(200).json({ message: 'Order placed successfully', order});
            }
    } catch (error) {
        return res.status(500).json({message:"Unexpected Error Occured Please Try Again",error:error.message})
    }
}
}

const fetchorder=async function (req,res) {
    try {
        const details = await OrderSchema.find({}).populate({path:'products.product',});
        if(!details)
        {
            return res.status(400).json({message:"Failed to Fetch Cart Items"})
        }
        else
        {
            return res.status(200).json({message:"Cart Fetched Successfully",details})
        }
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occurred", error: error.message });
    }
}

const updateorder = async function (req, res) {
    try {
        const { status } = req.body; 
        const { id, productId } = req.params; 
        const order = await OrderSchema.findById(id);
        const product = order.products.id(productId);
        product.status = status;
        await order.save()
        return res.status(200).json({ message: "Product status updated successfully", response: order });
    } catch (error) {
        console.error("Error in updateorder:", error);

        return res.status(500).json({ message: "Unexpected Error Occurred", error: error.message });
    }
}
const deleteorder = async function (req, res) {
    try {
      const { id, productid } = req.params;
      const order = await OrderSchema.findById(id);
      if (!order) {
        return res.status(400).json({ message: "No Order Found" });
      }
      order.products.pull({ _id: productid });
      await order.save();
      if (order.products.length === 0) {
        await OrderSchema.findByIdAndDelete(id);
        return res.status(200).json({ message: "Order Removed Successfully" });
      }
      return res.status(200).json({ message: "Product Removed Successfully from the Order" });
    } catch (error) {
      return res.status(500).json({ message: "Unexpected Error Occurred", error: error.message });
    }
  };
  

const OrderStatus= async function (req,res) {
    try {
        const id=req.user
        const products=await OrderSchema.find({userId:id}).populate({path:'products.product'})
        if(products){
            return res.status(200).json({message:"Order Fetched Successfully",products})
        }
    } catch (error) {
        return res.status(500).json({ message: "Unexpected Error Occurred", error: error.message });
    }
}

module.exports = {
    CreateProduct,
    GetAllProducts, 
    UpdateProductbyId,
    DeleteProductbyId,
    FetchproductbyId,
    CreateUser,
    loginuser,
    addToCart,
    fetchCart,
    DeleteFromCart,
    UpdateFromCart,
    liked,
    fetchliked,
    DeleteFromliked,
    Makenewadmin,
    CreateOrder,
    fetchorder,
    DeleteAllFromCart,
    updateorder,
    OrderStatus,
    deleteorder
};
