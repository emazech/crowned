import React from "react";
import { useNavigate } from 'react-router-dom';
import './pycg.css';

const Pycg = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="text">
                <h1>Choose your Collecting game!</h1>
            </div>
            <div className="main-content">
                <div className="first_box" onClick={() => navigate('/first')}>
                    Coin Collecting
                </div>
                <div className="second_box" onClick={() => navigate('/snake')}>
                    Snake
                </div>
                {/* <div className="third_box" onClick={() => navigate('/floppybird')}>
                    floppy
                </div>
                <div className="fourth_box" onClick={() => navigate('/gameboard')}>
                    matching
                </div> */}
            </div>
        </div>
    );
};

export default Pycg;
