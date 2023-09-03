import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';      

export default function UpdateAppointment(){

    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [doctor, setDoctor] = useState("");
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8070/appointment/appointment/get/${id}`).then((res) => {
            setName(res.data.appointment.name);
            setAge(res.data.appointment.age);
            setGender(res.data.appointment.gender);
            setPhonenumber(res.data.appointment.phonenumber);
            setEmail(res.data.appointment.email);
            setDoctor(res.data.appointment.doctor);
        }).catch((err) => {
            console.log(err);
        })
    },[id]);

    const onSubmit = async (e) => {
        e.preventDefault();

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
        
        const updateAppointment = {
            name,
            age,
            gender,
            phonenumber,
            email,
            doctor
        };
        await axios.put(`http://localhost:8070/appointment/appointment/update/${id}`, updateAppointment)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
        navigate('/allappointment');
    }

    return (
        <div style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/783/366/large_2x/blur-hospital-background-free-photo.jpg')", backgroundSize: 'cover', height: '100vh' }}>
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label" style={{ marginTop: "30px", marginLeft: "2px", fontWeight: "bold" }}>Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label" style={{ marginTop: "30px", marginLeft: "2px", fontWeight: "bold" }}>Age</label>
                    <input type="number" className="form-control" id="age" name="age" value={age} onChange={(e) => setAge(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label" style={{ marginTop: "30px", marginLeft: "2px", fontWeight: "bold" }}>Gender</label>
                    <select className="form-control" id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} required >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="phonenumber" className="form-label" style={{ marginTop: "30px", marginLeft: "2px", fontWeight: "bold" }}>Phone Number</label>
                    <input type="text" className="form-control" id="phonenumber" name="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ marginTop: "30px", marginLeft: "2px", fontWeight: "bold" }}>Email address</label>
                    <input type="email" className="form-control" id ="Email" name ="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Doctor" className="form-label" style={{ marginTop: "30px", marginLeft: "2px", fontWeight: "bold" }}>Doctor</label>
                    <input type="Doctor" className="form-control" id ="Doctor" name ="Doctor" value={doctor} onChange={(e) => setDoctor(e.target.value)} required />
                </div>
                <div className="mt-4 pt-2">
                    <button type="submit" className="btn btn-primary">Update Appointment</button>
                </div>
            </form>
        </div>
        </div>
    );

}