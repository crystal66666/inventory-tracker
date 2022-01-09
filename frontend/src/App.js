import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [lastUpdated, setlastUpdated] = useState(Date.now());
  const [inventory, setInventory] = useState([]);
  const [deleted, setDeleted] = useState([]);

  const inventoryTableRows = inventory.map((item) => 
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>{new Date(item.lastUpdated).toLocaleString()}</td>
    </tr>
  );

  const deletedTableRows = deleted.map((item) => 
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>{item.comments}</td>
      <td>{new Date(item.lastUpdated).toLocaleString()}</td>
    </tr>
  );

  const lastUpdatedStr = new Date(lastUpdated).toLocaleString();

  useEffect(() => {
    fetch("http://localhost:9000/inventory/list")
      .then(res => res.json())
      .then(res => {
        const validItems = res.filter(item => item.status !== 'deleted');
        const deletedItems = res.filter(item => item.status === 'deleted');
        setInventory(validItems);
        setDeleted(deletedItems);
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
      <table className="basic-table">
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
                  comments: document.getElementById('deleteComments').value
                })
              }).then(res => res.text())
                .then(data => {setlastUpdated(Date.now());})
                .catch(err => {console.error('Error:', err)});
            }}>
              Delete
            </button>
            </th>
            <th>
            <button onClick={() => {
              fetch("http://localhost:9000/inventory/undelete", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: document.getElementById('undeleteId').value
                })
              }).then(res => res.text())
                .then(data => {setlastUpdated(Date.now());})
                .catch(err => {console.error('Error:', err)});
            }}>
              Undo delete
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
              <br />
              <label htmlFor="deleteComments">Comments:</label>
              <input type="text" id="deleteComments"></input>
            </td>
            <td>
              <label htmlFor="undeleteId">Id:</label>
              <input type="number" id="undeleteId"></input>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>
        Inventory table
      </h2>
      <table className='basic-table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {inventoryTableRows}
        </tbody>
      </table>
      <h2>
        Deleted table
      </h2>
      <div>
        May opt to permanently delete these every X days
      </div>
      <table className='basic-table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Comments</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {deletedTableRows}
        </tbody>
      </table>
    </div>
  );
}

export default App;
