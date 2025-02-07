import "./App.css";
import Navbar from "./Components/Navbar";
import TextForm from "./Components/TextForm";
// import About from "./Components/About";
import { useState } from "react";
import About from "./Components/About";
import Alert from "./Components/Alert";
import Sql from "./Components/Sql";
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

  const toggleMode = (cl) => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "#1a1b1f";
      showAlert("Dark mode has been enabled", "success");
      // document.title = "TextUtils - Dark Mode";
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
      // document.title = "TextUtils - Light Mode";
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

        {/* <Card mode={mode}/> */}

        <div className="container my-3">
          {/* <Routes> */}
            {/* <Route exact path="/about" element={<About />} /> */}
            {/* <Route exact  path="/" element={*/}<TextForm showAlert={showAlert} heading="TextUtils - Word counter,character counter,Remove extra Spaces     " mode={mode} />
          {/* </Routes> */}
        
        </div>
      {/* </Router> */}


      <About mode={mode}/>

      <Sql mode={mode}/>
    
      
    </>
  );
}
export default App;
