const express = require("express");
const mongoose = require("mongoose")
const myPracticeModel = require('./myPracticeModel');
const app = express();
require('dotenv').config()

app.use(express.json())

const url = process.env.url

mongoose.connect(url).then(
    () => console.log("MongoDB Connected")
).catch(err => console.log(err))


app.get('/emp', async (req,res) => {
    try {
        const data = await myPracticeModel.find();
        res.json(data);
    } catch(err) {
        console.log(err.message)
    }
})

app.post('/addemp', async (req,res) => {
    const {_id,name,age} = req.body;
    try {
        const newData = new myPracticeModel({_id,name,age});
        await newData.save();
        return res.json(await myPracticeModel.find())
    } catch(e) {
        console.log(e.message)
    }
    
})

app.put('/updatemp/:id', async(req,res) => {
    const {name,age} = req.body;
    try {
        const data = await myPracticeModel.findByIdAndUpdate({_id: req.params.id},{name,age},{new: true})
        return res.json(data);
    } catch(e) {
        console.log(e.message)
    }
})

app.get('/emp/:id', async(req,res) => {
    try {
        const dat = await myPracticeModel.findById(req.params.id);
        return res.json(dat);
    } catch(e) {
        console.log(e.message);
    }
})


app.delete('/deleteemp/:id', async(req,res) => {
    try {
        await myPracticeModel.findByIdAndDelete(req.params.id)
        return res.json(await myPracticeModel.find())
    } catch(e) {
        console.log(e.message)
    }
})

app.listen(5000, () => {
    console.log("Server started at 5000");
})



// app.post('/addemp',async (req,res) => {
//     const {age} = req.body;
//     try {
//         const newData = new myPracticeModel(age);
//     }
// })

// app.get('/', (req,res) => {
//     res.send("<h1>Hello World!</h1>")
// })

// const products = [
//     {
//         id:1,
//         name : "Realme"
//     },
//     {
//         id: 2,
//         name : "Mi"
//     },
//     {
//         id: 3,
//         name : "Lotus"
//     }
// ]

// app.get('/products', (req,res) => {
//     res.json(products)
// })

// app.get('/', (req,res) => {
//     res.send("Connecting Database")
// })

// app.get('/products/:id', (req,res) => {
//     const newData = products.filter(item => item.id.toString() === req.params.id);
//     return res.json(newData)
// })

// app.put('/addProducts', (req,res) => {
//     const {id,name} = req.body;
//     console.log(req);
//     console.log(req.body);
//     return res.send("Datat Stored");
// })