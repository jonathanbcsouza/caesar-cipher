import React, { useState } from "react";
import SwitchButton from "./components/SwitchButton";
import TextEncoder from "./components/TextEncoder";
import "./styles.css";

function App() {
  const [shift, setShift] = useState(1);
  const [isEncoding, setIsEncoding] = useState(true);

  function handleShiftChange(event) {
    setShift(parseInt(event.target.value, 10));
  }

  function handleToggleEncoding() {
    setIsEncoding(!isEncoding);
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
      <TextEncoder selectedShift={shift} isEncoding={isEncoding} />
      <SwitchButton isEncoding={isEncoding} onClick={handleToggleEncoding} />
    </div>
  );
}

export default App;
