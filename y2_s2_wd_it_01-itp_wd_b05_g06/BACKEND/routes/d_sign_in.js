const router = require("express").Router();
//const { Router } = require("express");
let Doctor = require("../modules/d_sign_in");

//Add Data
router.route("/add").post((req,res)=>{

    const funame = req.body.funame;
    const Specialization = req.body.Specialization;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const phonenumber = Number(req.body.phonenumber);
    const email = req.body.email;
    const password = req.body.password;


    const newDoctor = new Doctor({

        funame,
        Specialization,
        age,
        gender,
        phonenumber,
        email,
        password,


    });

    newDoctor.save().then(() => {
        res.json("Doctor Added")
    }).catch((err) => {
        console.log(err);
    })

})

//Fetch/Get Data
router.route("/").get((req,res) => {

    Doctor.find().then((Patients) => {
        res.json(Patients)
    }).catch((err) => { 
        console.log(err)
    })

})

//Update Data
router.route("/update/:id").put(async (req,res) => {

    let userId = req.params.id;

    // const name = req.body.name;
    // const age = Number(req.body.age);
    // const gender = req.body.gender; --> normal way to get data

    // deStructure Method,
    const {funame,Specialization,age ,gender,phonenumber,email,password} = req.body;

    const updateDoctor = {
        funame,
        Specialization,
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

    const update = await Doctor.findByIdAndUpdate(userId, updateDoctor)
    .then((Doctor) => {
        res.status(200).send({status: "Doctor Updated",Doctor})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Updating data", error:err.message})
    });

})

//Delete Data
router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;
    
    await Doctor.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "Doctor Deleted"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data", error : err.message})
    }) 

})

//Get Data
router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;

    const user = await Doctor.findById(userId)
    .then((doctor) => {
        res.status(200).send({status: "Doctor Fetched",doctor})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error : err.message})
    }) 

})


module.exports = router;