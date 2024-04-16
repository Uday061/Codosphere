const express = require('express');
const app = express();
const connectDatabase = require("./dbconnect/dbconnect.js");
const dotenv = require("dotenv");
dotenv.config({ path : "./config/config.env" });
const authRoute = require("./routes/authRoute.js");
const postRoute = require("./routes/postRoute.js");
const userRoute = require("./routes/userRoute.js");
const cors = require("cors");
const upload = require("./multer");
const cloudinary = require("./cloudinary"); 
const bodyParser = require("body-parser"); 
const fs = require("fs"); 

const port = process.env.PORT;
app.use(express.json());
connectDatabase();
app.use(cors());

app.use("/api/auth",authRoute);
app.use("/api/post",postRoute);
app.use("/api/user",userRoute);
app.get("/", async (req,res ) => {
    res.send("HELLO WORLD !!! ");
})

////////////////////////////////////////////////////

app.use('/upload-images',upload.array('image'),async(req,res)=>{
    const uploader=async(path)=>await cloudinary.uploads(path,'Image')
    if(req.method==='POST')
    {
        const urls=[]
        const files=req.files

        for(const file of files){
            const {path}=file 
            const newPath=await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
        res.status(200).json({
            message:'Image Uploaded Successfully',
            data:urls
        })
         
    }
    else{
        res.status(405).json({
            err:"Image not uploaded"
        })
    }
})



  

////////////////////////////////////////////////////



app.listen(port, ()=>{
    console.log(`listening to port : ${port} `);
})