const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const Staff = require("../models/Staff");

//create
router.post("/", async (req, res) => {
  const newStaff = new Staff(req.body);
  try {
      const savedStaff = await newStaff.save();
      res.status(201).json(savedStaff);
  } catch (error) {
      res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedStaff = await Staff.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },
            {new:true}
        );
        res.status(200).json(updatedStaff);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:id", async (req, res)=>{
     try {
         const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
         res.status(200).json(deletedStaff);
     } catch (error) {
         res.status(500).json(error);
     } 
});

router.get("/", async (req, res)=>{
    try {
        const staffs = await Staff.find();
        res.status(200).json(staffs);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:id", async (req, res)=>{
   try {
       const staff = await Staff.findOne({_id: req.params.id});
       res.status(200).json(staff);
   } catch (error) {
       res.status(500).json(error);
   }
});

module.exports = router;