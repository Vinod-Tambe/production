const express=require("express");
const cors=require("cors");
const path=require('path')
const app=express();
app.use(express.json())
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
const htmlPath = path.join(__dirname, './views/index.html'); 
app.get("/",(req,res)=>{
    return res.sendFile(htmlPath);
})

const ownerRouters=require("./routes/owner.route.js")
app.use("/owner",ownerRouters)
module.exports=app;

const adminRouters=require("./routes/admin.route.js")
app.use("/admin",adminRouters)
module.exports=app;

const authRouters=require("./routes/auth.route.js")
app.use("/auth",authRouters)
module.exports=app;

const firmRouters=require("./routes/firm.route.js")
app.use("/firm",firmRouters)
module.exports=app;