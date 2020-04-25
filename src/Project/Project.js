import React from 'react';
import './Project.css';

const project = (props) => {
    return (
    <div className="Project">
        <p>Project Name: {props.name} </p>
        <p> Duration: {props.duration} hours</p>
        <input type="text" onChange={props.changed} value={props.duration}></input> 
        <button 
          onClick={props.click}>Add Duration</button>
    </div>
    )
}; 




export default project;