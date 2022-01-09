import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [lastUpdated, setlastUpdated] = useState(Date.now());
  const [inventory, setInventory] = useState([]);

  const Tablerows = inventory.map((item) => 
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
    </tr>
  );

  const lastUpdatedStr = new Date(lastUpdated).toString();

  useEffect(() => {
    fetch("http://localhost:9000/inventory/list")
      .then(res => res.json())
      .then(res => {
        setInventory(res);
      });
  }, [lastUpdated]);

  return (
    <div>
      <div>
        Last updated on: {lastUpdatedStr}
      </div>
      <h2>
        Actions
      </h2>
      <table className="input-table">
        <thead>
          <tr>
            <th>
            <button onClick={() => {
              fetch("http://localhost:9000/inventory/add", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: document.getElementById('addName').value,
                  quantity: document.getElementById('addQuantity').value
                })
              }).then(res => res.text())
                .then(data => {setlastUpdated(Date.now());})
                .catch(err => {console.error('Error:', err)});
            }}>
              Add
            </button>
            </th>
            <th>
            <button onClick={() => {
              fetch("http://localhost:9000/inventory/update", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: document.getElementById('updateId').value,
                  field: document.getElementById('updateField').value,
                  value: document.getElementById('updateValue').value
                })
              }).then(res => res.text())
                .then(data => {setlastUpdated(Date.now());})
                .catch(err => {console.error('Error:', err)});
            }}>
              Update
            </button>
            </th>
            <th>
            <button onClick={() => {
              fetch("http://localhost:9000/inventory/delete", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: document.getElementById('deleteId').value,
                })
              }).then(res => res.text())
                .then(data => {setlastUpdated(Date.now());})
                .catch(err => {console.error('Error:', err)});
            }}>
              Delete
            </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label htmlFor="addName">Name:</label>
              <input type="text" id="addName"></input>
              <br />
              <label htmlFor="addQuantity">Quantity:</label>
              <input type="number" id="addQuantity"></input>
            </td>
            <td>
              <label htmlFor="updateId">Id:</label>
              <input type="number" id="updateId"></input>
              <br />
              <label htmlFor="updateField">Field:</label>
              <select id="updateField">
                <option value="Name">Name</option>
                <option value="Quantity">Quantity</option>
              </select>
              <br />
              <label htmlFor="updateValue">Value:</label>
              <input type="text" id="updateValue"></input>
            </td>
            <td>
              <label htmlFor="deleteId">Id:</label>
              <input type="number" id="deleteId"></input>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>
        Inventory table
      </h2>
      <table className='inventory-table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Tablerows}
        </tbody>
      </table>
    </div>
  );
}

export default App;
