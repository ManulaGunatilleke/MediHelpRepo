const mongoose = require("mongoose");
const router = require("express").Router();
const moment = require("moment");
const PDFDocument = require("pdfkit-table");
const Attendance = require("../models/attendance");
const multer = require("multer");
let path = require("path");
const { v4: uuidv4 } = require("uuid");

router.route("/create").post(async (req, res) => {
  const { Emp_ID, Emp_FirstName, Emp_LastName, InTime, OutTime, Date } =
    req.body;
  console.log(InTime, OutTime, Date);

  const Attendace = new Attendance({
    Emp_Code: Emp_ID,
    Emp_FirstName,
    Emp_LastName,
    InTime,
    OutTime,
    Date,
  });

  await Attendace.save()
    .then(() =>
      res
        .status(200)
        .json({ success: true, message: "Successfully Added the Attendance" })
    )
    .catch((err) => res.status(500).json({ success: false, err }));
});

router.route("/").get(async (req, res) => {
  await Attendance.find()
    .then((Attendances) => res.status(200).json(Attendances))
    .catch((err) => res.json({ success: false, err }));
});

router.route("/get/:id").get(async (req, res) => {
  const { id } = req.params;

  await Attendance.findById(id)
    .then((Attendance) => res.status(200).json(Attendance))
    .catch((err) => res.json({ err }));
});

router.route("/getAllAttendances").get(async (req, res) => {
  try {
    const attendanceList = await Attendance.find(); // Find all users in the database
    res.status(200).json({ data: attendanceList, success: true }); // Return the users as a JSON response
  } catch (error) {
    console.error(error); // Log any errors to the console
    res.status(500).json({ message: error }); // Return an error message
  }
});

router.route("/update").put(async (req, res) => {
  const { Emp_ID, Emp_FirstName, Emp_LastName, InTime, OutTime, Date } =
    req.body;

  console.log("-----------REQ BODY----------------", req.body, Emp_ID);

  try {
    const filter = { Emp_Code: Emp_ID };
    const update = { $set: { OutTime: OutTime } };
    const options = { new: true };

    const updatedAttedanceObj = await Attendance.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (updatedAttedanceObj) {
      return res
        .status(200)
        .json({
          message: "Attendnce updated successfully",
          attendanceObj: updatedAttedanceObj,
        });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  // await Attendance.findOneAndUpdate(filter, update, options)
  //     .then((updatedObj) => res.status(200).json({ success: true, message: "Successfully updated the Attendance", updatedObj: updatedObj }))
  //     .catch((err) => {
  //         console.log("update Failed : ", err)
  //         res.status(500).json({ err: err })
  //     })

  // await Attendance.findByIdAndUpdate(id, {
  //     Emp_ID,
  //     Emp_FirstName,
  //     Emp_LastName,
  //     InTime,
  //     OutTime,
  //     Date

  //      }).then(() => res.status(200).json({ success: true, message: "Successfully updated the Attendance" })).catch((err) => res.status(500).json({err:err}))

  // await Attendance.findByIdAndUpdate(id, { $set: { attendanceObj } }).then(() => res.status(200).json({ success: true, message: "Successfully updated the Attendance" })).catch((err) => res.status(500).json({ err: err }))
});

router.route("/delete/:id").delete(async (req, res) => {
  const { id } = req.params;

  await Attendance.findByIdAndDelete(id)
    .then(() =>
      res
        .status(200)
        .json({ success: true, message: "Successfully deleted the Attendance" })
    )
    .catch((err) => res.json({ err }));
});

router.route("/generatePDf").get(async (req, res) => {
    try {
      const attendanceList = await Attendance.find();
  
      const doc = new PDFDocument();

      const tableHeaders = [
        "Emp_Code",
        "Emp_FirstName",
        "Emp_LastName",
        "InTime",
        "Date",
        "OutTime"
      ];
      const tableRows = attendanceList.map((attendence) => [
        attendence.Emp_Code,
        attendence.Emp_FirstName,
        attendence.Emp_LastName,
        attendence.InTime,
        attendence.Date,
        attendence.OutTime
      ]);

      const table = {
        title: "Attendance List",
        headers: tableHeaders, 
        rows: tableRows
      }
      await doc.table(table, { 
        width: "500",
        columnSize: [300]
      });
  
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=output.pdf");
  
      doc.pipe(res);
      doc.end();
      // console.log(empployeeList); // Find all users in the database
      //   res.status(200).json({ data: empployeeList, success: true }); // Return the users as a JSON response
    } catch (error) {
      console.log(error);
      //   console.error(error); // Log any errors to the console
      //   res.status(500).json({ message: error }); // Return an error message
    }
  });

module.exports = router;
