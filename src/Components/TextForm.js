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
   
    navigator.clipboard.writeText(text)
    document.getSelection().removeAllRanges();
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
        <h1 className="mb-4">{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnchange}
            style={{ backgroundColor: props.mode === 'dark' ? 'rgb(71 79 95)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button disabled = {text.length===0}className="btn btn-primary mx-2 my-1 " onClick={handleUpClick}>
          Convert to uppercase
        </button>
        <button disabled = {text.length===0}className="btn btn-primary mx-2 my-1 " onClick={handleLoClick}>
          Convert to lowercase
        </button>
        <button disabled = {text.length===0}className="btn btn-primary mx-2 my-1 " onClick={handleclearClick}>
          Clear text
        </button>
        <button disabled = {text.length===0}className="btn btn-primary mx-2 my-1 " onClick={handleCopy}>
          copy
        </button>
        <button disabled = {text.length===0}className="btn btn-primary mx-2 my-1 " onClick={handleExtraSpace}>
          Remove Extra spaces
        </button>
        <button disabled = {text.length===0}className="btn btn-primary mx-2 my-1 " onClick={speak}>
          speak
        </button>
      </div>
      <div className="container my-3"  style={{color: props.mode === 'dark' ? 'white' : 'black' }}>
        <h2>Your text summary</h2>
        <p>
          {text.split(/\s+/).filter((element)=>{return element.length!==0}).length}   words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} Minute read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </>
  );
}
