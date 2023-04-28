import React, { useState } from "react";
import NewAlphabet from "./components/NewAlphabet";
import TextConverter from "./components/TextConverter";

function App() {
  const [newAlphabet, setNewAlphabet] = useState("");

  function handleSaveAlphabet(alphabet) {
    setNewAlphabet(alphabet);
  }

  return (
    <div>
      <NewAlphabet onSaveAlphabet={handleSaveAlphabet} />
      {newAlphabet && <TextConverter newAlphabet={newAlphabet} />}
    </div>
  );
}

export default App;
