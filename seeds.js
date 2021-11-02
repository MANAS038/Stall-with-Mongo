const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Stall', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Connected");
})
.catch(err=> {
    console.log("oh no error!!")
    console.log(err)
 });

const path=require('path');
const Product=require('./models/product');
const seedProducts=[{
    name:'Mango',
    price:20,
    category:'fruit',
    quantity: 5
},
{
   name:'apple',
   price:20,
   category:'fruit',
   quantity: 4
},
{
   name:'Milk',
   price:60,
   category:'fruit',
   quantity: 4
}
]
Product.insertMany(seedProducts).then(res=>{
   console.log(res)
})
.catch(e=>{
   console.log(e);
})
