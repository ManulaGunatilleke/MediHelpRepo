import axios from "axios";
import React, { useState, useEffect } from "react";
//import { useNavigate } from 'react-router-dom'; 

//import {Route, Link, Routes, useParams} from 'react-router-dom';

export default function AllDoctor(){

    
    const [doctor,setDoctor] = useState([]);
    //const navigate = useNavigate();

    useEffect(()=>{
        function getDoctor(){
            axios.get("http://localhost:8070/doctor/").then((res)=>{
                setDoctor(res.data)
                console.log(res);
                // console.log(res);               
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getDoctor();
    }, [])
    

    return(
        <div id="container">
            <table id="table"style={{ textAlign: "center", marginTop: "10px", backgroundColor: "#eaf0f0", borderRadius: "10px"}}>
                <thead className="table table-bordered">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Specialization</th>
                        <th scope="col">Age</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Schedule Appontment Now</th>
                    </tr>
                </thead>
                <tbody className="table table-bordered">{doctor.map((item,index) => (
                    <tr key={index}>
                        <td>{index+1}</td>   
                        <td> 
                            <a href= {"get/" + item._id} style = {{textDecoration:"none"}}>{item.funame}</a></td>
                        <td>{item.Specialization}</td>
                        <td>{item.age}</td>
                        <td>{item.gender}</td>
                        <td>{item.phonenumber}</td>
                        <td>{item.email}</td>
                        
                        <td>
                        <a  className="btn btn-warning" id="buttonu" href={"doctor/appointment/" + item._id} style = {{textDecoration:"none"}}>
                            <i className="fas fa-edit">&nbsp; Schedule Appointment</i>
                        </a> &nbsp; 
                        
                        </td>
                    </tr>
                ))}       
                </tbody>
            </table>
                             
        </div>
    );
}   