const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const Order = require("../models/Order");
const Product = require("../models/Product");

//create
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//set trade cancel 
router.post("/cancel-trade/:order_id",  (req, res) => {
   try {
    const getOrder =  Order.findOne({
      _id:{$in:req.params.order_id}
    });
     var counter = 0;
     getOrder.forEach(element => {
       const salesProduct =  
       Order.findOne({_id:{$in:element[i].products.productId}});
       salesProduct.unitsInStock += element[i].products.quantity;
       const  updateProduct =  Product.findByIdAndUpdate(
         salesProduct.productId,
         {$set: salesProduct},
         {new:true}
       );
       counter++;
     });
     getOrder.status = "cancel";
     const changeStatus =  Order.findByIdAndUpdate(
       getOrder._id,
       {$set:getOrder},
       {new:true}
     );
     res.status(200).json(changeStatus);
   } catch (error) {
     res.status(500).json(error);
   }
});

//accept order 
router.post("/accept-order/:order_id",  (req, res) => {
   try {
     const getOrder =  Order.findOne({
       _id:{$in:req.params.order_id}
     });
      var counter = 0;
      getOrder.forEach(element => {
        const salesProduct =  
        Order.findOne({_id:{$in:element[i].products.productId}});
        salesProduct.unitsInStock -= element[i].products.quantity;
        const updateProduct =  Product.findByIdAndUpdate(
          salesProduct.productId,
          {$set: salesProduct},
          {new:true}
        );
        counter++;
      });
      getOrder.status = "accept";
      const changeStatus =  Order.findByIdAndUpdate(
        getOrder._id,
        {$set:getOrder},
        {new:true}
      );
      res.status(200).json(changeStatus);
   } catch (error) {
     res.status(500).json(error);
   }
});

//decline-order
router.post("/decline-order/:order_id", async (req, res)=>{
      try {
        const deleteOrder = await Order.findByIdAndDelete(req.params.order_id);
        res.status(200).json(deleteOrder);
      } catch (error) {
        res.status(500).json(error);
      }
}); 

//user update
router.put("/:id", verifyTokenAndadmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(403).json(error);
  }
});

//user delete

router.delete("/:id", verifyTokenAndadmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.findOne({ userId: req.params.userId });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all users
router.get("/", verifyTokenAndadmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get monthly income

router.get("/income", verifyTokenAndadmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: { createdAt: { $gte: previousMonth } },
      },
      {
        $project: { month: { $month: "$createdAt" }, sales: "$amount" },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
