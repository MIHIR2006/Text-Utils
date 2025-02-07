import React, { useState } from 'react';
import axios from 'axios';
import './sql.css';

function App(props) {
  const inputStyle = {
    backgroundColor: props.mode === 'dark' ? 'rgb(71, 79, 95)' : 'white',
    color: props.mode === 'dark' ? 'white' : 'black',
  };

  const [inputText, setInputText] = useState('');
  const [names, setNames] = useState([]);
  const [message, setMessage] = useState('');  // State to store the message

  // Define placeholderClass based on the mode
  const placeholderClass = props.mode === 'dark' ? 'dark-mode' : 'light-mode';

  // Function to handle the input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Function to fetch names from the API when text is 'Display Names'
  const fetchNames = async () => {
    const naturalPhrases = [
      'display names',
      'show employee names ',
      'show names',
      'display employee',
      'show name',
      'display name',
      'list names',
      'fetch names',
      'get names',
      'show me names',
      'fetch name',
      'display employee names',
      'show employee names',
    ];

    if (naturalPhrases.includes(inputText.toLowerCase())) {
      setMessage('MIHIR');
      setTimeout(() => {
        setMessage('');  // Clear the message after 4 seconds
      }, 4000);
    }
    if (inputText.toLowerCase() === 'display names' || inputText.toLowerCase() === 'show names') {
      try {
        const response = await axios.get('http://localhost:5000/api/getNames');
        setNames(response.data);
      } catch (error) {
        console.error('Error fetching names:', error);
      }
    }
  };

  return (
    <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
      <h1 className="mb-4">Employee Names</h1>

      <div className="form-group">
        <input
          type="text"
          className={`form-control mb-3 input-placeholder ${placeholderClass}`}  // Dynamically apply the class based on the mode
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type 'Display Names' to fetch data"
          style={inputStyle}
        />
      </div>

      <button
        disabled={inputText.length === 0}
        className="btn btn-primary mb-3 mx-2 my-1"
        onClick={fetchNames}
      >
        Submit
      </button>

      <div>
        {message && <p className="alert alert-info">{message}</p>}

        {names.length > 0 && (
          <div>
            <h2>Names:</h2>
            <ul className="list-group">
              {names.map((name, index) => (
                <li key={index} className="list-group-item">{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
