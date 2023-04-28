import React, { useState } from "react";
import SwitchButton from "./SwitchButton";

function TextEncoder({ newAlphabet }) {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [isEncoding, setIsEncoding] = useState(true);

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function handleOutputChange(event) {
    setOutput(event.target.value);
  }

  function handleToggleEncoding() {
    setIsEncoding(!isEncoding);
    setText("");
    setOutput("");
  }

  function handleEncodeDecode() {
    if (isEncoding) {
      // Encode the text using the new alphabet
      const encodedText = text
        .split("")
        .map((char) => {
          const index = "abcdefghijklmnopqrstuvwxyz".indexOf(
            char.toLowerCase()
          );
          if (index === -1) {
            return char;
          } else {
            return newAlphabet[index];
          }
        })
        .join("");

      setOutput(encodedText);
    } else {
      // Decode the text using the new alphabet
      const decodedText = text
        .split("")
        .map((char) => {
          const index = newAlphabet.indexOf(char.toLowerCase());
          if (index === -1) {
            return char;
          } else {
            return "abcdefghijklmnopqrstuvwxyz"[index];
          }
        })
        .join("");

      setOutput(decodedText);
    }
  }

  return (
    <div>
      <h2>{isEncoding ? "Text Encoder" : "Text Decoder"}</h2>
      <label htmlFor="input">Input Text:</label>
      <input type="text" id="input" value={text} onChange={handleTextChange} />
      <button onClick={handleEncodeDecode}>
        {isEncoding ? "Encode Text" : "Decode Text"}
      </button>
      <label htmlFor="output">{isEncoding ? "Encoded" : "Decoded"} Text:</label>
      <input
        type="text"
        id="output"
        value={output}
        onChange={handleOutputChange}
      />
      <SwitchButton isEncoding={isEncoding} onClick={handleToggleEncoding} />
    </div>
  );
}

export default TextEncoder;
