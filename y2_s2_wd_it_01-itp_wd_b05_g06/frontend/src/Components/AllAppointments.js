import axios from "axios";
import React, { useState, useEffect } from "react";
//import { useNavigate } from 'react-router-dom'; 
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

//import {Route, Link, Routes, useParams} from 'react-router-dom';

export default function AllAppointment(){

    
    const [Appointment,setAppointment] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    //const navigate = useNavigate();

    useEffect(()=>{
        function getAppointment(){
            axios.get("http://localhost:8070/appointment/appointment").then((res)=>{
                const filteredAppointments = res.data.filter((appointment) =>
                appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                appointment.age.toString().includes(searchQuery) ||
                appointment.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (typeof appointment.phonenumber === 'string' && appointment.phonenumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
                appointment.email.toLowerCase().includes(searchQuery.toLowerCase())

              );
              setAppointment(filteredAppointments);             
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getAppointment();
    }, [searchQuery])

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    const filteredAppointmentList = Appointment.filter((appointment) => {
        return (
            appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            appointment.age.toString().includes(searchQuery) ||
            appointment.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (typeof appointment.phonenumber === 'string' && appointment.phonenumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
            appointment.email.toLowerCase().includes(searchQuery.toLowerCase())
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

    const AppointmentDocument = () => (
        <Document>
            <Page size="A3" style={styles.page}>
                <View style={styles.section}>
                    <Text style={{ fontSize: 10, marginBottom: 10 }}>Appointment List</Text>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={[styles.tableCell, { flex: 1 }]}>ID</Text>
                        <Text style={[styles.tableCell, { flex: 6 }]}>Name</Text>
                        <Text style={[styles.tableCell, { flex: 4 }]}>Age</Text>
                        <Text style={[styles.tableCell, { flex: 6 }]}>Gender</Text>
                        <Text style={[styles.tableCell, { flex: 10 }]}>Phone Number</Text>
                        <Text style={[styles.tableCell, { flex: 18 }]}>Email</Text>
                        <Text style={[styles.tableCell, { flex: 7 }]}>Doctor</Text>
                    </View>
                    {Appointment.map((item,index) => (
                        <View key={index} style={[styles.tableRow, { borderBottom: '1 solid #ccc' }]}>
                            <Text style={[styles.tableCell, { flex: 1 }]}>{index+1}</Text>
                            <Text style={[styles.tableCell, { flex: 6 }]}>{item.name}</Text>
                            <Text style={[styles.tableCell, { flex: 4 }]}>{item.age}</Text>
                            <Text style={[styles.tableCell, { flex: 6 }]}>{item.gender}</Text>
                            <Text style={[styles.tableCell, { flex: 10 }]}>{item.phonenumber}</Text>
                            <Text style={[styles.tableCell, { flex: 18 }]}>{item.email}</Text>
                            <Text style={[styles.tableCell, { flex: 7 }]}>{item.doctor}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
    

    return(
        <div style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/783/366/large_2x/blur-hospital-background-free-photo.jpg')", backgroundSize: 'cover', height: '100vh' }}>
        <div id="container" style={{height:"100%"}}>
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
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Doctor</th>
                        <th scope="col">Delete/Update</th>
                    </tr>
                </thead>
                <tbody>{filteredAppointmentList.map((item,index) => (
                    <tr key={index}>
                        <td>{index+1}</td>   
                        <td> 
                            <a href= {"get/" + item._id} style = {{textDecoration:"none"}}>{item.name}</a>
                        </td>
                        <td>{item.age}</td>
                        <td>{item.gender}</td>
                        <td>{item.phonenumber}</td>
                        <td>{item.email}</td>
                        <td>{item.doctor}</td>
                        <td>
                        <a  className="btn btn-warning" id="buttonu" href={"appointment/update/" + item._id} style = {{textDecoration:"none"}}>
                            <i className="fas fa-edit">&nbsp; Update</i>
                        </a> &nbsp;
                        <a  className="btn btn-danger" id="buttond" href={"appointment/delete/" + item._id} style = {{textDecoration:"none"}}>
                            <i className="far fa-trash-alt">&nbsp; Delete</i>
                        </a> 
                        
                        </td>
                    </tr>
                ))}       
                </tbody>
            </table>
            <div className="container" style={{ padding: 0 }}>
                &nbsp;
                <button className="btn btn-success" style={{ margin: '10px 0'}}>
                    <PDFDownloadLink style={{ margin: '10px 0', textDecoration: 'none', color: 'white'}} document={<AppointmentDocument />} fileName="Appointment-document.pdf">
                        {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : 'Download Appointment report now!'
                        }
                    </PDFDownloadLink>
                </button>
            </div>                  
        </div>
        </div>
    );
}   