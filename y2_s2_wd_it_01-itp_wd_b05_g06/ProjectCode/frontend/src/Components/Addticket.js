import  React, { useState , useEffect } from 'react'


import { Card, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import axios from "axios";
import FileBase from "react-file-base64";


export default function Addticket() {
  const [name, setname] = useState("");
  const [userId, setuserId] = useState("");
  const [ticketID, setticketID] = useState(" ");
  const [email, setemail] = useState(" ");
  const [contact, setcontact] = useState(" ");
  const [requesttype, setrequesttype] = useState(" ");
  const [message, setmessage] = useState(" ");
  const [fileEnc, fileEncData] = useState(" ");
  const [show, setShow] = useState(false);
  const [date, setaddeddate] = useState(" ");
  const [status, setstatus] = useState(" ");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var [adddate,setDate] = useState(new Date());
    
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
        const  putdate=adddate.toLocaleDateString();
        setaddeddate(putdate);
      }
  
  });

  function sendData(e) {


    e.preventDefault();

    const newTicket = {
      name,
      userId,
      ticketID,
      email,
      contact,
      requesttype,
      message,
      fileEnc,
      date ,
      status
    }

    axios.post("http://localhost:8070/ticket/", newTicket).then(() => {
      ("Ticket  added")
      setname('');
      setuserId('');
      setticketID('');
      setemail('');
      setcontact('');
      setrequesttype('');
      setmessage('');
      fileEncData('');
      setaddeddate('');
      setstatus('');

      alert("Ticket added ..");
      window.location = './view'

    }).catch((err) => {
      alert("error");
    })
  }
  function refreshPage() {
    window.location.reload(false);
  }

  
  return (
    <div>


      <div style={{ paddingLeft: '5vh', paddingTop: '1vh', paddingBottom: '5vh', paddingRight: '5vh' }}>
        <Button variant="primary" size="lg" onClick={handleShow} style={{ float: 'right' }}>
          RAISE TICKET
        </Button>
        
          <a href= "/view" id='view'>View Tickets</a>
        

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card style={{
            }} >
              <Card.Body>


                <Form onSubmit={sendData}>

                  <br />
                  <div>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="name">
                          <Form.Label>Name:</Form.Label>
                          <Form.Control type="text" name='name'
                            onChange={(e) => setname(e.target.value)}
                            placeholder=" Name  .." required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="userid">
                          <Form.Label >user ID : </Form.Label>
                          <Form.Control type="text"
                            onChange={(e) => setuserId(e.target.value)}

                            placeholder=" User id .." />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label > Contact Number: </Form.Label>
                          <Form.Control type="number"
                            onChange={(e) => setcontact(e.target.value)}
                            placeholder=" Contact Number .." required />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label >Email : </Form.Label>
                          <Form.Control type="email"
                            onChange={(e) => setemail(e.target.value)}
                            placeholder=" Email  .." required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="ticketid">
                          <Form.Label >Subject : </Form.Label>
                          <Form.Control type="text"
                            onChange={(e) => setticketID(e.target.value)}

                            placeholder=" Subject .." required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label > Request Type: </Form.Label>
                          <Form.Control type="text"
                            onChange={(e) => setrequesttype(e.target.value)}
                            placeholder=" Request Type .." required />
                        </Form.Group>
                      </Col>

                    </Row>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label > Message: </Form.Label>
                      <Form.Control type="text" as="textarea" rows={3}
                        onChange={(e) => setmessage(e.target.value)}
                        placeholder=" Message .." required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label > Date: </Form.Label>
                      <Form.Control type="text" 
                      value={adddate.toLocaleDateString()}
                      disabled />
                    </Form.Group>

                    <Form.Group controlId="fileupload">
                      <Form.Label> Attachment</Form.Label>
                      <h6>**Please do not exceed the amount of file size 50MB </h6>
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => {
                          fileEncData(base64);
                        }}
                      />
                      
                    </Form.Group>

                  </div>

                  <div style={{ paddingLeft: "40%" }}>
                    <Button type="submit" variant="success"> Save </Button>{' '} {' '}<Button variant="danger" onClick={refreshPage}>- Clear -</Button>

                  </div>
                </Form>

              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
        <div style={{ paddingTop: '10vh' }}>

          <b class="text-center"><h1>How to create and submit your issue correctly </h1></b>
          <br /><br /><br />
          
          <div style={{ paddingLeft: '15vh', paddingRight: '2vh' }}>
            <h5 className='text-white'><p className='text-black text-sm-left'>Sure, here's a possible rewording:

To contact the support team, follow these steps:</p><br/>
<div className='container p-3 mb-2 bg-secondary text-white border-0 rounded '>
1. Log in: Start by logging in to your account using your credentials. If you don't have an account, you can create one by clicking on the "Register" button.<br/>

2. Submit a ticket: Once you're logged in, click on the "Submit a Ticket" button to access the ticket submission form.<br/>

3. Select inquiry type: Choose the appropriate inquiry type from the dropdown menu provided in the form.<br/>

4. Provide details: In the text box provided, give a detailed description of your issue, including any relevant information or attached files. This will help the support team to understand and resolve your inquiry quickly and efficiently.<br/>

5. Submit ticket: Finally, click on the "Submit" button to send your ticket. You will receive a confirmation message once your ticket has been successfully submitted.</div></h5>
       
          </div>
        </div>


      </div><br />


    </div>
  );
}
