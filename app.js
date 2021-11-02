const express=require('express');
const app=express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Stall', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Connected");
})
.catch(err=> {
    console.log("oh no error!!")
    console.log(err)
 });
 const methodOverride=require('method-override')
 app.use(methodOverride('_method'))
 app.use(express.urlencoded({ extended: true }));
const path=require('path');
const Product=require('./models/product');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.get('/products', async (req,res)=>{
    const products= await Product.find({});
   res.render('products/index',{products})
}) 
app.get('/products/new', async (req,res)=>{
    
   res.render('products/new')
}) 
app.post('/products', async (req,res)=>{
      const newpro=new Product(req.body);
      await newpro.save();
      res.redirect(`/products/${newpro._id}`)
 }) 
app.get('/products/:id',async(req,res)=>{
    const { id }=req.params;
    const product =await Product.findById(id);
    res.render('products/show',{product})
})
app.get('/products/:id/edit',async(req,res)=>{
    const { id }=req.params;
    const product =await Product.findById(id);
    res.render('products/edit',{product})
})
app.get('/products/:id',async(req,res)=>{
    const { id }=req.params;
    const product =await Product.findById(id);
    res.render('products/show',{product})
})
app.put('/products/:id',async(req,res)=>{
    const { id }=req.params;
    const product =await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    res.redirect(`/products/${product._id}`)
})
app.delete('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const deletedProduct=await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
app.listen(3000,()=>{
    console.log("running")
})