import React, { useContext } from 'react';
import { Button } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
// import slide4 from "../assets/demo_images/slide4.jpg";
import { SocketContext } from '../Context';

function Cards() {
    const { slides } = useContext(SocketContext);
    return (
        <div style={{ height: '400px', width: '100%', overflow: 'hidden', position: 'relative' }}>
            <Carousel infiniteLoop={true} autoPlay={true} Interval={500} showStatus={false} showArrows='true' showThumbs={false}>
                {slides.map((slide, index) => (
                    <div key={index}>
                        <Link to={slide.url}>
                            <Button style={{
                                position: "absolute",
                                top: "250px",
                                left: "200px",
                                zIndex: 1, backgroundColor: 'orange', color: 'black'
                            }}>{slide.buttonText}</Button>
                        </Link>
                        <div>
                            <img src={slide.imageSrc} alt={`Image ${index + 1}`} style={{ objectFit: 'fill', height: '300px', width: '100%' }} />
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default Cards;
