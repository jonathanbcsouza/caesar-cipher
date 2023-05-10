import React, { useState } from "react";
import TextEncoder from "./components/TextEncoder";
import "./styles.css";

function App() {
  const [shift, setShift] = useState(1);

  function handleShiftChange(event) {
    setShift(parseInt(event.target.value, 10));
  }

  return (
    <div>
      <h1>Caesar Cipher</h1>
      <label>Encoding key number:</label>
      <input
        type="number"
        id="shift"
        value={shift}
        onChange={handleShiftChange}
        min="1"
        max="10"
      />
      <TextEncoder selectedShift={shift} />
    </div>
  );
}

export default App;
