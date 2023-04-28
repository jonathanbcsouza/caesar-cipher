import React, { useState } from "react";

function NewAlphabet({ onSaveAlphabet }) {
  const [alphabet, setAlphabet] = useState();

  function handleAlphabetChange(event) {
    setAlphabet(event.target.value);
  }

  function handleSaveAlphabet() {
    onSaveAlphabet(alphabet);
  }

  return (
    <div>
      <h2>Create a new alphabet</h2>
      <span style={{ display: "flex" }}>
        <input type="text" value={alphabet} onChange={handleAlphabetChange} />
        <button onClick={handleSaveAlphabet}>Save Alphabet</button>
        <p>Your New Alphabet: {alphabet}</p>
      </span>
    </div>
  );
}

export default NewAlphabet;
