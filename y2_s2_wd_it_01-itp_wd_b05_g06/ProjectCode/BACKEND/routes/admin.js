const router = require("express").Router();
const Admin = require("../modules/admin");

//Add Data
router.route("/admin/add").post((req,res)=>{

    const fname = req.body.fname;
    const lname = req.body.lname;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const phonenumber = Number(req.body.phonenumber);
    const email = req.body.email;
    const password = req.body.password;


    const newAdmin = new Admin({

        fname,
        lname,
        age,
        gender,
        phonenumber,
        email,
        password,


    });

    newAdmin.save().then(() => {
        res.json("Admin Added")
    }).catch((err) => {
        console.log(err);
    })

})

//Fetch/Get Data
router.route("/admin/").get((req,res) => {

    Admin.find().then((Admins) => {
        res.json(Admins)
    }).catch((err) => { 
        console.log(err)
    })

})

//Update Data
router.route("/admin/update/:id").put(async (req,res) => {

    let userId = req.params.id;

    // const name = req.body.name;
    // const age = Number(req.body.age);
    // const gender = req.body.gender; --> normal way to get data

    // deStructure Method,
    const {fname,lname,age ,gender,phonenumber,email,password} = req.body;

    const updateAdmin = {
        fname,
        lname,
        age,
        gender,
        phonenumber,
        email,
        password,
    }

    //how to pass a data in a jason way(then & catch)

    // Student.find().then((students) => {
    //     res.json(students)
    // }).catch((err) => {
    //     console.log(err)
    // })

    //onother way to pass data

    const update = await Admin.findByIdAndUpdate(userId, updateAdmin)
    .then((Admin) => {
        res.status(200).send({status: "Admin Updated",Admin})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Updating data", error:err.message})
    });

})

//Delete Data
router.route("/admin/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;
    
    await Admin.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "Admin Deleted"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data", error : err.message})
    }) 

})

//Get Data
router.route("/admin/get/:id").get(async (req,res) => {
    let userId = req.params.id;

    const user = await Admin.findById(userId)
    .then((Admin) => {
        res.status(200).send({status: "Admin Fetched",Admin})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error : err.message})
    }) 

})


module.exports = router;