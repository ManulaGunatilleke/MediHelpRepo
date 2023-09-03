import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';


import { getAllTransport } from "./TransportService";

export default function ViewTransport() {
  const navigate = useNavigate();

  const [Transport, setTransport] = useState([]);
  const [TransportSearch, setSearch] = useState("");

  useEffect(() => {
    getAllTransport().then((data) => {
      console.log("data>>", data.data.existingTransports);
      setTransport(data.data.existingTransports);
    });
  }, []);

  const onDelete = (id) => {
    swal({
      title:
        "This item will be permanently deleted Are You Sure you want to delete this?",

      icon: "warning",
      button: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Transport Details Deleted!", {
          icon: "success",
        });
        axios.delete(`http://localhost:8070/Transport/delete/${id}`);
        swal((window.location = "/view"));
      } else {
        swal("Not Deleted");
      }
    });
  };

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

  const TransportDocument = () => (
    <Document>
        <Page size="A3" style={styles.page}>
            <View style={styles.section}>
                <Text style={{ fontSize: 10, marginBottom: 10 }}>Transport List</Text>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, { flex: 1 }]}>ID</Text>
                    <Text style={[styles.tableCell, { flex: 6 }]}>Driver Name</Text>
                    <Text style={[styles.tableCell, { flex: 6 }]}>Passenger Count</Text>
                    <Text style={[styles.tableCell, { flex: 6 }]}>Start Location</Text>
                    <Text style={[styles.tableCell, { flex: 4 }]}>End Location</Text>           
                    <Text style={[styles.tableCell, { flex: 6 }]}>Transport Status</Text>
                
                </View>
                {Transport.map((item,index) => (
                    <View key={index} style={[styles.tableRow, { borderBottom: '1 solid #ccc' }]}>
                        <Text style={[styles.tableCell, { flex: 1 }]}>{index+1}</Text>
                        <Text style={[styles.tableCell, { flex: 6 }]}>{item.driverName}</Text>
                        <Text style={[styles.tableCell, { flex: 6 }]}>{item.passengerCount}</Text>
                        <Text style={[styles.tableCell, { flex: 6 }]}>{item.startLocation}</Text>
                        <Text style={[styles.tableCell, { flex: 4 }]}>{item.endLocation}</Text>
                        <Text style={[styles.tableCell, { flex: 6 }]}>{item.transportStatus}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
  );

  return (
    <>
    <div style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/783/366/large_2x/blur-hospital-background-free-photo.jpg')", backgroundSize: 'cover', height: '100vh' }}>
      <input
        type="text"
        placeholder="Search.."
        name="search2"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        style={{
          borderRadius: "5px",
          marginTop: "10px",
          marginBottom: "20px",
          width: "40%",
          marginLeft: "767px",
          boxShadow: " 3px 3px 3px rgba(150, 168, 156)",
          backgroundColor: "white",
        }}
      />

      <div className="container" style={{ textAlign: "center", marginTop: "10px" }} >
        <table class="table table-bordered" style={{ textAlign: "center", marginTop: "10px", backgroundColor: "#eaf0f0", borderRadius: "10px" }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Driver Name</th>
              <th scope="col">Passenger Count</th>
              <th scope="col">Start Location</th>
              <th scope="col">End Location</th>
              <th scope="col">Transport Type</th>
              <th scope="col">Transport Date</th>
              <th scope="col">Transport Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Transport &&
              Transport.filter((value) => {
                if (TransportSearch === "") {
                  return value;
                } else if (
                  value.driverName
                    .toLowerCase()
                    .includes(TransportSearch.toLowerCase())
                ) {
                  return value;
                } else if (
                  value.passengerCount
                    .toLowerCase()
                    .includes(TransportSearch.toLowerCase())
                ) {
                  return value;
                } else if (
                  value.startLocation
                    .toLowerCase()
                    .includes(TransportSearch.toLowerCase())
                ) {
                  return value;
                } else if (
                  value.endLocation
                    .toLowerCase()
                    .includes(TransportSearch.toLowerCase())
                ) {
                  return value;
                } else if (
                  value.transportType
                    .toLowerCase()
                    .includes(TransportSearch.toLowerCase())
                ) {
                  return value;
                } else if (
                  value.date
                    .toLowerCase()
                    .includes(TransportSearch.toLowerCase())
                ) {
                  return value;
                }else if (
                  value.transportStatus
                    .toLowerCase()
                    .includes(TransportSearch.toLowerCase())
                  ){
                    return value;
                  }
              }).map((Transport, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{Transport.driverName}</td>
                    <td>{Transport.passengerCount}</td>
                    <td>{Transport.startLocation}</td>
                    <td>{Transport.endLocation}</td>
                    <td>{Transport.transportType}</td>
                    <td>{Transport.date}</td>
                    <td>{Transport.transportStatus}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() =>
                          navigate("/Transport/update", {
                            state: { Transport },
                          })
                        }
                      >
                        Update
                      </button>
                      <button 
                        type="button"
                        class="btn btn-danger"
                        onClick={() => onDelete(Transport._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="container" style={{ padding: 0 }}>
    
          <button className="btn btn-success" style={{ margin: '10px 0'}}>
              <PDFDownloadLink style={{ margin: '10px 0', textDecoration: 'none', color: 'white'}} document={<TransportDocument />} fileName="Transport-document.pdf">
                  {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download Transport report now!'
                  }
              </PDFDownloadLink>
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
