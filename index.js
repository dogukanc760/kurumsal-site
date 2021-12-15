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
const blogRoute = require("./routes/blog");
const referanceRoute = require("./routes/referance");
var cors = require("cors");

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
