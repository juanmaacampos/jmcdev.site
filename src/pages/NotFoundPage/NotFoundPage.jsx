import React, { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom'; // Removed if only used for the button
import { useNavigate } from 'react-router-dom'; // Added for navigation
import { gsap } from 'gsap';
import './NotFoundPage.css';
import Button from '../../components/Button/Button'; // Assuming this is the correct path
import ParticleBackground from '../../components/ParticleBackground/ParticleBackground'; // Import ParticleBackground

const NotFoundPage = () => {
    const containerRef = useRef(null);
    const digit1Ref = useRef(null);
    const digit2Ref = useRef(null);
    const digit3Ref = useRef(null);
    const navigate = useNavigate(); // Added for navigation

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!containerRef.current) return;

            const { clientX, clientY } = event;
            const { innerWidth, innerHeight } = window;

            // Calculate mouse position relative to the center of the screen
            // Values will range from -0.5 to 0.5
            const mouseX = (clientX / innerWidth) - 0.5;
            const mouseY = (clientY / innerHeight) - 0.5;

            // Define the intensity of the movement
            const intensity = 50; // Adjust this value to make the effect more or less subtle

            gsap.to(digit1Ref.current, {
                x: mouseX * intensity * 1.2, // Slightly different movement for depth
                y: mouseY * intensity * 1.2,
                rotateX: mouseY * -15, // Add some 3D tilt
                rotateY: mouseX * 15,
                duration: 0.5,
                ease: 'power2.out',
            });
            gsap.to(digit2Ref.current, {
                x: mouseX * intensity,
                y: mouseY * intensity,
                rotateX: mouseY * -10,
                rotateY: mouseX * 10,
                duration: 0.5,
                ease: 'power2.out',
            });
            gsap.to(digit3Ref.current, {
                x: mouseX * intensity * 0.8, // Slightly different movement for depth
                y: mouseY * intensity * 0.8,
                rotateX: mouseY * -12,
                rotateY: mouseX * 12,
                duration: 0.5,
                ease: 'power2.out',
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Initial animation for the text
        gsap.fromTo([digit1Ref.current, digit2Ref.current, digit3Ref.current],
            { opacity: 0, y: 50, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.2, ease: 'elastic.out(1, 0.5)' }
        );
        gsap.fromTo('.notfound-text, .button-container', // Target the button container for animation
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.5, stagger: 0.1, ease: 'power2.out' }
        );


        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleGoHome = () => {
        navigate('/');
    };

    // Define the background color from your CSS variables or a direct value
    // This should match the --brand-background-start or similar from NotFoundPage.css
    const particleBgColor = "#10101A"; 

    return (
        <div className="notfound-container" ref={containerRef}>
            <ParticleBackground id="notfound-particles" backgroundColor={particleBgColor} />
            <div className="notfound-content">
                <h1 className="notfound-title">
                    <span ref={digit1Ref} className="digit">4</span>
                    <span ref={digit2Ref} className="digit">0</span>
                    <span ref={digit3Ref} className="digit">4</span>
                </h1>
                <p className="notfound-text"><strong>Oops! Parece que te perdiste en este sitio!</strong></p>
                <p className="notfound-text">La página que buscas no se encuentra por aca.</p>
                <div className="button-container" style={{ marginTop: '30px' }}> {/* Added container for consistent styling/animation */}
                <Button label="Volver al Inicio" onClick={handleGoHome} effect="neon" size="medium" />
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
