import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';  
import axios from "axios";

export default function PatientAppointment() {

    let navigate = useNavigate();

    const [name,setName] = useState("");
    const [age,setAge] = useState("");
    const [gender,setGender] = useState("");
    const [phonenumber,setPhoneNumber] = useState("");
    const [email,setEmail] = useState("");
    const [doctor,setDoctor] = useState("");
    const { id } = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:8070/doctor/get/${id}`).then((res) => {

            setDoctor(res.data.doctor.funame);
            
        }).catch((err) => {
            console.log(err);
        })
    },[id]);
    // for radio gender option
    const handleOptionChange = (event) => {
        setGender(event.target.value);
      }

    function sendData(e){

        e.preventDefault();

        // Validate form data
        if (!name || !age || !gender || !phonenumber || !email || !doctor) {
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
        
        const newAppointment ={
            name,
            age,
            gender,
            phonenumber,
            email,
            doctor,
            
        }

        // console.log(newStudent);

        axios.post("http://localhost:8070/appointment/appointment/add",newAppointment).then(()=>{
            alert("Next Step is to Done the Payment");
            navigate("/add/payment");           
        }).catch((err)=>{
            alert(err)
        })

    }



    return(


        <div className = "container">

                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration" style={{borderRadius: '15px', backgroundColor: "#eaf0f0"}}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Appointment Form</h3>
                                <form onSubmit={sendData}>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="firstName">Name</label>
                                            <input type="text" id="firstName" className="form-control form-control-lg" placeholder="Enter Patient First Name" onChange={(e) => setName(e.target.value)} required/>  
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="doctor">Doctor</label>
                                            <input type="text" id="doctor" className="form-control form-control-lg" value={doctor} onChange={(e) => setDoctor(e.target.value)} required/>  
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
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender" value="Female" onChange={handleOptionChange} required/>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="maleGender">Male</label>
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender" value="Male" onChange={handleOptionChange} required/>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="otherGender">Other</label>
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender" value="Other" onChange={handleOptionChange} required/>
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

                                    <div className="mt-4 pt-2">
                                        <button type="submit" className="btn btn-primary">
                                        Next
                                        </button>
                                    </div>

                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                
                

            
        </div>

    )

}