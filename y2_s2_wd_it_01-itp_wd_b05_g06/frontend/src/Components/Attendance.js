import React, { useState } from 'react';
import { Col, Row, Form, Button, Container, Card } from "react-bootstrap";
import { TimePicker, DatePicker } from 'antd';
import { useParams } from "react-router-dom"
import background from '../assets/background_img.png';
import { useFormik } from 'formik';
import { CommonTimePicker } from './common/TimePicker';
import moment from 'moment';

export const AttendanceForm = () => {
    const { type } = useParams();
    const [value, setValue] = useState();

    const updateAttendance = async (values, id) => {
        const response = await fetch(`http://127.0.0.1:8080/attendances/${id == undefined ? "create" : `update`}`, {
            method: id == undefined ? "POST" : "PUT",
            // mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(values)
        })
        return response.json();
    }

    const formik = useFormik({
        initialValues: {
            Emp_ID: '',
            Emp_FirstName: '',
            Emp_LastName: '',
            [type]: '',
            Date: ''
        },
        onSubmit: async values => {
            // alert(JSON.stringify(values, null, 2));
            const attendanceObj = {
                ...values,
                [type]: moment(values[type]).format()
            }
            console.log(values)
            updateAttendance(values, type === "InTime" ? undefined : values.Emp_ID.trim()).then((data) => {
                console.log("response :::: ", data);
            })
        }
    })


    console.log(formik.values)
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
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Employee ID</Form.Label>
                            <Form.Control name="Emp_ID" required type="Text" onChange={formik.handleChange} placeholder="enter employeeID" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Employee First Name</Form.Label>
                                <Form.Control name="Emp_FirstName" required type="Text" onChange={formik.handleChange} placeholder="enter first name" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Employee Last Name</Form.Label>
                                <Form.Control name="Emp_LastName" required type="Text" onChange={formik.handleChange} placeholder="enter last name" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label className='display-flex'>{type === "InTime" ? "In Time" : "Out Time"}</Form.Label>
                          
                                <div className='display-flex'>
                                    <CommonTimePicker name={[type]} onChange={e => formik.setFieldValue([type], e)} value={formik.values[type]} />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label className='display-flex'>Date</Form.Label>
                                <DatePicker className="display-flex" name="Date" onChange={(date, dateString) => formik.setFieldValue("Date", dateString)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Button style={{ display: "flex", width: "auto" }} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Row>
                </Form>
                </b>
            </Container>
        </div>
    )
}