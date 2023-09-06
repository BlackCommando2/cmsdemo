// import React from 'react';
// import { Button } from '@mui/material';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import { Link } from "react-router-dom";
// import Footer from "../components/footer";
// import Header from "../components/header";
// import slide4 from "../demo_images/slide4.jpg";
// function Home() {
//     const slides = [
//         {
//             imageSrc: slide4,
//             buttonText: "Explore",
//             linkTo: "/",
//         },
//         {
//             imageSrc: slide4,
//             buttonText: "Explore",
//             linkTo: "/",
//         },
//         {
//             imageSrc: slide4,
//             buttonText: "Explore",
//             linkTo: "/",
//         },
//     ];
//     return (
//         <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//             <Header />
//             <div style={{ height: '400px', width: '100%', overflow: 'hidden', position: 'relative' }}>
//                 <Carousel infiniteLoop={true} autoPlay={true} Interval={500} showStatus={false} showArrows='true'>
//                     {slides.map((slide, index) => (
//                         <div key={index}>
//                             <Link to={slide.linkTo}>
//                                 <Button style={{
//                                     position: "absolute",
//                                     top: "250px",
//                                     left: "200px",
//                                     zIndex: 1, backgroundColor: 'orange', color: 'black'
//                                 }}>{slide.buttonText}</Button>
//                             </Link>
//                             <div>
//                                 <img src={slide.imageSrc} alt={`Image ${index + 1}`} style={{ objectFit: 'fill', height: '300px', width: '100%' }} />
//                             </div>
//                         </div>
//                     ))}
//                 </Carousel>
//             </div>
//             <div style={{ position: 'relative' }}>
//                 Home!
//             </div>
//             <Footer position='relative' />
//         </div>
//     );
// }

// export default Home;


import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../components/footer";
import Header from "../components/header";
// import slide4 from "../demo_images/slide4.jpg";
import Cards from '../components/cards';
function Home() {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Header />
            <Cards />
            <div style={{ position: 'relative' }}>
                Home!
            </div>
            <Footer position='relative' />
        </div>
    );
}

export default Home;
