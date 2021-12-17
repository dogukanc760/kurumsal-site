const router = require("express").Router();
const multer = require('multer');
const Blog = require("../models/Blog");
const Referance = require("../models/Referance");
const Contact = require("../models/Contact");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'routes/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})  
var upload = multer({ storage: storage })

// For Single image upload
router.post('/', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)
  
})

router.get('/get-referance/:name', (req, res, next) => {
    var filename = req.params.name;
    console.log(filename)
    const data = Referance.findOne({filePath:{$in:req.params.name}});
    
      res.set({'Content-Type': 'image/jpg'});
      res.contentType('image/png');
      res.contentType('image/jpg');
      res.sendFile(__dirname+'/images/'+req.params.name);
    
    

});

router.get('/get-blog/:name', (req, res, next) => {
  var filename = req.params.name;
  console.log(filename)
  const data = Blog.findOne({filePath:{$in:req.params.name}});
  
    res.set({'Content-Type': 'image/jpg'});
    res.contentType('image/png');
    res.contentType('image/jpg');
    res.sendFile(__dirname+'/images/'+req.params.name);
  
  

});

router.get('/get-contact/:name', (req, res, next) => {
  var filename = req.params.name;
  console.log(filename)
  const data = Contact.findOne({filePath:{$in:req.params.name}});
  
    res.set({'Content-Type': 'image/jpg'});
    res.contentType('image/png');
    res.contentType('image/jpg');
    res.sendFile(__dirname+'/images/'+req.params.name);
  
  

});

module.exports = router;