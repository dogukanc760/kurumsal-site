const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const staffRoute = require("./routes/staff");
const serviceRoute = require("./routes/service");
const contactRoute = require("./routes/contact");
const blogRoute = require("./routes/blogs");
const referanceRoute = require("./routes/referance");
const uploadRoute = require("./routes/uploadimage");
var cors = require("cors");
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })

// For Single image upload
app.post('/uploadImage', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)
  
})

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connection successfully"))
  .catch((err) => {
    console.log(err);
  });

  app.use(cors());
  app.use(express.json());
  app.options('*', cors());
  app.use("/api/uploadImage", uploadRoute);
  app.use("/api/product", productRoute);
 app.use("/api/user", userRoute);
 app.use("/api/auth", authRoute);
 app.use("/api/order", orderRoute);
 app.use("/api/cart", cartRoute);
 app.use("/api/staff", staffRoute);
 app.use("/api/service", serviceRoute);
 app.use("/api/contact", contactRoute);
 app.use("/api/blog", blogRoute);
 app.use("/api/referance", referanceRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("server running");
});
