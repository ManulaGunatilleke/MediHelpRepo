import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import { useFormik } from "formik";
import background from '../assets/background_img.png';

function EmployeeReg() {
  const { type, id } = useParams();

  const navigate = useNavigate();

  const isEdit = type === "edit";
  console.log(isEdit)

  const [toBeEditedEmpData, setToBeEditedEmpData] = useState(null);

  const registerUser = async (values) => {
    const response = await fetch("http://127.0.0.1:8070/employees/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    return response.json();
  };

  const updateEmployee = async (values) => {
    const response = await fetch(
      `http://127.0.0.1:8070/employees/update/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    return response.json();
  };

  useEffect(() => {
    if (!isEdit) {
      return;
    }
    fetch(`http://127.0.0.1:8070/employees/get/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData.success) setToBeEditedEmpData(jsonData.data);
      });
  }, []);

  console.log("jsonData : ", toBeEditedEmpData);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: isEdit ? toBeEditedEmpData?.firstName : "",
      lastName: isEdit ? toBeEditedEmpData?.lastName : "",
      dob: isEdit ? toBeEditedEmpData?.dob : "",
      email: isEdit ? toBeEditedEmpData?.email : "",
      p_Number: isEdit ? toBeEditedEmpData?.p_Number : "",
      gender: isEdit ? toBeEditedEmpData?.gender : "",
      city: isEdit ? toBeEditedEmpData?.city : "",
      address: isEdit ? toBeEditedEmpData?.address : "",
      province: isEdit ? toBeEditedEmpData?.province : "",
      postal: isEdit ? toBeEditedEmpData?.postal : "",
      position: isEdit ? toBeEditedEmpData?.position : "",
      typeofwork: isEdit ? toBeEditedEmpData?.typeofwork : "",
      addtionalInfor: isEdit ? toBeEditedEmpData?.addtionalInfor : "",
      CV: isEdit ? toBeEditedEmpData?.CV : "",
    },
    onSubmit: async (values) => {
      if (isEdit) {
        updateEmployee(values)
          .then((data) => {
            console.log("update response : ", data);
            if (data?.success) {
              navigate("/employee/list");
            }
          })
          .catch((error) => console.error(error));
      } else {
        registerUser(values).then((data) => {
          console.log("response :::: ", data);
        });
      }
    },
    // validationSchema
  });


  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      width: "100%",
      height: "100%",
    }}>
      <Container>
        <b>
          <div className="EmployeeReg">
            <header className="EmployeeReg">
              <br></br>
              <h1>Employee Registration</h1>
              <br></br>
            </header>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      name="firstName"
                      type="Text"
                      onChange={formik.handleChange}
                      placeholder="Enter First Name"
                      value={formik.values.firstName}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      type="Text"
                      name="lastName"
                      onChange={formik.handleChange}
                      placeholder="Enter Last Name"
                      value={formik.values.lastName}
                    />
                  </Form.Group>
                </Col>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Date Of Birth</Form.Label>
                      <Form.Control
                        type="Text"
                        name="dob"
                        required
                        onChange={formik.handleChange}
                        placeholder="Enter Date Of Birth"
                        value={formik.values.dob}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Col>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        name="gender"
                        onChange={formik.handleChange}
                        aria-label="Default select example"
                        value={formik.values.gender}
                      >
                        <option>select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      name="email"
                      onChange={formik.handleChange}
                      type="email"
                      placeholder="Enter Email"
                      value={formik.values.email}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Col>
                <Row>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>phone number</Form.Label>
                    <Form.Control
                      required
                      name="p_Number"
                      onChange={formik.handleChange}
                      type="Text"
                      placeholder="Enter Phone Number"
                      value={formik.values.p_Number}
                    />
                  </Form.Group>
                </Row>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    required
                    name="address"
                    onChange={formik.handleChange}
                    type="Text"
                    placeholder="Enter Address"
                    value={formik.values.address}
                  />
                </Form.Group>
              </Col>


              <Col>
                <row>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      name="city"
                      onChange={formik.handleChange}
                      type="Text"
                      placeholder="Enter City"
                      value={formik.values.city}
                    />
                  </Form.Group>
                </row> 
              </Col>

              <Col>
                <row>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>province</Form.Label>
                    <Form.Control
                      required
                      name="province"
                      onChange={formik.handleChange}
                      type="text"
                      placeholder="Enter Province"
                      value={formik.values.province}
                    />
                  </Form.Group>
                </row>
              </Col>

              <Col>
                <row>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Postal/Zip code</Form.Label>
                    <Form.Control
                      required
                      name="postal"
                      onChange={formik.handleChange}
                      type="number"
                      placeholder="Enter Zip Code"
                      value={formik.values.postal}
                    />
                  </Form.Group>
                </row>
              </Col>
              <Col>
                <Row>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Applying position</Form.Label>
                    <Form.Control
                      required
                      name="position"
                      onChange={formik.handleChange}
                      type="Text"
                      placeholder="Enter Applying Position"
                      value={formik.values.position}
                    />
                  </Form.Group>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Type of work</Form.Label>
                    <Form.Select
                      name="typeofwork"
                      onChange={formik.handleChange}
                      aria-label="Default select example"
                      value={formik.values.typeofwork}
                    >
                      <option>select Type of work</option>
                      <option value="Permanent">Permanent</option>
                      <option value="Both">Both</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
              </Col>

              <Row>
                <Col>

                  <Form.Label>Please upload your resume :</Form.Label>
                  <input type="file"></input>

                </Col>
                <Col>

                  <Form.Label>Cover letter or additional info :</Form.Label>
                  <input name="addtionalInfor" type="file"></input>

                </Col>
              </Row>
              <br></br>
              <br></br>
              <Button variant="primary" type="submit" alin>
                {isEdit ? "Edit Employee Details" : "Submit"}
              </Button>
            </Form>
          </div>
        </b>
      </Container >

    </div>
  );
}

export default EmployeeReg;

