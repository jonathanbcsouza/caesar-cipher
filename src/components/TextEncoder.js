import React, { useState } from "react";

function TextEncoder({ selectedShift, isEncoding, message, outputMsg }) {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function handleOutputChange(event) {
    setOutput(event.target.value);
  }

  function handleEncodeDecode() {
    const shiftedAlphabet = alphabet
      .split("")
      .map((char, index) =>
        String.fromCharCode(
          ((char.charCodeAt(0) - 97 + selectedShift) % 26) + 97
        )
      )
      .join("");

    if (isEncoding) {
      // Encode the text using the shifted alphabet
      const encodedText = text
        .split("")
        .map((char) => {
          const index = alphabet.indexOf(char.toLowerCase());
          if (index === -1) {
            return char;
          } else {
            return shiftedAlphabet[index];
          }
        })
        .join("");

      setOutput(encodedText);
    } else {
      // Decode the text using the shifted alphabet
      const decodedText = text
        .split("")
        .map((char) => {
          const index = shiftedAlphabet.indexOf(char.toLowerCase());
          if (index === -1) {
            return char;
          } else {
            return alphabet[index];
          }
        })
        .join("");

      setOutput(decodedText);
    }
  }

  return (
    <div>
      <div className="encoding-area">
        <h2>Text {isEncoding ? "Encoder" : "Decoder"}</h2>

        <label>Text to {isEncoding ? "encrypt" : "decrypt"}</label>
        <textarea
          type="text"
          id="input"
          message={text}
          onChange={handleTextChange}
        />

        <label>{isEncoding ? "Encoded" : "Decoded"} message:</label>
        <textarea
          type="text"
          id="output"
          value={output}
          onChange={handleOutputChange}
        />
      </div>

      <button onClick={handleEncodeDecode}>
        {isEncoding ? "Encode " : "Decode "} message
      </button>
    </div>
  );
}

export default TextEncoder;
