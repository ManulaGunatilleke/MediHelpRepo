import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Form, Button, Container, Table } from "react-bootstrap";
import isEmpty from "lodash/isEmpty";
import { Constants } from "../constants/Constants";
import background from '../assets/background_img.png';

export const EmployeeDetails = () => {
  const navigate = useNavigate();
  const [employeeTblData, setEmployeeTblData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInput = (text) => {
    setSearchValue(text);
    if (isEmpty(text.trim())) {
      fetchAllEmployees();
      return;
    }
    if (!isEmpty(employeeTblData)) {
      const serachResults = employeeTblData.filter(row => row.firstName.includes(text) || row.lastName.includes(text))
      setEmployeeTblData(serachResults);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = () => {
    fetch(`http://127.0.0.1:8070/employees/getAllUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setEmployeeTblData(data.data);
        }
      });
  };

  const generatePDF = () => {
    fetch("http://127.0.0.1:8080/employees/generatePDf", {
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

  const handleCrudAction = (crudType, id) => {
    if (crudType == "Update") {
      navigate(`/employee/edit/${id}`);
    } else {
      fetch(`http://127.0.0.1:8080/employees/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            fetchAllEmployees();
          }
        });
    }
  };

  return (
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
              {Constants.EMPLOYEE_TABLE_HEADERS.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isEmpty(searchValue) && isEmpty(employeeTblData) && (
              <tr>No matching records for search value</tr>
            )}
            {!isEmpty(employeeTblData) &&
              employeeTblData.map((row, index) => {
                return (
                  <tr key={row._id}>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.dob}</td>
                    <td>{row.gender}</td>
                    <td>{row.email}</td>
                    <td>{row.p_Number}</td>
                    <td>{row.address}</td>
                    <td>{row.city}</td>
                    <td>{row.province}</td>
                    <td>{row.postal}</td>
                    <td>{row.position}</td>
                    <td>{row.typeofwork}</td>
                    <td>{row.CV}</td>
                    <td>...</td>
                    <td onClick={() => handleCrudAction("Update", row._id)}>
                      Update
                    </td>
                    <td onClick={() => handleCrudAction("Delete", row._id)}>
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};