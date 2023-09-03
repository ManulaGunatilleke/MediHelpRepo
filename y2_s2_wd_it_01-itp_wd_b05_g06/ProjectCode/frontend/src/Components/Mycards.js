import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import NavBar from "./NavBar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

function Mycards() {
  const [column, setColumns] = useState([]);
  const [payments, setPayment] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  async function deletePayment(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payment?"
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:8070/ipayments/delete/${id}`
        );
        alert("Payment successfully deleted.");
        window.location = "/allpayment";
      } catch (err) {
        console.error(err);
        alert("An error occurred while deleting the payment.");
      }
    } else {
      window.location = "/allpayment";
    }
  }



  useEffect(() => {
    function getPayment() {
      axios
        .get("http://localhost:8070/ipayments/")
        .then((res) => {
          const filteredPayments = res.data.filter((payment) =>
                payment.Cholder.toLowerCase().includes(searchQuery.toLowerCase()) ||
                payment.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
                payment.cvv.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (typeof payment.Cnumber === 'string' && payment.phonenumber.toLowerCase().includes(searchQuery.toLowerCase())) 
                

              );
              setPayment(filteredPayments);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getPayment();
  }, [[searchQuery]]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  }

  const filteredPaymentList = payments.filter((payment) => {
    return (
      payment.Cholder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.cvv.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof payment.Cnumber === 'string' && payment.phonenumber.toLowerCase().includes(searchQuery.toLowerCase()))
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

  const PaymentDocument = () => (
    <Document>
        <Page size="A3" style={styles.page}>
            <View style={styles.section}>
                <Text style={{ fontSize: 10, marginBottom: 10 }}>Payment List</Text>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, { flex: 1 }]}>ID</Text>
                    <Text style={[styles.tableCell, { flex: 4 }]}>Cholder Name</Text>
                    <Text style={[styles.tableCell, { flex: 20 }]}>Cnumber Count</Text>
                    <Text style={[styles.tableCell, { flex: 4 }]}>Date</Text>
                    <Text style={[styles.tableCell, { flex: 4 }]}>cvv</Text>           
                
                </View>
                {payments.map((item,index) => (
                    <View key={index} style={[styles.tableRow, { borderBottom: '1 solid #ccc' }]}>
                        <Text style={[styles.tableCell, { flex: 1 }]}>{index+1}</Text>
                        <Text style={[styles.tableCell, { flex: 4 }]}>{item.Cholder}</Text>
                        <Text style={[styles.tableCell, { flex: 20 }]}>{item.Cnumber}</Text>
                        <Text style={[styles.tableCell, { flex: 4 }]}>{item.date}</Text>
                        <Text style={[styles.tableCell, { flex: 4 }]}>{item.cvv}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
  );

  return (
    <div style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/783/366/large_2x/blur-hospital-background-free-photo.jpg')", backgroundSize: 'cover', height: '100vh' }}>
    <div>
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
      <div>
        <Container className="my-5" style={{ width: "70%" }}>
          <Row className="align-items-center">
            <Col md={12}>
              <h2 className="mb-3">
                Save your card details for future transactions!
              </h2>
              <p style={{ fontSize: "17px" }}>
                It's important to note that we take the security of your
                personal and financial information very seriously. Our website
                uses industry-standard encryption technology to protect your
                data and ensure that it is kept confidential. Additionally, we
                never store your full card number on our servers - instead, we
                use a secure tokenization process to encrypt and store your card
                details.
              </p>
              <p style={{ fontSize: "17px" }}>
                If you have any concerns or questions about our payment security
                measures or how to save your card details, please don't hesitate
                to contact us via phone or email. Our customer support team is
                available 24/7 to assist you and address any issues you may
                encounter.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div class="container" style={{ padding: 0, marginLeft:"42%"}}>  
          <button className="btn btn-success" style={{ margin: '10px 0',}}>
                <PDFDownloadLink style={{ margin: '10px 0', textDecoration: 'none', color: 'white'}} document={<PaymentDocument />} fileName="Payment-document.pdf">
                    {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download Payment report now!'
                    }
                </PDFDownloadLink>
          </button>
       </div>
      
      <div class="container" style={{ marginBottom: "50px" }}>
        <div class="row">
          <div class="col-12">
            <center>
              <h1>Payment Details</h1>
            </center>
            <center>
              <h2>MY CARD</h2>
            </center>
            <center>
              {" "}
              <Link
                to ="/allpayment"
                
              >{" "}
         

              </Link>
                
            </center>
            <div class="card-group" >
              {filteredPaymentList.map((payments, index) => (
                <div
                  key={index}
                  class="card text-center"
                  style={{ width: "18rem" }}
                  style={{ backgroundColor: "#eaf0f0" }}
                >
                  <div class="card-body">
                    <h5 class="card-title">CARD {index + 1}</h5>
                    <p>{payments.Cholder}</p>
                    <p>{payments.Cnumber}</p>
                    <p>{payments.date}</p>
                    <p>{payments.cvv}</p>
                    <a  className="btn btn-warning" href={"payment/update/" + payments._id} style = {{textDecoration:"none"}}>
                            <i class="fas fa-edit">&nbsp; Update</i>
                    </a>
        
                    <br />
                    <Link
                      to ="/"
                      onClick={() => deletePayment(payments._id)}
                      class="btn btn-danger mt-1"
                    >
                      Remove
                    </Link>
                    <br />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Mycards;
