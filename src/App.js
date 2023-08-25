import "./App.css";
import Navbar from "./Components/Navbar";
import TextForm from "./Components/TextForm";
// import About from "./Components/About";
import { useState } from "react";
import Alert from "./Components/Alert";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";

function App() {
  const [mode, setmode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "#1a1b1f";
      showAlert("Dark mode has been enabled", "success");
      document.title = "TextUtils - Dark Mode";
      // setInterval(() => {
      //   document.title = 'TextUtils is Amazing Mode'
      // }, 2000);
      // setInterval(() => {
      //   document.title = 'Install TextUtils Now '
      // }, 1500);
    } else {
      setmode("light");
      document.body.style.backgroundColor = "White";
      showAlert("Light mode has been enabled", "success");
      document.title = "TextUtils - Light Mode";
    }
  };

  return (
    <>
      {/* <Router> */}
        <Navbar
          title="TextUtils"
          aboutText="About TextUtiles"
          mode={mode}
          toggleMode={toggleMode}
        />
        <Alert alert={alert} />
        <div className="container my-3">
          {/* <Routes> */}
            {/* <Route exact path="/about" element={<About />} /> */}
            {/* <Route exact  path="/" element={*/}<TextForm showAlert={showAlert} heading="Enter the text to analyze below" mode={mode} />
          {/* </Routes> */}
        </div>
      {/* </Router> */}
    </>
  );
}
export default App;
