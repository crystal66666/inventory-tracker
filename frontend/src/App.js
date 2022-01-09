import React, { useState } from 'react';

function App() {
  const [foo, setFoo] = useState('');

  return (
    <div>
      <p>Response: {foo}</p>
      <button onClick={() => {
        fetch("http://localhost:9000/")
          .then(res => res.text())
          .then(res => setFoo(res));
      }}>
        Get
      </button>
      <button onClick={() => {
        fetch("http://localhost:9000/addSkus")
          .then(res => res.text())
          .then(res => setFoo(res));
      }}>
        Get
      </button>
    </div>
  );
}

export default App;
