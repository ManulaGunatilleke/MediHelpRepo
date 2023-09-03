import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';      

export default function UpdateDoctor(){

    let navigate = useNavigate();

    const [funame, setFuname] = useState("");
    const [Specialization, setSpecialization] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8070/doctor/get/${id}`).then((res) => {
            setFuname(res.data.doctor.funame);
            setSpecialization(res.data.doctor.Specialization);
            setAge(res.data.doctor.age);
            setGender(res.data.doctor.gender);
            setPhonenumber(res.data.doctor.phonenumber);
            setEmail(res.data.doctor.email);
            setPassword(res.data.doctor.password);
        }).catch((err) => {
            console.log(err);
        })
    },[id]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!funame || !Specialization || !age || !gender || !phonenumber || !email || !password) {
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

        const updateDoctor = {
            funame,
            Specialization,
            age,
            gender,
            phonenumber,
            email,
            password
        };
        await axios.put(`http://localhost:8070/doctor/update/${id}`, updateDoctor)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
        navigate('/');
    }

    return (
        <div style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/783/366/large_2x/blur-hospital-background-free-photo.jpg')", backgroundSize: 'cover', height: '100vh' }}>
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="fname" className="form-label" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Full Name</label>
                    <input type="text" className="form-control" id="funame" name="funame" value={funame} onChange={(e) => setFuname(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="lname" className="form-label" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Specialization</label>
                    <input type="text" className="form-control" id="Specialization" name="Specialization" value={Specialization} onChange={(e) => setSpecialization(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Age</label>
                    <input type="number" className="form-control" id="age" name="age" value={age} onChange={(e) => setAge(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Gender</label>
                    <select className="form-control" id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} required >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="phonenumber" className="form-label" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Phone Number</label>
                    <input type="text" className="form-control" id="phonenumber" name="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Email address</label>
                    <input type="email" className="form-control" id ="Email" name ="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Password</label>
                    <input type="password" className="form-control" id ="Password" name ="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="mt-4 pt-2">
                    <button type="submit" className="btn btn-primary" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Update Doctor</button>
                </div>
            </form>
        </div>
        </div>
    );

}