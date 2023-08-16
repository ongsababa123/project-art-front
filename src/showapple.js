import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import instance from "./axios.create"; // Make sure this import is correct
import { useParams } from "react-router-dom";

function HomeApple() {
    document.title = 'Home';
    const { Id } = useParams();

    const [hoveredApple, setHoveredApple] = useState(null);
    const [DataApple, setDataApple] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.post("getdata", { ids: Id });
                setDataApple(response.data);
                loopshow(response.data.length);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Fetch data immediately and then set up interval for fetching every minute
        fetchData();
        const interval = setInterval(fetchData, 60000); // Fetch data every minute

        return () => {
            clearInterval(interval); // Clear interval when component unmounts
        };
    }, [Id]);

    const handleAppleHover = (index) => {
        setHoveredApple(index);
    };

    const handleAppleLeave = () => {
        setHoveredApple(null);
    };

    function loopshow(totalApples) {
        let currentIndex = 0;

        const showNextApple = () => {
            setHoveredApple(currentIndex);

            setTimeout(() => {
                setHoveredApple(null);
                currentIndex = (currentIndex + 1) % totalApples;
                showNextApple();
            }, 2000);
        };

        showNextApple();
    }
    return (
        <div className="card-container">
            <div className="content-container pb-5">
                <img src="../image/tree-576848_640.png" alt="รูปต้นไม้" className="img-fluid tree-image" />
                {DataApple.map((data, index) => (
                    <div
                        key={index}
                        onMouseOver={() => handleAppleHover(index)}
                        onMouseLeave={handleAppleLeave}
                    >
                        {hoveredApple === index ? (
                            <img
                                src="../image/apple_gold.png"
                                alt={`รูปแอปเปิ้ล${index + 1}`}
                                className={`apple${index + 1} apple-bounce`}
                            />
                        ) : (
                            <img
                                src="../image/apple.png"
                                alt={`รูปแอปเปิ้ล${index + 1}`}
                                className={`apple${index + 1} apple-bounce`}
                            />
                        )}
                        {hoveredApple === index && (
                            <div className={`fade-popup`}>
                                {data.message}
                            </div>
                        )}
                    </div>
                ))}

                <Card style={{ width: '30rem' }}>
                    <Card.Body className="card-content">
                        <Card.Title>ระบบส่งข้อความ</Card.Title>
                        <Button type="submit" className="btn btn-success" href="/">ส่งข้อความใหม่</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default HomeApple;
