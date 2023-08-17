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
import ReactPlayer from 'react-player';

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
            <ReactPlayer
                    url="./video/nke1.mp4"
                    playing
                    loop
                    muted
                    width="100%" // Set the width to 100% for responsiveness
                    height="auto" // Let the height adjust automatically
                />
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={6}>
                        <Card>
                            <Card.Body className="card-content">
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group controlId="validationCustom01">
                                        <Form.Label>USERNAME</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={input_name}
                                            onChange={(event) => setinput_name(event.target.value)}
                                        />
                                        {/* <Form.Control.Feedback type="invalid">
                                            Please type your name.
                                        </Form.Control.Feedback> */}
                                    </Form.Group>
                                    <Form.Group controlId="validationCustom03">
                                        <Form.Label>What do you think!!</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            type="text"
                                            required
                                            value={input_message}
                                            onChange={(event) => setinput_message(event.target.value)}
                                        />
                                        {/* <Form.Control.Feedback type="invalid">
                                            Please type your comment.
                                        </Form.Control.Feedback> */}
                                    </Form.Group>
                                    <Button type="submit" className="btn btn-success">Show up</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Home;
