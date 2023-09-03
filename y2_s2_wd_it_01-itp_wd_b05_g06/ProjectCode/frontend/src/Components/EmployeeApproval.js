import React from 'react'
import { useFormik } from 'formik';
import { Col, Row, Form, Button, Container, Card } from "react-bootstrap";
import background from '../assets/background_img.png';

export const EmployeeApproval = () => {

    const sendEmail = async (values) => {
        const response = await fetch("http://127.0.0.1:8070/approvals/send-mail", {
            method: "POST",
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
            Emp_Email: '',
            approval_massage: ''
        },
        onSubmit: async values => {
            sendEmail(values).then((data) => {
                console.log("email rsponse : ", data)
            })
        }
    })
    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
        }}>
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Employee Id</Form.Label>
                            <Form.Control name="Emp_ID" type="Text" required onChange={formik.handleChange} placeholder="enter first name" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Employee Email</Form.Label>
                            <Form.Control name="Emp_Email" type="email" required onChange={formik.handleChange} placeholder="enter first name" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Message to be sent to the employee</Form.Label>
                            <Form.Control name="approval_massage" type="email" as="textarea" rows={3} onChange={formik.handleChange} placeholder="enter first name" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Button style={{ display: "flex", width: "auto" }} variant="primary" type="submit">
                            Send
                        </Button>
                    </Row>
                </Form>
            </Container >
        </div>
    )
}
