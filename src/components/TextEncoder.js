import React, { useState } from "react";
import Button from "./Button";

function TextEncoder({ selectedShift }) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [isEncoding, setIsEncoding] = useState(true);

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function handleToggleEncoding() {
    setIsEncoding(!isEncoding);
    setText("");
    setOutput("");
  }

  function handleEncodeDecode() {
    const shiftedAlphabet = alphabet
      .split("")
      .map((char) =>
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
          value={text}
          onChange={handleTextChange}
        />

        <label>{isEncoding ? "Encoded" : "Decoded"} message:</label>
        <textarea
          type="text"
          id="output"
          value={output}
          onChange={handleTextChange}
          disabled
        />
      </div>

      <Button
        isEncoding={isEncoding}
        onClick={handleEncodeDecode}
        encoding="Encode"
        decoding="Decode"
      ></Button>

      <Button
        isEncoding={isEncoding}
        onClick={handleToggleEncoding}
        encoding="Encode"
        decoding="Decode"
      ></Button>
    </div>
  );
}

export default TextEncoder;
