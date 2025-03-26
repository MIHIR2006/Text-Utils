import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./sql.css";

function App(props) {
  const inputStyle = {
    backgroundColor: props.mode === "dark" ? "rgb(71, 79, 95)" : "white",
    color: props.mode === "dark" ? "white" : "black",
  };

  const [inputText, setInputText] = useState("");
  const [message, setMessage] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", age: "" });
  const [error, setError] = useState("");

  const placeholderClass = props.mode === "dark" ? "dark-mode" : "light-mode";

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditName(e.target.value);
  };

  const handleEditAgeChange = (e) => {
    setEditAge(e.target.value);
  };

  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  // Function to fetch data from MySQL
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/read");
      setMessage(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching student data. Please try again.");
    }
  };

  // Function to create new record
  const createRecord = async (name, age) => {
    try {
      // Validate inputs
      if (!name.trim()) {
        setError("Name cannot be empty");
        return;
      }
      if (!age || age < 1 || age > 100) {
        setError("Please enter a valid age (1-100)");
        return;
      }

      await axios.post("http://localhost:5000/create", { name, age });
      setShowCreateModal(false);
      setNewStudent({ name: "", age: "" });
      setError("");
      fetchData(); // Refresh the data
      alert("Student added successfully!");
    } catch (error) {
      console.error("Error creating record:", error);
      setError("Error creating student record. Please try again.");
    }
  };

  // Function to update record
  const updateRecord = async (id, name, age) => {
    try {
      await axios.put("http://localhost:5000/update", { id, name, age });
      fetchData(); // Refresh the data
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  // Function to delete record
  const deleteRecord = async (id, name) => {
    try {
      // Show confirmation dialog only once
      const isConfirmed = window.confirm(
        `Are you sure you want to delete student "${name}"?`
      );

      if (isConfirmed) {
        await axios.delete("http://localhost:5000/delete", { data: { id } });
        await fetchData(); // Refresh the data
        alert("Student deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Error deleting student. Please try again.");
    }
  };

  // Natural language query processing
  const processQuery = async () => {
    const query = inputText.toLowerCase();

    // Read operations
    if (
      query.includes("show") ||
      query.includes("display") ||
      query.includes("list") ||
      query.includes("fetch") ||
      query.includes("get")
    ) {
      await fetchData();
    }
    // Create operations
    else if (
      query.includes("add") ||
      query.includes("create") ||
      query.includes("insert")
    ) {
      const name = prompt("Enter student name:");
      const age = prompt("Enter student age:");
      if (name && age) {
        await createRecord(name, parseInt(age));
      }
    }
    // Update operations
    else if (
      query.includes("update") ||
      query.includes("edit") ||
      query.includes("modify")
    ) {
      const id = prompt("Enter student ID to update:");
      const name = prompt("Enter new name:");
      const age = prompt("Enter new age:");
      if (id && name && age) {
        await updateRecord(parseInt(id), name, parseInt(age));
      }
    }
    // Delete operations
    else if (
      query.includes("delete") ||
      query.includes("remove") ||
      query.includes("erase")
    ) {
      const id = prompt("Enter student ID to delete:");
      if (id) {
        // Find the student name for the confirmation message
        const student = message.find((s) => s.id === parseInt(id));
        if (student) {
          await deleteRecord(parseInt(id), student.name);
        } else {
          alert("Student not found!");
        }
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
      text: "Student Name",
      sort: true,
    },
    {
      dataField: "age",
      text: "Age",
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
              setEditAge(row.age);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm mx-1"
            onClick={() => deleteRecord(row.id, row.name)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const data = message.map((student) => ({
    id: student.id,
    name: student.name,
    age: student.age,
  }));

  return (
    <div
      className="container my-3"
      style={{ color: props.mode === "dark" ? "white" : "black" }}
    >
      <h1 className="mb-4">Student Management System</h1>

      <div className="form-group">
        <input
          type="text"
          className={`form-control mb-3 input-placeholder ${placeholderClass}`}
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter natural language query (e.g., 'show students', 'add student')"
          style={inputStyle}
        />
      </div>

      <div className="mb-3">
        <button
          disabled={inputText.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={processQuery}
        >
          Submit Query
        </button>
        <button
          className="btn btn-success mx-2 my-1"
          onClick={() => setShowCreateModal(true)}
        >
          Add New Student
        </button>
      </div>

      {/* Create Student Modal */}
      {showCreateModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Student</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewStudent({ name: "", age: "" });
                    setError("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Student Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={newStudent.name}
                    onChange={handleNewStudentChange}
                    placeholder="Enter student name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    name="age"
                    value={newStudent.age}
                    onChange={handleNewStudentChange}
                    placeholder="Enter student age"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewStudent({ name: "", age: "" });
                    setError("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    createRecord(newStudent.name, parseInt(newStudent.age))
                  }
                >
                  Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editId && (
        <div className="my-3">
          <input
            type="text"
            className="form-control mb-2"
            value={editName}
            onChange={handleEditChange}
            placeholder="Edit student name"
          />
          <input
            type="number"
            className="form-control mb-2"
            value={editAge}
            onChange={handleEditAgeChange}
            placeholder="Edit student age"
          />
          <button
            className="btn btn-success btn-sm mx-1"
            onClick={() => {
              updateRecord(editId, editName, parseInt(editAge));
              setEditId(null);
              setEditName("");
              setEditAge("");
            }}
          >
            Save
          </button>
          <button
            className="btn btn-secondary btn-sm mx-1"
            onClick={() => {
              setEditId(null);
              setEditName("");
              setEditAge("");
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Only render table when there is data */}
      {message.length > 0 && (
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
            wrapperClasses={
              props.mode === "dark" ? "table-dark" : "table-light"
            }
            rowClasses={props.mode === "dark" ? "table-dark" : "table-light"}
          />
        </div>
      )}

      {/* Show a message when no data is available */}
      {message.length === 0 && (
        <div className="text-center mt-4">
          <p>
            No data to display. Use the search bar above or click "Add New
            Student" to get started.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
