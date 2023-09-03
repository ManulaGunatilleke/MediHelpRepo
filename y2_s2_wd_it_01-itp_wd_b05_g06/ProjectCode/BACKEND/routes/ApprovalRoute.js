const router = require("express").Router();
const nodemailer = require('nodemailer');
// const nodemailer = require("nodemailer");
const empapproval = require("../models/empapproval");
const multer = require("multer");
let path = require("path");
const { v4: uuidv4 } = require("uuid");

router.route("/create").post(async (req, res) => {
  const { Emp_ID, Emp_Email, approval_massage } = req.body;

  const Attendace = new Attendance({
    Emp_ID,
    Emp_Email,
    approval_massage,
  });

  await empapproval
    .save()
    .then(() =>
      res.status(200).json({ success: true, message: "Approval Successful! " })
    )
    .catch((err) => res.status(500).json({ success: false, err }));
});

router.route("/send-mail").post(async (req, res) => {
  const { Emp_ID, Emp_Email, approval_massage } = req.body;

  console.log(req.body)

  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // use TLS
    auth: {
        user: 'your-outlook-email',
        pass: 'outlook-account-password'
    }
  });

  let mailOptions = {
    from: "your-outlook-email",
    to: Emp_Email,
    subject: "Test email from Node.js",
    text: approval_massage
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "email failed to send " });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json(info);
    }
  });
});

router.route("/").get(async (req, res) => {
  await empapproval
    .find()
    .then((empapprovals) => res.status(200).json(empapproval))
    .catch((err) => res.json({ success: false, err }));
});

router.route("/get/:id").get(async (req, res) => {
  const { id } = req.params;

  await empapproval
    .findById(id)
    .then((empapproval) => res.status(200).json(empapproval))
    .catch((err) => res.json({ err }));
});

router.route("/update/:id").put(async (req, res) => {
  const { id } = req.params;

  const { Emp_ID, Emp_Email, approval_massage } = req.body;

  await empapproval
    .findByIdAndUpdate(id, {
      Emp_ID,
      Emp_Email,
      approval_massage,
    })
    .then(() =>
      res
        .status(200)
        .json({ success: true, message: "Successfully updated the Approval" })
    )
    .catch((err) => res.status(500).json({ err: err }));
});

router.route("/delete/:id").delete(async (req, res) => {
  const { id } = req.params;

  await empapproval
    .findByIdAndDelete(id)
    .then(() =>
      res
        .status(200)
        .json({ success: true, message: "Successfully deleted the Approval" })
    )
    .catch((err) => res.json({ err }));
});

module.exports = router;