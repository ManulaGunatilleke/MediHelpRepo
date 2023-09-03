 
import React, { useState, useEffect } from "react";
//import axios from 'axios';

//Payment
import CreatePatient from "./Components/CreatePatient";
import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllPatient from "./Components/AllPatient";
import UpdatePatient from "./Components/UpdatePatient";
import DeletePatient from "./Components/DeletePatient";
import PatientDetails from "./Components/PatientDetails";
import PatientHeader from "./Components/PatientHeader";
import PatientHome from "./Components/PatientHome";
import PatientAppointment from "./Components/PatientAppointment";
import CreateAdmin from "./Components/CreateAdmin";
import DeleteAdmin from "./Components/DeleteAdmin";
import UpdateAdmin from "./Components/UpdateAdmin";
import AllAdmin from "./Components/AllAdmin";
import LoginForm from './Components/LoginForm';
import DoctorDetails from './Components/DoctorDetails';
import AllAppointment from "./Components/AllAppointments";
import UpdateAppointment from "./Components/UpdateAppointment";
import DeleteAppointment from "./Components/DeleteAppointment";

//employee
import EmployeeReg from "./Components/Employee";
import { AttendanceForm } from "./Components/Attendance";
import { EmployeeApproval } from "./Components/EmployeeApproval";
import { EmployeeDetails } from "./Components/EmployeeDetails";
import { AttendanceDetail } from "./Components/AttendanceDetail";
import ReceptionistHeader from "./Components/ReceptionistHeader";

//Doctor
import CreateDoctor from "./Components/CreateDoctor";
import DoctorHeader from "./Components/DoctorHeader";
import AllDoctor from './Components/AllDoctor';
import DeleteDoctor from './Components/DeleteDoctor';
import UpdateDoctor from './Components/UpdateDoctor';

//Transport
import AddTransport from "./Components/AddTransport";
import UpdateTransport from "./Components/UpdateTransport";
import ViewITransport from "./Components/ViewITransport";

//Payment
import Addpayment from './Components/Addpayment';
import Mycards from './Components/Mycards';
import UpdatePayment from './Components/UpdatePayment';

//Inventory
import AddMedicine from './Components/AddMedicine';
import UpdateMedicine from './Components/UpdateMedicine';
import ViewInventory from './Components/ViewInventory';

//Support
import Addticket from './Components/Addticket';
import ViewTicket from './Components/ViewTicket';
import Analatics from './Components/Analatics';

function App() {


  // useEffect(() => {
  //   const storedUserType = localStorage.getItem('userType');
  //   if (storedUserType) {
  //     setUserType(storedUserType);
  //   }
  // }, []);

  // const handleUserTypeSelect = (selectedUserType) => {
  //   localStorage.setItem('userType', selectedUserType);
  //   setUserType(selectedUserType);
  // }

  const [userType, setUserType] = useState("");

  
  
  return (
    <Router>

      {userType === "" ? (
        <LoginForm onLogin={(userType) => setUserType(userType)} />
      ) : (
        <>
          {userType === "admin" ? (
            <Header />            
          ) : userType === "patient" ? (
            <PatientHeader />
          ) : userType === "doctor" ? (
            <DoctorHeader />
          ) : userType === "receptionist" ? (
            <ReceptionistHeader />
          ) : (
            <Header />
          )}
          <Routes>
            {/* Public routes accessible by all users */}
            {/* <Route path="/all" element={<AllPatient />} />
            <Route path="/get/:id" element={<PatientDetails />} /> */}

            {/* Private routes accessible only by admin */}
            {userType === "admin" && (
              <>
                {/* add the LoginForm component */}
                {/* <Route path="/login" element={<LoginForm onLogin={handleAdminLogin} />} /> */}
                
                <Route path="/add" element={<CreatePatient />} />
                <Route exact path="/" element={<AllPatient />} />
                <Route exact path="/alladmin" element={<AllAdmin />} />
                <Route exact path="/add/admin" element={<CreateAdmin />} />
                <Route exact path="/get/:id" element={<PatientDetails />} />
                <Route path="/update/:id" element={<UpdatePatient />} />
                <Route path="/delete/:id" element={<DeletePatient />} />
                <Route path="/admin/update/:id" element={<UpdateAdmin />} />
                <Route path="/admin/delete/:id" element={<DeleteAdmin />} />

                <Route exact path="/allappointment" element={<AllAppointment />} />
                <Route path="/appointment/update/:id" element={<UpdateAppointment />} />
                <Route path="/appointment/delete/:id" element={<DeleteAppointment />} />

                <Route path="/add/doctor" element={<CreateDoctor />} />
                <Route path="doctor/update/:id" element={<UpdateDoctor />} />
                <Route path="doctor/delete/:id" element={<DeleteDoctor />} />
                <Route exact path="/alldoctor" element={<AllDoctor />} />

                <Route path="/Transport/add" element={<AddTransport />} />
                <Route path="/Transport/update" element={<UpdateTransport />} />
                <Route path="/Transport/view" element={<ViewITransport />} />

                <Route path="/add/payment" element={<Addpayment />}/> 
                <Route path="/allpayment" element={<Mycards />}/>
                <Route path="payment/update/:id" element={<UpdatePayment />} />

                <Route path="/Medicine/add" element={<AddMedicine/>} /> 
                <Route path="/update" element={<UpdateMedicine/>} />
                <Route path="/view" element={<ViewInventory/>} />

                <Route path='/analytics' element={<Analatics/>} />
                               
                <Route path="employee/approval" element={<EmployeeApproval />} />
                <Route path="employee/list" element={<EmployeeDetails />} />
                <Route path="employee/attendance/list" element={<AttendanceDetail />} />
                
              </>
            )}
            {/* Private routes accessible only by patient */}
            {userType === "patient" && (
              <>
                <Route path="/" element={<PatientHome />} />

                <Route exact path="/add/appointment" element={<PatientAppointment />} />
                <Route path="/update/:id" element={<UpdatePatient />} />
                <Route path="/delete/:id" element={<DeletePatient />} />
                <Route path='/support' element={<Addticket/>} />
                <Route path='/view' element={<ViewTicket/>} />
                
                <Route path="/add/payment" element={<Addpayment />}/>

                <Route
                  exact
                  path="/doctor/appointment/:id"
                  element={<PatientAppointment />}
                />
                <Route path="/update/:id" element={<UpdatePatient />} />
                <Route path="/delete/:id" element={<DeletePatient />} />
                <Route path="/add" element={<CreatePatient />} />
                <Route path="/doctordetails" element={<DoctorDetails />} />

              </>
            )}
            {userType === "receptionist" && (
              <>

                {/* <Route path="/" element={<h1>hello</h1>} /> */}
                <Route path="employee/:type" element={<EmployeeReg />} />
                <Route path="employee/:type/:id" element={<EmployeeReg />} />
                <Route path="employee/attendance/:type" element={<AttendanceForm />} />
                
                <Route path="/" element={<h1>hello</h1>} />
                <Route path="/employee/register" element={<EmployeeReg />} />
                
              </>
            )}
          </Routes>
        </>
      )}
    </Router>
  );
}


// function App() {

//   return (

//       <Router>

//         <Header/>
//         <Routes>

//           <Route exact path="/add" element={<CreatePatient />} />
//           <Route exact path="/" element={<AllPatient />} />
//           <Route exact path="/get/:id" element={<PatientDetails />} />
//           <Route exact path="/update/:id" element={<UpdatePatient />} />
//           <Route exact path="/delete/:id" element={<DeletePatient />} />

//         </Routes>

//       </Router>

//   );

// }

export default App;
