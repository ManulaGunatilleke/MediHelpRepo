const router = require("express").Router();
const Appointment = require("../modules/p_appointment");
//const { Router } = require("express");

//Add Data
router.route("/appointment/add").post((req,res)=>{

   
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const phonenumber = Number(req.body.phonenumber);
    const email = req.body.email;
    const doctor = req.body.doctor;


    const newAppointment = new Appointment({

        name,
        age,
        gender,
        phonenumber,
        email,
        doctor,

    });

    newAppointment.save().then(() => {
        res.json("Appointment Added")
    }).catch((err) => {
        console.log(err);
    })

})

//Fetch/Get Data
router.route("/appointment/").get((req,res) => {

    Appointment.find().then((Appointments) => {
        res.json(Appointments)
    }).catch((err) => { 
        console.log(err)
    })

})

//Update Data
router.route("/appointment/update/:id").put(async (req,res) => {

    let userId = req.params.id;

    const {name,age ,gender,phonenumber,email,doctor} = req.body;

    const updateAppointment = {
        name,
        age,
        gender,
        phonenumber,
        email,
        doctor,
    }

    const update = await Appointment.findByIdAndUpdate(userId, updateAppointment)
    .then((Appointment) => {
        res.status(200).send({status: "Appointment Updated",Appointment})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Updating data", error:err.message})
    });

})

//Delete Data
router.route("/appointment/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;
    
    await Appointment.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "Appointment Deleted"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data", error : err.message})
    }) 

})

//Get Data
router.route("/appointment/get/:id").get(async (req,res) => {
    let userId = req.params.id;

    const user = await Appointment.findById(userId)
    .then((appointment) => {
        res.status(200).send({status: "Appointment Fetched",appointment})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error : err.message})
    }) 

})


module.exports = router;