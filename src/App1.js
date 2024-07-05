import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Editable } from "@chakra-ui/react";
import { isContentEditable } from "@testing-library/user-event/dist/utils";
function App() {
  const [ran, setRan] = useState("");
  const [arr, setArr] = useState([]);

  function readItem(event) {
    const input = event.target.value;
    setRan(input);
  }

  function addItem() {
    setArr((prevValue) => [...prevValue, ran]);
    setRan(""); // Clear input after adding
  }

  function deleteItem(index) {
    setArr((prevValue) => prevValue.filter((_, ind) => ind !== index));
  }

  function completeItem(index) {
    document.getElementById(index).textDecoration("true");
  }

  function toggleLineThrough(checkbox) {
    var textElement = document.getElementById('text');
    if (checkbox.checked === true) {
        textElement.style.textDecoration = "line-through";
    } else {
        textElement.style.textDecoration = "none";
    }
}

  return (
    <div className="container">
      <div className="heading">
        <h1>Daily Plan</h1>
      </div>
      <div className="form">
        <input type="text" value={ran} onChange={readItem} placeholder="Add a new task" />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <br />
      <ul className="task-list">
        {arr.map((item, index) => (
                  <li className="task-item flex justify-between {isChecked ? 'strikeout' : ''}">
                  <p className="task-text" id={index}>
                  <label class="custom-checkbox">
                  <input name="dummy" type="checkbox" onChange={()=>document.getElementById(index).classList.add("stikeout")}/>
                  <span class="checkmark"></span>
                  </label>
                        {item}
                  <div className="flex items-center space-x-4">
                    <EditIcon className="cursor-pointer content-end" onClick={()=>document.getElementById(index).setAttribute("contentEditable","true")} />
                    <DeleteIcon className="cursor-pointer content-end" onClick={() => deleteItem(index)} />
                  </div></p>
                </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

