const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require("mongoose")
const app = express();
const cors=require('cors');
app.use(cors());
const path=require("path");
const dotenv=require("dotenv")
const itube = require('./models/itube');
dotenv.config()
// parse application/json
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/videos",express.static(path.join(__dirname,"/videos")))
// create a MySQL pool
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "videos");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/upload",upload.single("file"),async(req,res)=>{
    res.status(200).json("file uploaded")
})
app.post("/api/videos",async(req,res)=>{
  console.log("heyyy",req.body)
    const newVideo = new itube(req.body);
    try{
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo)
    }
    catch(err){
        res.status(500).json(err)
    }
})

app.get("/api/videos",async(req,res)=>{
  try{
    const allData = await itube.find();
    res.status(200).json(allData)
  }
  catch(err){
    res.status(500).json(err)
}
})
// start the server
app.listen(4000, () => {
  console.log('Server listening on port 4000');
});
