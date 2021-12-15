const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const Contact = require("../models/Contact");

//create 
router.post("/create", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.status(200).json(savedContact);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:id", async (req, res) => {
   try {
       const updatedContact = await Contact.findByIdAndUpdate(
           req.params.id,
           {$set:req.body},{new:true}
       )
   } catch (error) {
       res.status(500).json(error);
   }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedContact);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/", async (req, res)=>{
   try {
       const Contacts = await Contact.find();
       res.status(200).json(Contacts);
   } catch (error) {
       res.status(500).json(error);
   }
});
//naber
router.get("/:id", async (req, res)=>{
   try {
       const Contacts = await Contact.findOne({_id:req.params.id});
       res.status(200).json(Contacts);
   } catch (error) {
       res.status(500).json(error);
   }
});


module.exports = router;