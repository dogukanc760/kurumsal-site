const router = require('express').Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndadmin,
  } = require("./verifytoken");
 const Blog = require("../models/Blog");


  
  //create 
  router.post("/create", async (req, res) => {
      try {
          const newBlog = new Blog(req.body);
          const savedBlog = await newBlog.save();
          res.status(200).json(savedBlog);
      } catch (error) {
          res.status(500).json(error);
      }
  });
  
  router.put("/:id", async (req, res) => {
     try {
         const updatedBlog = await Blog.findByIdAndUpdate(
             req.params.id,
             {$set:req.body},{new:true}
         );
         res.status(200).json(updatedBlog);
     } catch (error) {
         res.status(500).json(error);
     }
  });
  
  router.delete("/:id", async (req, res) => {
      try {
          const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
          res.status(200).json(deletedBlog);
      } catch (error) {
          res.status(500).json(error);
      }
  });
  
  router.get("/", async (req, res)=>{
     try {
         const Blogs = await Blog.find();
         res.status(200).json(Blogs);
     } catch (error) {
         res.status(500).json(error);
     }
  });
  //naber
  router.get("/:id", async (req, res)=>{
     try {
         const Blogs = await Blog.findOne({_id:req.params.id});
         res.status(200).json(Blogs);
     } catch (error) {
         res.status(500).json(error);
     }
  });
  

  
  module.exports = router;