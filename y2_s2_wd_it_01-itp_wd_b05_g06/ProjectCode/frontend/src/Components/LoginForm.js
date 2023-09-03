import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import BImage from '../Images/allImg/MediHelpBIwebp.webp'

export default function LoginForm({ onLogin }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState("");
  
    // const handleLogin = () => {
    //   const credentials = { username, password };
    //   onLogin(credentials);
    // };

    const handleLogin = () => {
      const credentials = { username, password };
      if (userType === 'admin') {
        handleAdminLogin(credentials);
      } else if (userType === 'patient') {
        handlePatientLogin(credentials);
      } else if (userType === 'doctor') {
        handleDoctorLogin(credentials);
      } else if (userType === 'receptionist') {
        handleReceptionLogin(credentials);
      }
    };
  //Handle login submit for admin
  const handleAdminLogin = (credentials) => {
    axios.get('http://localhost:8070/admin/admin')
      .then((res) => {

        // Loop through the admin data and check if any of the entries match the entered credentials
        for (let i = 0; i < res.data.length; i++) {
          const admin = res.data[i];
          if (admin.email === credentials.username && admin.password === credentials.password) {
            // Login was successful, set the userType state to 'admin'
            setUserType('admin');
            onLogin('admin');
            return;
          }
        }
        // Login failed, display an error message
        console.log('Invalid admin login credentials');
      })
      .catch((err) => {
        // An error occurred while sending the request, display an error message
        console.log('An error occurred while trying to log in:', err);
      });
  };

  //Handle login submit for Patient
  const handlePatientLogin = (credentials) => {
    axios.get('http://localhost:8070/patient/')
      .then((res) => {

        // Loop through the admin data and check if any of the entries match the entered credentials
        for (let i = 0; i < res.data.length; i++) {
          const patient = res.data[i];
          if (patient.email === credentials.username && patient.password === credentials.password) {
            // Login was successful, set the userType state to 'patient'
            setUserType('patient');
            onLogin('patient');
            return;
          }
        }
        // Login failed, display an error message
        console.log('Invalid patient login credentials');
      })
      .catch((err) => {
        // An error occurred while sending the request, display an error message
        console.log('An error occurred while trying to log in:', err);
      });
  };

  //Handle login submit for Doctor
  const handleDoctorLogin = (credentials) => {
    axios.get('http://localhost:8070/doctor/')
      .then((res) => {

        // Loop through the admin data and check if any of the entries match the entered credentials
        for (let i = 0; i < res.data.length; i++) {
          const doctor = res.data[i];
          if (doctor.email === credentials.username && doctor.password === credentials.password) {
            // Login was successful, set the userType state to 'doctor'
            setUserType('doctor');
            onLogin('doctor');
            return;
          }
        }
        // Login failed, display an error message
        console.log('Invalid doctor login credentials');
      })
      .catch((err) => {
        // An error occurred while sending the request, display an error message
        console.log('An error occurred while trying to log in:', err);
      });
  };

  //Handle login submit for Reception
  const handleReceptionLogin = (credentials) => {
    axios.get('http://127.0.0.1:8070/employees/')
      .then((res) => {

        // Loop through the admin data and check if any of the entries match the entered credentials
        for (let i = 0; i < res.data.length; i++) {
          const receptionist = res.data[i];
          if (receptionist.email === credentials.username && receptionist.p_Number === credentials.password) {
            // Login was successful, set the userType state to 'Receptionist'
            setUserType('Receptionist');
            onLogin('receptionist');
            return;
          }
        }
        // Login failed, display an error message
        console.log('Invalid receptionist login credentials');
      })
      .catch((err) => {
        // An error occurred while sending the request, display an error message
        console.log('An error occurred while trying to log in:', err);
      });
  };

  
    return (

      <section className="vh-100" style={{ backgroundColor: "#DAF7A6" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">MediHelp</span>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Email"
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Email address
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                        </div>
                        <div className="form-outline mb-3">
                          <label>
                            User type:
                          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                           <option value="admin">Admin</option>
                           <option value="patient">Patient</option>
                           <option value="doctor">Doctor</option>
                           <option value="receptionist">Reception</option>
                          </select>
                          </label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={handleLogin}
                          >
                            Login
                          </button>
                        </div>
                        <a className="small text-muted" href="#!">
                          Forgot password?
                        </a><br/><br/>
                        <p className="mb-2 pb-lg-2" style={{ color: "#393f81" }}>
                          Don't have an account?{" "}
                          <a href="#!" style={{ color: "#393f81" }}>
                            Register here
                          </a>
                        </p>
                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


        //     <section className="vh-100" style={{ margin:'10%'}}>
        //       <div className="container-fluid h-custom">
        //         <div className="row d-flex justify-content-center align-items-center h-100">
        //           <div className="col-md-9 col-lg-6 col-xl-5">
        //             <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
        //               className="img-fluid" alt="Sample image" />
        //           </div>
        //           <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        //             <form>
        //               <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
        //                 <p className="lead fw-normal mb-0 me-3">Sign in with</p>
        //                 <button type="button" className="btn btn-primary btn-floating mx-1">
        //                   <i className="fab fa-facebook-f"></i>
        //                 </button>

        //                 <button type="button" className="btn btn-primary btn-floating mx-1">
        //                   <i className="fab fa-twitter"></i>
        //                 </button>

        //                 <button type="button" className="btn btn-primary btn-floating mx-1">
        //                   <i className="fab fa-linkedin-in"></i>
        //                 </button>
        //               </div>

        //               <div className="divider d-flex align-items-center my-4">
        //                 <p className="text-center fw-bold mx-3 mb-0">Or</p>
        //               </div>

        //               {/* Email input */}
        //               <div className="form-outline mb-4">
        //                 <input type="email" id="form3Example3" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control form-control-lg"
        //                   placeholder="Enter a valid email address" />
        //                 <label className="form-label" htmlFor="form3Example3">Email address</label>
        //               </div>

        //               {/* Password input */}
        //               <div className="form-outline mb-3">
        //                 <input type="password" id="form3Example4" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg"
        //                   placeholder="Enter password" />
        //                 <label className="form-label" htmlFor="form3Example4">Password</label>
        //               </div>

        //               <div className="form-outline mb-3">
        //               <label>
        //               User type:
        //               <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        //                 <option value="admin">Admin</option>
        //                 <option value="patient">Patient</option>
        //                 <option value="doctor">Doctor</option>
        //                 <option value="receptionist">Reception</option>
        //               </select>
        //             </label>
        //             </div>

        //               <div className="text-center text-lg-start mt-4 pt-2">
        //                 <button type="button" className="btn btn-primary btn-lg"
        //                   style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} onClick={handleLogin}>Login</button>
        //                 <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
        //                     className="link-danger">Register</a></p>
        //               </div>

        //             </form>
        //           </div>
        //         </div>
        //       </div>
        // </section>
      // <form>
      //   <label>
      //     First Name:
      //     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      //   </label>
      //   <label>
      //     Password:
      //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      //   </label>
      //   <label>
      //   User type:
      //   <select value={userType} onChange={(e) => setUserType(e.target.value)}>
      //     <option value="admin">Admin</option>
      //     <option value="doctor">Doctor</option>
      //     <option value="receptionist">Reception</option>
      //   </select>
      // </label>
      //   <button type="button" onClick={handleLogin}>Login</button>
      // </form>
    );
  }