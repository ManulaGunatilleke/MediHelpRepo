import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Col, Row, Form, Button, Container, Table } from "react-bootstrap";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import { Constants } from "../constants/Constants";
import background from '../assets/background_img.png';

export const AttendanceDetail = () => {
  const [attandanceTableData, setAttendanceTableData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {

    fetchEmployeeAttendanceList();
  }, []);

  const handleSearchInput = (text) => {
    setSearchValue(text);
    if (isEmpty(text.trim())) {
      fetchEmployeeAttendanceList();
      return;
    }
    if (!isEmpty(attandanceTableData)) {
      const serachResults = attandanceTableData.filter(row => row.Emp_Code.toLowerCase().includes(text.toLowerCase()))
      setAttendanceTableData(serachResults);
    }
  };

  const fetchEmployeeAttendanceList = () => {
    fetch(`http://127.0.0.1:8080/attendances/getAllAttendances`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setAttendanceTableData(data.data);
        }
      });
  };

  const generatePDF = () => {
    fetch("http://127.0.0.1:8080/attendances/generatePDf", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((fileUrl) => window.open(fileUrl, "_blank"))
      .catch((error) => console.log(error));
  };

  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      width: "100%",
      height: "100%",
    }}>
      <Container>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Search</Form.Label>
              <Form.Control
                name="search"
                type="Text"
                value={searchValue}
                onChange={(event) => handleSearchInput(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button style={{ marginTop: "20px" }} onClick={() => generatePDF()}>
              Export to PDF
            </Button>
          </Col>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                {Constants.ATTENDANCE_TABLE_HEADERS.map((item, index) => (
                  <th key={index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!isEmpty(attandanceTableData) &&
                attandanceTableData.map((row, index) => {
                  return (
                    <tr key={row._id}>
                      <td>{row.Emp_Code}</td>
                      <td>{row.Emp_FirstName}</td>
                      <td>{row.Emp_LastName}</td>
                      <td>{row.InTime}</td>
                      <td>{row.OutTime}</td>
                      <td>{row.Date}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
};
