import React from "react";

function Pic(props) {
    return (
    <div>
        <img
            src={props.images1}
            alt="hi"
            className="mcqpics"
            wrap="left"
            onerror="this.style.display='none'"
         />

        <img
            src={props.images2}
            alt="hi"
            className="mcqpics"
            wrap="right"
            onerror="this.style.display='none'"
         />
    </div>
    );
}

export default Pic;