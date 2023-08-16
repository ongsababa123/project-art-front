import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import instance from "./axios.create";
import { useNavigate } from "react-router-dom";

function Home() {
    document.title = 'Home';
    const navigate = useNavigate();

    const [input_name, setinput_name] = useState('');
    const [input_message, setinput_message] = useState('');
    const [validated, setValidated] = useState(false);

    const inandget = async () => {
        const data = {
            name: input_name,
            message: input_message,
        };

        try {
            const response = await instance.post("insert_message", data);
            console.log(response.data);

            if (response.data.status) {
                navigate(`/share/${parseInt(response.data.insertedId)}`);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            event.target.reset(); //add this line
        } else {
            inandget();
        }

        setValidated(true);
    };

    return (
        <div className="container">
            <div className="content-container pb-5">
                <img src="./image/tree-576848_640.png" alt="รูปต้นไม้" className="img-fluid tree-image" />
                <Col lg={6} className="mx-auto">
                    <Card>
                        <Card.Body className="card-content">
                            <Card.Title>ระบบส่งข้อความ</Card.Title>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group controlId="validationCustom01">
                                        <Form.Label>กรอกชื่อของคุณ</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="กรุณากรอกชื่อ"
                                            value={input_name} // กำหนดค่า default จาก inputValue
                                            onChange={(event) => setinput_name(event.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            กรุณากรอกชื่อ
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group controlId="validationCustom03">
                                        <Form.Label>กรอกข้อความของคุณ</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            type="text"
                                            placeholder="กรุณากรอกข้อความ"
                                            required
                                            value={input_message} // กำหนดค่า default จาก inputValue
                                            onChange={(event) => setinput_message(event.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            กรุณากรอกข้อความ
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Button type="submit" className="btn btn-success">ส่งข้อความ</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        </div>
    );
}

export default Home;
