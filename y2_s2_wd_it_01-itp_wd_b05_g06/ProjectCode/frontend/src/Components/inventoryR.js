const express = require ('express');
const router = express.Router();
const res = require ("express/lib/response.js");
const Inventory = require("../models/Inventory.js");


//add
 router.route("/add").post((req,res)=>{
 
       const mediname =req.body.mediname;
       const supplier =req.body.supplier;
       const quantity =req.body.quantity;
       const meditype =req.body.meditype;
       const medino   =req.body.medino;

       const newInventory =new Inventory({

        mediname,
        supplier,
        quantity,
        meditype,
        medino
       })
       
  newInventory.save().then(()=>{
    res.json("Inventory Item Added")
  }).catch((err)=>{
    console.log(err);

  })

 })
//getall

 router.route("/allMedicine").get((req,res)=>{

  Inventory.find().then((Inventorys)=>{
    res.json({
      success:true,
      existingMedicine:Inventorys
    })
  }).catch((err)=>{
    console.log(err)
  })

 })

// router.get("/readMedi", (req,res) => {
//   Inventory.find().exec((err,Inventorys) => {
//     if(err){
//       return res.status(400).json({
//         error:err
//       });
//     }
//     return res.status(200).json({
//       success:true,
//       existingMedicine:Inventorys
//     });
//   });
// });


 //update
router.route("/update/:id").put(async(req,res)=>{
  let userId = req.params.id;
  const{mediname,supplier,quantity,meditype,medino}= req.body;

  const updateInventory ={
        mediname,
        supplier,
        quantity,
        meditype,
        medino
  }
  
  const update = await Inventory.findByIdAndUpdate(userId,updateInventory).then(()=>{
    res.status(200).send({status:"user updated"})
  }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error with updating data",error:err.message});
  })
  
})

//delete
router.route("/delete/:id").delete(async(req,res) => {
  let userId =req.params.id;

   await Inventory.findByIdAndDelete(userId)
   .then(() => {
    res.status(200).send({status:"user deleted"});
   }).catch((err)=>{
    console.log(err.message);
    res.status(500).send({status: "Error with delete user", error : err.message});
 
   })
})


//getid
router.route("/get/:id").get(async(req,res)=>{
  let userId =req.params.id;

  const user= await Inventory.findById(userId)
  .then((Inventory)=> {
    res.status(200).send({status:"user fetched",Inventory})
  }).catch(()=>{
    res.status(500).send({status:"Error with get user", error:err.meassage});
  })
})



 module.exports=router;