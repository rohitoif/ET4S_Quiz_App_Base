import React, { useState } from "react";
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

function Note(props) {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(true);

  function handleExpand() {
    setExpanded(!expanded);
  }

  function handleDelete() {
    setVisible(false);
  }

  if (!visible) {
    return null; // Do not render the note if it is not visible
  }

  return (
    <div className={`note ${expanded ? 'expanded' : 'collapsed'}`} draggable="true" id={props.title}>
      <h1>
        {props.title} <AspectRatioIcon className="expandButton" onClick={handleExpand} />
      </h1>
      <p>{props.content}</p>
      <button onClick={handleDelete}>DELETE</button>
    </div>
  );
}

export default Note;
