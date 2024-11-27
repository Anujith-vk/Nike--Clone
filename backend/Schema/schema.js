const mongoose = require('mongoose')
const { Schema } = require('../database/db')
const Product = mongoose.Schema({
    title: { type: String, require: true },
    detail: { type: String, require: true },
    price: { type: Number, require: true },
    discount: { type: Number, require: true },
    sizes: { type: [String], require: true },
    colors: { type: [Schema.Types.Mixed], require: true },
    category: { type: String },
    gender:{type:String},
    stock: { type: Number, min: [0, "Wrong Minimum Stock"], default: 0, require: true },
    rating: { type: Number, min: [0, "Wrong Minimum Rating"], max: [5, "wrong Max Rating"], default: 0 },
    origin: { type: String, require: true },
    image: { type: [String], require: true },
    highlights: { type: [String], require: true },
    discountPrice: { type: Number },
},
    {
        timestamp: true
    })

const users=mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true,
        default:"User"
    },
    dateofBirth:{
        type:Date,
        default:""
    }
})

const cart=mongoose.Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"ProductSchema",
        require:true
    },
    user:{type:Schema.Types.ObjectId,
        ref:"UserSchema",
        require:true
    },
    size:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        default:1
    }
})


const liked=mongoose.Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"ProductSchema",
        require:true
    },
    user:{type:Schema.Types.ObjectId,
        ref:"UserSchema",
        require:true
    },
    size:{
        type:String,
        require:true
    }
})

const Order= mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Userschema',
        require:true
    },
    name: {
      type: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true }
      }
    },
    phone: { type: Number, required: true },
    alternativenumber: { type: Number },
    email: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    Subtotal: { type: Number },
    delivery_charge: { type: Number },
    total: { type: Number },
    products: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductSchema',
        required: true
      },
      quantity: { type: Number, required: true },
      size: { type:mongoose.Schema.Types.Mixed, required: true }, 
        status:{
        type:String,
        default:'Dispatching'
    }
    }],
    orderdate: { type: Date, default: Date.now() }
  });

const ProductSchema=mongoose.model('ProductSchema',Product)
const Userschema=mongoose.model('Userschema',users)
const CartSchema=mongoose.model('CartSchema',cart)
const LikedSchema=mongoose.model('LikedSchema',liked)
const OrderSchema=mongoose.model('OrderSchema',Order)
module.exports={
    ProductSchema,
    Userschema,
    CartSchema,
    LikedSchema,
    OrderSchema
}