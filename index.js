const express=require("express")
const app=express()
const path=require("path");
const blogroute=require("./routes/blogpost.js")
const {connectdb}=require("./connect");
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
const port=8000;
app.use("/static",blogroute);
connectdb("mongodb://localhost:27017/blog").then(()=>{
    console.log(`mongoose connected at ${port}`)
})

app.listen(port,()=>{
    console.log("server started");
})