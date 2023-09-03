import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';      

export default function UpdateAdmin(){

    let navigate = useNavigate();

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8070/admin/admin/get/${id}`).then((res) => {
            setFname(res.data.Admin.fname);
            setLname(res.data.Admin.lname);
            setAge(res.data.Admin.age);
            setGender(res.data.Admin.gender);
            setPhonenumber(res.data.Admin.phonenumber);
            setEmail(res.data.Admin.email);
            setPassword(res.data.Admin.password);
        }).catch((err) => {
            console.log(err);
        })
    },[id]);

    const onSubmit = async (e) => {
        e.preventDefault();

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
          
        const updateAdmin = {
            fname,
            lname,
            age,
            gender,
            phonenumber,
            email,
            password
        };
        await axios.put(`http://localhost:8070/admin/admin/update/${id}`, updateAdmin)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
        navigate("/alladmin");
    }

    return (
        <div style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/783/366/large_2x/blur-hospital-background-free-photo.jpg')", backgroundSize: 'cover', height: '100vh' }}>
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }} htmlFor="fname" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="fname" name="fname" value={fname} onChange={(e) => setFname(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }} htmlFor="lname" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lname" name="lname" value={lname} onChange={(e) => setLname(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }} htmlFor="age" className="form-label">Age</label>
                    <input type="number" className="form-control" id="age" name="age" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }} htmlFor="gender" className="form-label">Gender</label>
                    <select className="form-control" id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }} htmlFor="phonenumber" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" id="phonenumber" name="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }} htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id ="Email" name ="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }} htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id ="Password" name ="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mt-4 pt-2">
                    <button type="submit" className="btn btn-primary">Update Admin</button>
                </div>
            </form>
        </div>
        </div>
        );

    }