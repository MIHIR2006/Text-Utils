import React, { useState } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sql.css";

function App(props) {
  const inputStyle = {
    backgroundColor: props.mode === "dark" ? "rgb(71, 79, 95)" : "white",
    color: props.mode === "dark" ? "white" : "black",
  };

  const [inputText, setInputText] = useState("");
  const [message, setMessage] = useState([]); // Initialize as an empty array
  const [editId, setEditId] = useState(null); // Track the ID of the item being edited
  const [editName, setEditName] = useState(""); // Track the name being edited

  // Define placeholderClass based on the mode
  const placeholderClass = props.mode === "dark" ? "dark-mode" : "light-mode";

  // Function to handle the input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Function to handle editing input change
  const handleEditChange = (e) => {
    setEditName(e.target.value);
  };

  // Function to fetch names from the API when text is 'Display Names'
  const fetchNames = async () => {
    const TB = [
      "Mihir",
      "barjraj",
      "ramdin verma",
      "sharat chandran",
      "birender mandal",
      "amit",
      "kushal",
      "kasid",
      "shiv prakash",
      "vikram Singh",
      "sanjay",
      "abhi",
      "ram dutt gupta",
      "khadak Singh",
      "gurmit Singh",
      "chanderpal",
      "aman",
      "khursid",
      "rajeev",
      "Mrugesh",
      "nahar Singh",
      "ram kumar",
    ];
    const NaturalRead = [
      "display names",
      "show employee names ",
      "show names",
      "display employee",
      "show name",
      "display name",
      "list names",
      "fetch names",
      "get names",
      "show me names",
      "fetch name",
      "display employee names",
      "show employee names",
    ];

    const NaturalCreate = [
      "create name",
      "add name",
      "insert name",
      "add employee",
      "create employee",
      "insert employee",
      "add new name",
      "create new name",
      "add a name",
      "create new employee",
      "insert new name",
      "add new employee",
      "create new record",
      "insert employee name",
    ];

    const NaturalUpdate = [
      "update name",
      "edit name",
      "modify name",
      "update employee",
      "change name",
      "edit employee name",
      "modify employee",
      "update employee name",
      "edit employee record",
      "modify employee data",
      "update employee record",
      "change employee name",
      "edit name record",
      "update name details",
    ];

    const NaturalDelete = [
      "delete name",
      "remove name",
      "delete employee",
      "remove employee",
      "erase name",
      "erase employee",
    ];

    if (NaturalRead.includes(inputText.toLowerCase())) {
      setMessage(TB); // Set message to the TB array
    } else if (NaturalCreate.includes(inputText.toLowerCase())) {
      const newName = prompt("Enter the new employee name:");
      if (newName) {
        setMessage([...message, newName]); // Add new name to the list
      }
    } else if (NaturalUpdate.includes(inputText.toLowerCase())) {
      const idToUpdate = prompt("Enter the ID of the employee to update:");
      const newName = prompt("Enter the new name:");
      if (idToUpdate && newName) {
        const updatedMessage = message.map((name, index) =>
          index + 1 === parseInt(idToUpdate) ? newName : name
        );
        setMessage(updatedMessage); // Update the name in the list
      }
    } else if (NaturalDelete.includes(inputText.toLowerCase())) {
      const idToDelete = prompt("Enter the ID of the employee to delete:");
      if (idToDelete) {
        const updatedMessage = message.filter(
          (name, index) => index + 1 !== parseInt(idToDelete)
        );
        setMessage(updatedMessage); // Remove the name from the list
      }
    }
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "name",
      text: "Employee Name",
      sort: true,
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => (
        <div>
          <button
            className="btn btn-warning btn-sm mx-1"
            onClick={() => {
              setEditId(row.id);
              setEditName(row.name);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm mx-1"
            onClick={() => {
              const updatedMessage = message.filter(
                (name, index) => index + 1 !== row.id
              );
              setMessage(updatedMessage);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Ensure message is an array before mapping
  const data = Array.isArray(message)
    ? message.map((name, index) => ({
        id: index + 1, // Use index + 1 to start IDs from 1
        name: name,
      }))
    : [];

  return (
    <div
      className="container my-3"
      style={{ color: props.mode === "dark" ? "white" : "black" }}
    >
      <h1 className="mb-4">Employee Names</h1>

      <div className="form-group">
        <input
          type="text"
          className={`form-control mb-3 input-placeholder ${placeholderClass}`}
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

      {editId && (
        <div className="my-3">
          <input
            type="text"
            className="form-control mb-2"
            value={editName}
            onChange={handleEditChange}
            placeholder="Edit employee name"
          />
          <button
            className="btn btn-success btn-sm mx-1"
            onClick={() => {
              const updatedMessage = message.map((name, index) =>
                index + 1 === editId ? editName : name
              );
              setMessage(updatedMessage);
              setEditId(null);
              setEditName("");
            }}
          >
            Save
          </button>
          <button
            className="btn btn-secondary btn-sm mx-1"
            onClick={() => {
              setEditId(null);
              setEditName("");
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {Array.isArray(message) && message.length > 0 && (
        <div style={{ color: props.mode === "dark" ? "white" : "black" }}>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            bootstrap4
            striped
            hover
            condensed
            headerClasses={
              props.mode === "dark" ? "table-primary" : "table-primary"
            }
            wrapperClasses={props.mode === "dark" ? "table-dark" : "table-light"}
            rowClasses={props.mode === "dark" ? "table-dark" : "table-light"}
          />
        </div>
      )}
    </div>
  );
}

export default App;