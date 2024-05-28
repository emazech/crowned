import React from "react";
import '../CSS/CategoryAndNumOfLetterToChoose.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CategoryAndNumOfLettersToChoose() {
    
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
    const handleSubmit = (event) => {
    event.preventDefault();
        if(inputs.category !== undefined && inputs.level !== undefined) {
            navigate(`/save-the-cheese?category=${inputs.category}&level=${inputs.level}`);
        } else if(inputs.category === undefined && inputs.level !== undefined) {
            document.getElementById('errorMsg').innerText = 'Please, choose a category!';
        } else if(inputs.category !== undefined && inputs.level === undefined) {
            document.getElementById('errorMsg').innerText = 'Please, choose a level!';
        } else {
           document.getElementById('errorMsg').innerText = 'Please, choose a category and a level!';
        }
    }

    return (
        <>
            <h1 className="title">Guess the word and save the cheese - or the mouse will eat it </h1>
            <form onSubmit={handleSubmit}>
                <label>Choose a category:</label>
                <br></br>
                <br></br>
                <select name="category" value={inputs.category || ""} onChange={handleChange}>
                    <option value="" disabled>Select a category</option>
                    <option value="nature">Nature</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="society">Society</option>
                </select>
                <br></br>
                <br></br>
                <br></br>
                <label>Choose the level:</label>
                <br></br>
                <br></br>
                <select name="level" value={inputs.level || ""} onChange={handleChange}>
                    <option value="" disabled>Select a level</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <button type="submit">Let's start!</button>
                <p id="errorMsg"></p>
            </form>
        </>
    )

}

export default CategoryAndNumOfLettersToChoose;