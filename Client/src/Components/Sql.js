import React, { useState } from 'react';

const create = async () => {
    console.log("Create was clicked");
    const response = await fetch('http://localhost:5000/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'John Doe', age: 30 })
    });
    const data = await response.json();
    console.log(data);
}

const read = async () => {
    console.log("Read was clicked");
    const response = await fetch('http://localhost:5000/read');
    const data = await response.json();
    console.log(data);
}

const update = async () => {
    console.log("Update was clicked");
    const response = await fetch('http://localhost:5000/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 1, name: 'Jane Doe', age: 25 })
    });
    const data = await response.json();
    console.log(data);
}

const deleteAction = async () => {
    console.log("Delete was clicked");
    const response = await fetch('http://localhost:5000/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 1 })
    });
    const data = await response.json();
    console.log(data);
}

function Sql() {
    return (
        <div className="container my-3">
            <h1 className="mb-4">SQL</h1>
            <button type="button" className="btn btn-primary m-lg-1" onClick={create}>Create</button>
            <button type="button" className="btn btn-primary m-lg-1" onClick={read}>Read</button>
            <button type="button" className="btn btn-primary m-lg-1" onClick={update}>Update</button>
            <button type="button" className="btn btn-primary m-lg-1" onClick={deleteAction}>Delete</button>
        </div>
    );
}

export default Sql;
