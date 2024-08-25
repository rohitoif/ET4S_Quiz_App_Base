import React from "react";
import './MCQ.css';
function Pic(props) {
    return (
    <div>
        <img
            src={props.images1}
            alt="hi"
            className="mcqpics"
            onerror="this.style.display='none'"
            id="img1"
         />

        <img
            src={props.images2}
            alt="hi"
            className="mcqpics"
            onerror="this.style.display='none'"
            id='img2'
         />
    </div>
    );
}

export default Pic;