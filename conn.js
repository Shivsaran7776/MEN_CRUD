const {MongoClient} = require("mongodb")
const dURL = "mongodb://localhost:27017"
const client = new MongoClient(dURL)
client.connect()

const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("Hello Shivsaran")
})

app.get('/Product',(req,res)=>{
    res.sendFile(path.join(__dirname,'./index.html'))
    console.log("Connected to the path")
})

app.post('/CreateProduct',(req,res)=>{
    const client = new MongoClient(dURL)
    client.connect()
    const database = client.db("Product")
    const create = database.collection("Categories")
    create.insertOne(req.body)
    console.log(req.body)
    res.send(req.body)
})

app.post('/UpdateProduct',(req,res)=>{
    const client = new MongoClient(dURL)
    client.connect()
    const database = client.db("Product")
    const update = database.collection("Categories")
    const obj = req.body
    update.updateOne({CreateId:obj.UpdateId},{$set:{CreateQty:obj.UpdateQty}})
    res.send("Updated Product Successful")
})

app.post('/Deleteproduct',(req,res)=>{
    const client = new MongoClient(dURL)
    client.connect()
    const database = client.db("Product")
    const Delete = database.collection("Categories")
    const obj=req.body.DeleteId;
    Delete.deleteOne({CreateId:obj})
    res.send("Deleted Product Successful")

})

app.post('/ViewProduct',(req,res)=>{
    const client = new MongoClient(dURL)
    client.connect()
    const database = client.db("Product")
    const view = database.collection("Categories")
    const rett =async()=>{
        const ret=  await view.find().toArray()
    res.json(ret)
    console.log(ret)

    }
    rett();
    
})

app.listen(8070, ()=>console.log("Port is Listening"))