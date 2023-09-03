const router = require("express").Router();
//const { Router } = require("express");
let Patient = require("../modules/p_sign_in");

//Add Data
router.route("/add").post((req,res)=>{

    const fname = req.body.fname;
    const lname = req.body.lname;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const phonenumber = Number(req.body.phonenumber);
    const email = req.body.email;
    const password = req.body.password;


    const newPatient = new Patient({

        fname,
        lname,
        age,
        gender,
        phonenumber,
        email,
        password,


    });

    newPatient.save().then(() => {
        res.json("Patient Added")
    }).catch((err) => {
        console.log(err);
    })

})

//Fetch/Get Data
router.route("/").get((req,res) => {

    Patient.find().then((Patients) => {
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
    const {fname,lname,age ,gender,phonenumber,email,password} = req.body;

    const updatePatient = {
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

    const update = await Patient.findByIdAndUpdate(userId, updatePatient)
    .then((patient) => {
        res.status(200).send({status: "User Updated",patient})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Updating data", error:err.message})
    });

})

//Delete Data
router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;
    
    await Patient.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "User Deleted"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data", error : err.message})
    }) 

})

//Get Data
router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;

    const user = await Patient.findById(userId)
    .then((patient) => {
        res.status(200).send({status: "User Fetched",patient})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error : err.message})
    }) 

})


module.exports = router;