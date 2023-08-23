import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    // console.log("Uppercase was clicked"+text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase!","success")
  };
  const handleLoClick = () => {
    // console.log("lowercase was clicked"+text);
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase!","success")
  };
  const handleclearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Text cleared !","success")
  };
  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    props.showAlert("Action success !","success")
  };
  const handleCopy = () => {
    var text = document.getElementById("myBox")
    text.select();
    navigator.clipboard.writeText(text.value)
    props.showAlert("Copied to clipboard!","success")
  };
  const handleExtraSpace = () => {
    let newText = text.split(/["  "]+/)
    setText(newText.join(""))
    props.showAlert("Extra spaces removed !","success")
  };


  const handleOnchange = (event) => {
    // console.log("on change ");
    setText(event.target.value);
  };
  const [text, setText] = useState("");
  // setText("you have clicked on handleupclick ")

  return (
    <>
      <div className="container" style={{color: props.mode === 'dark' ? 'white' : 'black' }}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnchange}
            style={{ backgroundColor: props.mode === 'dark' ? 'grey' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUpClick}>
          Convert to uppercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleLoClick}>
          Convert to lowercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleclearClick}>
          Clear text
        </button>
        <button className="btn btn-primary mx-2" onClick={handleCopy}>
          copy
        </button>
        <button className="btn btn-primary mx-2" onClick={handleExtraSpace}>
          Remove Extra spaces
        </button>
        <button className="btn btn-primary mx-2" onClick={speak}>
          speak
        </button>
      </div>
      <div className="container my-3"  style={{color: props.mode === 'dark' ? 'white' : 'black' }}>
        <h1>Your text summary</h1>
        <p>
          {text.split(" ").length} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").length} Minute read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Enter something in the textbox above  to preview it here "}</p>
      </div>
    </>
  );
}
