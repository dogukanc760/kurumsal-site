const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const Service = require("../models/Service");

//create 
router.post("/create", async (req, res) => {
    try {
        const newService = new Service(req.body);
        const savedService = await newService.save();
        res.status(200).json(savedService);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:id", async (req, res) => {
   try {
       const updatedService = await Service.findByIdAndUpdate(
           req.params.id,
           {$set:req.body},{new:true}
       )
   } catch (error) {
       res.status(500).json(error);
   }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedService);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/", async (req, res)=>{
   try {
       const services = await Service.find();
       res.status(200).json(services);
   } catch (error) {
       res.status(500).json(error);
   }
});
//naber
router.get("/:id", async (req, res)=>{
   try {
       const services = await Service.findOne({_id:req.params.id});
       res.status(200).json(services);
   } catch (error) {
       res.status(500).json(error);
   }
});

//get by user id
router.get("/:userid", async (req, res)=>{
   try {
       const services = await Service.findOne({user_id:req.params.userid});
       res.status(200).json(services);
   } catch (error) {
       res.status(500).json(error);
   }
}); 

module.exports = router;