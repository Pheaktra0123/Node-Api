const express=require('express')
const mongose=require('mongoose')
const Product=require('./model/Productmodel')
const app=express()
app.use(express.json())
//use route for get product

app.get('/product',async(req,res)=>{
    try {
        const product=await Product.find({})
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
})
//get product by id
app.get('/product/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});

    }
})
//use route post product
app.post('/product',async(req,res)=>{
   try {
    const product=await Product.create(req.body);
    res.status(200).json(product);
   } catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message});
    
   }
})
//update data
app.put('/product/:id',async(req,res)=>{
    const {id}=req.params;
    const product=await Product.findByIdAndUpdate(id,req.body);
    if(!product){
        res.status(404).json({message:`Cannot find product id${id}`}
        );
    }
    const productUpdate=await Product.findById(id)
    res.status(202).json(productUpdate);
})

//delete data
app.delete('/product/:id', async(req,res)=>{
    const {id}=req.params;
    const product=await Product.findByIdAndDelete(id);
    if(!product){
        res.status(404).json({message:`Cannot find product id ${id}`});
    }
    res.status(200).json(product);
})

//connect database with mongoose 
mongose.set("strictQuery",false)
mongose
.connect('mongodb+srv://chheangpheaktra168:12345678Admin@devapi.oga6g.mongodb.net/node-api?retryWrites=true&w=majority&appName=DevApi')
.then(()=>{
    console.log("mongose connected");
    app.listen(3000,()=>{
        console.log("api is running prot 3000"); 
    })
})
.catch((error)=>{
    console.log(error);
})
