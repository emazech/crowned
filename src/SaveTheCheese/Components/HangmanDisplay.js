import React from "react";
import '../CSS/HangmanDisplay.css';
import { useRef, useEffect } from "react";
import cheese from '../Images/cheese.png';
import mouse from '../Images/mouse.png';
import yescheese from '../Images/yescheese.png';

function HangmanDisplay({wrongGuess}){
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.translate(0.5, 0.5);

        ctx.strokeStyle = 'white';
        ctx.lineCap = 'round';
        ctx.lineWidth = 2.5;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // left leg of the ladder
        if (wrongGuess > 0) {
            ctx.beginPath();
            ctx.moveTo(10, 210);
            ctx.lineTo(40, 35);
            ctx.stroke();
        }

        // right leg of the ladder
        if (wrongGuess > 1) {
            ctx.beginPath();
            ctx.moveTo(50, 210);
            ctx.lineTo(80, 35); 
            ctx.stroke();
        }

        // rung
        if (wrongGuess > 2) {
            ctx.beginPath();
            ctx.moveTo(5, 180);
            ctx.lineTo(62.5, 180);
            ctx.stroke();
        }

        // rung
        if (wrongGuess > 3) {
            ctx.beginPath();
            ctx.moveTo(10, 150);
            ctx.lineTo(65, 150);
            ctx.stroke();
        }

        // rung
        if (wrongGuess > 4) {
            ctx.beginPath();
            ctx.moveTo(15, 120);
            ctx.lineTo(72.5, 120);
            ctx.stroke();
        }

        // rung
        if (wrongGuess > 5) {
            ctx.beginPath();
            ctx.moveTo(20, 90);
            ctx.lineTo(77.5, 90);
            ctx.stroke();
        }

        // rung
        if (wrongGuess > 6) {
            ctx.beginPath();
            ctx.moveTo(25, 60);
            ctx.lineTo(82.5, 60);
            ctx.stroke();
        }

        ctx.translate(-0.5, -0.5);

    }, [wrongGuess]);

    return (
        <div id="canvasDiv">
            <img className="mouse" id="mouse" src={wrongGuess > 6 ? yescheese : mouse} title="mouse"></img>
            <canvas ref={canvasRef} height="220" width="100"></canvas>
            <img className="cheese" src={cheese} title="cheese"></img>
        </div>
    );
}

export default HangmanDisplay;