const router = require("express").Router();
// const PDFDocument = require("pdfkit");
const PDFDocument = require("pdfkit-table");

const Employee = require("../models/employee");
const multer = require("multer");
let path = require("path");
const { v4: uuidv4 } = require("uuid");

router.route("/create").post(async (req, res) => {
  console.log("hit........................snew changessssss");
  const {
    firstName,
    lastName,
    gender,
    email,
    address,
    city,
    province,
    position,
    typeofwork,
    CV,
    additionalInfo,
    p_Number,
    dob,
    postal,
  } = req.body;
  console.log("req.body.firstName : ", req.body.firstName);
  // const dob = Number(req.body.dob);
  // const p_Number = Number(req.body.p_Number);
  // const postal = Number(req.body.postal);

  const newEmployee = new Employee({
    firstName,
    lastName,
    dob,
    gender,
    email,
    p_Number,
    address,
    city,
    province,
    postal,
    position,
    typeofwork,
    CV,
    additionalInfo,
  });

  await newEmployee
    .save()
    .then(() =>
      res
        .status(200)
        .json({ success: true, message: "Successfully Added the employee" })
    )
    .catch((err) => console.log(err));
});

router.route("/").get(async (req, res) => {
  await Employee.find()
    .then((Employees) => res.status(200).json(Employees))
    .catch((err) => res.json({ success: false, err }));
});

router.route("/get/:id").get(async (req, res) => {
  const { id } = req.params;

  await Employee.findById(id)
    .then((emp) => res.status(200).json({ data: emp, success: true }))
    .catch((err) => res.json({ err }));
});

router.route("/update/:id").put(async (req, res) => {
  const { id } = req.params;

  const {
    firstName,
    lastName,
    dob,
    gender,
    email,
    p_Number,
    address,
    city,
    province,
    postal,
    position,
    typeofwork,
    CV,
    additionalInfo,
  } = req.body;

  await Employee.findByIdAndUpdate(id, {
    firstName,
    lastName,
    dob,
    gender,
    email,
    p_Number,
    address,
    city,
    province,
    postal,
    position,
    typeofwork,
    CV,
    additionalInfo,
  })
    .then(() =>
      res
        .status(200)
        .json({ success: true, message: "Successfully updated the Employee" })
    )
    .catch((err) => res.status(500).json({ err: err }));
});

router.route("/delete/:id").delete(async (req, res) => {
  const { id } = req.params;

  await Employee.findByIdAndDelete(id)
    .then(() =>
      res
        .status(200)
        .json({ success: true, message: "Successfully deleted the Employee" })
    )
    .catch((err) => res.json({ err }));
});

// router.delete('/delete/:id', async (req, res) => {
//     const { id } = req.params;
//     await Employee.findByIdAndDelete(id).then(() => res.status(200).json({ success: true, message: "Successfully deleted the Employee" })).catch(err => res.json({ err }))
//     res.send('About us');
//   });

router.route("/getAllUsers").get(async (req, res) => {
  // await Employee.find().then(() => res.status(200).json({ data: success: true, message: "Successfully deleted the Employee" })).catch(err => res.json({ err }))
  try {
    const empployeeList = await Employee.find(); // Find all users in the database
    res.status(200).json({ data: empployeeList, success: true }); // Return the users as a JSON response
  } catch (error) {
    console.error(error); // Log any errors to the console
    res.status(500).json({ message: error }); // Return an error message
  }
});

router.route("/generatePDf").get(async (req, res) => {
  // await Employee.find().then(() => res.status(200).json({ data: success: true, message: "Successfully deleted the Employee" })).catch(err => res.json({ err }))
  try {
    const empployeeList = await Employee.find();

    console.log(empployeeList);

    const doc = new PDFDocument();

    const tableHeaders = [
      "firstName",
      "lastName",
      "dob",
      "gender",
      "email",
      "p_Number",
      "address",
      "city",
      "province",
      "postal",
      "position",
      "typeofwork",
    ];
    const tableRows = empployeeList.map((employee) => [
      employee.firstName,
      employee.lastName,
      employee.dob,
      employee.gender,
      employee.email,
      employee.p_Number,
      employee.address,
      employee.city,
      employee.province,
      employee.postal,
      employee.position,
      employee.typeofwork,
    ]);

    const table = {
      title: "Employee List",
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
  } catch (error) {
    console.log(error);
    //   console.error(error); // Log any errors to the console
    //   res.status(500).json({ message: error }); // Return an error message
  }
});

module.exports = router;