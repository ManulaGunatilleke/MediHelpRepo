import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';  
import axios from "axios";

export default function CreatePatient() {

    let navigate = useNavigate();

    const [fname,setfName] = useState("");
    const [lname,setlName] = useState("");
    const [age,setAge] = useState("");
    const [gender,setGender] = useState("");
    const [phonenumber,setPhoneNumber] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    // for radio gender option
    const handleOptionChange = (event) => {
        setGender(event.target.value);
      }

    function sendData(e){

        e.preventDefault();

        // Validate form data
        if (!fname || !lname || !age || !gender || !phonenumber || !email || !password) {
            alert("Please fill in all the fields");
            return;
          }
        
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
          }
        
          const phoneRegex = /^\d{10}$/;
          if (!phoneRegex.test(phonenumber)) {
            alert("Please enter a valid phone number");
            return;
          }
        
          const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
          if (!passwordRegex.test(password)) {
            alert("Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter and 1 number");
            return;
          }

          if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
          }
        
        const newPatient ={
            fname,
            lname,
            age,
            gender,
            phonenumber,
            email,
            password,
        }

        // console.log(newStudent);

        axios.post("http://localhost:8070/patient/add",newPatient).then(()=>{
            alert("Patient Created");
            navigate('/');           
        }).catch((err)=>{
            alert(err)
        })

    }



    return(

        <div style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/783/366/large_2x/blur-hospital-background-free-photo.jpg')", backgroundSize: 'cover', height: '100vh' }}>
        <div className = "container">

                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration" style={{borderRadius: '15px', backgroundColor: "#eaf0f0"}}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form for Patient</h3>
                                <form onSubmit={sendData}>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="firstName">First Name</label>
                                            <input type="text" id="firstName" className="form-control form-control-lg" placeholder="Enter Patient First Name" onChange={(e) => setfName(e.target.value)} required/>  
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="lastName">Last Name</label>
                                            <input type="text" id="lastName" className="form-control form-control-lg" placeholder="Enter Patient Last Name" onChange={(e) => setlName(e.target.value)} required/>                                       
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-4 d-flex align-items-center">
                                        <div className="form-outline datepicker w-100">
                                            <label htmlFor="age" className="form-label">Age</label>
                                            <input type="text" className="form-control form-control-lg" id="age" placeholder="Enter Patient Age" onChange={(e) => setAge(e.target.value)} required/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <h6 className="mb-2 pb-1">Gender: </h6>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender" value="Female" onChange={handleOptionChange} />
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="maleGender">Male</label>
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender" value="Male" onChange={handleOptionChange} />
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="otherGender">Other</label>
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender" value="Other" onChange={handleOptionChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-4 pb-2">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="emailAddress">Email</label>
                                            <input type="email" id="emailAddress" className="form-control form-control-lg" placeholder="Enter Patient Email" onChange={(e) => setEmail(e.target.value)} required/>     
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4 pb-2">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                            <input type="tel" id="phoneNumber" className="form-control form-control-lg" placeholder="Enter Patient Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} required/>                          
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example4cg">
                                        Password
                                        </label>
                                        <input
                                        type="password"
                                        id="form3Example4cg"
                                        className="form-control form-control-lg"
                                        placeholder="Enter Password"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example4cdg">
                                        Repeat your password
                                        </label>
                                        <input
                                        type="password"
                                        id="form3Example4cdg"
                                        className="form-control form-control-lg"
                                        placeholder="Enter Re-Password"
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                        }} 
                                        />
                                    </div>

                                    <div className="mt-4 pt-2">
                                        <button type="submit" className="btn btn-primary">
                                        Submit
                                        </button>
                                    </div>
                                    </div>

                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                
                

            
        </div>
        </div>

    )

}