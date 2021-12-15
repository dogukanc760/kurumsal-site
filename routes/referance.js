const router = require('express').Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndadmin,
  } = require("./verifytoken");
 const Referance = require("../models/Referance");


  
  //create 
  router.post("/create", async (req, res) => {
      try {
          const newReferance = new Referance(req.body);
          const savedReferance = await newReferance.save();
          res.status(200).json(savedReferance);
      } catch (error) {
          res.status(500).json(error);
      }
  });
  
  router.put("/:id", async (req, res) => {
     try {
         const updatedReferance = await Referance.findByIdAndUpdate(
             req.params.id,
             {$set:req.body},{new:true}
         );
         res.status(200).json(updatedReferance);
     } catch (error) {
         res.status(500).json(error);
     }
  });
  
  router.delete("/:id", async (req, res) => {
      try {
          const deletedReferance = await Referance.findByIdAndDelete(req.params.id);
          res.status(200).json(deletedReferance);
      } catch (error) {
          res.status(500).json(error);
      }
  });
  
  router.get("/", async (req, res)=>{
     try {
         const Referances = await Referance.find();
         res.status(200).json(Referances);
     } catch (error) {
         res.status(500).json(error);
     }
  });
  //naber
  router.get("/:id", async (req, res)=>{
     try {
         const Referances = await Referance.findOne({_id:req.params.id});
         res.status(200).json(Referances);
     } catch (error) {
         res.status(500).json(error);
     }
  });
  

  
  module.exports = router;