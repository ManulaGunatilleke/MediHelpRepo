import axios from "axios";
import React, { useState, useEffect } from "react";
//import { useNavigate } from 'react-router-dom'; 
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

//import {Route, Link, Routes, useParams} from 'react-router-dom';

export default function AllPatient(){

    
    const [patient,setPatient] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    //const navigate = useNavigate();

    useEffect(()=>{
        function getPatient(){
            axios.get("http://localhost:8070/patient/").then((res)=>{
                    const filteredPatients = res.data.filter((patient) =>
                    patient.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    patient.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    patient.age.toString().includes(searchQuery) ||
                    patient.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (typeof patient.phonenumber === 'string' && patient.phonenumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    patient.email.toLowerCase().includes(searchQuery.toLowerCase())
                    )  
                    setPatient(filteredPatients);            
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getPatient();
    }, [])

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    const filteredPatientList = patient.filter((patient) => {
        return (
            patient.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.age.toString().includes(searchQuery) ||
            patient.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (typeof patient.phonenumber === 'string' && patient.phonenumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
            patient.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })

    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#ffffff',
            padding: 20
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        },
        tableHeader: {
            backgroundColor: '#f2f2f2'
        },
        tableRow: {
            flexDirection: 'row'
        },
        tableCell: {
            padding: 5
        }
    });

    const PatientDocument = () => (
        <Document>
            <Page size="A3" style={styles.page}>
                <View style={styles.section}>
                    <Text style={{ fontSize: 10, marginBottom: 10 }}>Patient List</Text>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={[styles.tableCell, { flex: 1 }]}>ID</Text>
                        <Text style={[styles.tableCell, { flex: 6 }]}>First Name</Text>
                        <Text style={[styles.tableCell, { flex: 6 }]}>Last Name</Text>
                        <Text style={[styles.tableCell, { flex: 4 }]}>Age</Text>
                        <Text style={[styles.tableCell, { flex: 6 }]}>Gender</Text>
                        <Text style={[styles.tableCell, { flex: 10 }]}>Phone Number</Text>
                        <Text style={[styles.tableCell, { flex: 18 }]}>Email</Text>
                        <Text style={[styles.tableCell, { flex: 7 }]}>Password</Text>
                    </View>
                    {patient.map((item,index) => (
                        <View key={index} style={[styles.tableRow, { borderBottom: '1 solid #ccc' }]}>
                            <Text style={[styles.tableCell, { flex: 1 }]}>{index+1}</Text>
                            <Text style={[styles.tableCell, { flex: 6 }]}>{item.fname}</Text>
                            <Text style={[styles.tableCell, { flex: 6 }]}>{item.lname}</Text>
                            <Text style={[styles.tableCell, { flex: 4 }]}>{item.age}</Text>
                            <Text style={[styles.tableCell, { flex: 6 }]}>{item.gender}</Text>
                            <Text style={[styles.tableCell, { flex: 10 }]}>{item.phonenumber}</Text>
                            <Text style={[styles.tableCell, { flex: 18 }]}>{item.email}</Text>
                            <Text style={[styles.tableCell, { flex: 7 }]}>{item.password}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
    

    return(
        <div style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/783/366/large_2x/blur-hospital-background-free-photo.jpg')", backgroundSize: 'cover', height: '100vh' }}>
        <div id="container" style={{heigh: "100%"}}>
            <div className="search-container">
                <input type="text" placeholder="Search..." onChange={handleSearch} 
                style={{
                    borderRadius: "5px",
                    marginTop: "20px",
                    alignItems:"center",
                    marginBottom: "20px",
                    width: "20%",
                    marginLeft: "700px",
                    boxShadow: " 3px 3px 3px rgba(150, 168, 156)",
                    backgroundColor: "white",
                  }}/>
            </div>
            <table id="table" style={{ textAlign: "center", marginTop: "10px", backgroundColor: "#eaf0f0", borderRadius: "10px" }}>
                <thead className="table table-bordered">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Delete/Update</th>
                    </tr>
                </thead>
                <tbody className="table table-bordered">{filteredPatientList.map((item,index) => (
                    <tr key={index}>
                        <td>{index+1}</td>   
                        <td> 
                            <a href= {"get/" + item._id} style = {{textDecoration:"none"}}>{item.fname}</a></td>
                        <td>{item.lname}</td>
                        <td>{item.age}</td>
                        <td>{item.gender}</td>
                        <td>{item.phonenumber}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td>
                        <a  className="btn btn-warning" id="buttonu" href={"update/" + item._id} style = {{textDecoration:"none"}}>
                            <i className="fas fa-edit">&nbsp; Update</i>
                        </a> &nbsp;
                        <a  className="btn btn-danger" id= "buttond" href={"delete/" + item._id} style = {{textDecoration:"none"}}>
                            <i className="far fa-trash-alt">&nbsp; Delete</i>
                        </a> 
                        
                        </td>
                    </tr>
                ))}       
                </tbody>
            </table>
            <div className="container" style={{ padding: 0 }}>
                <button className="btn btn-success" style={{ margin: '10px 0' }}>
                    <a href="/add" style={{ textDecoration: 'none', color: 'white' }}>&nbsp; Add New Patient</a>
                </button>&nbsp;
                <button className="btn btn-success"  style={{ margin: '10px 0'}}>
                    <PDFDownloadLink style={{ margin: '10px 0', textDecoration: 'none', color: 'white'}} document={<PatientDocument />} fileName="Patient-document.pdf">
                        {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : 'Download Patient report now!'
                        }
                    </PDFDownloadLink>
                </button>
            </div>                  
        </div>
        </div>
    );
}   