const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: 'env' });

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
   // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
// }, err => {
//    if(err) throw err;
//    console.log('Connected to MongoDB!!!') 
});

const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Mongodb Connection Success!");
})

const patientRouter = require("./routes/p_sign_in.js");
const appointmentRouter = require("./routes/p_appointment.js");
const adminRouter = require("./routes/admin.js");

const EmployeeRouter = require('./routes/EmployeeRoute');
const AttendanceRoute = require('./routes/AttendanceRoute');
const ApprovalRoute = require('./routes/ApprovalRoute');
const doctorRouter = require('./routes/d_sign_in.js');
const TransportRouter = require('./routes/Transport.js');
const paymentRouter = require('./routes/ipayments.js');
const inventoryRouter = require('./routes/inventoryR.js');
const SupportRouter = require('./routes/Ticket.js');

app.use("/patient",patientRouter);
app.use("/appointment",appointmentRouter);
app.use("/admin",adminRouter);

app.use('/employees', EmployeeRouter)
app.use('/attendances',AttendanceRoute)
app.use('/approvals',ApprovalRoute);
app.use('/doctor',doctorRouter);
app.use('/transport',TransportRouter);
app.use("/ipayments", paymentRouter);
app.use("/Inventory", inventoryRouter);
app.use("/ticket", SupportRouter);

app.listen(PORT, () =>{
    console.log('Server is up and running on port number:', PORT );
})

