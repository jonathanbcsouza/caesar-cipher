import React, { useState } from "react";
import Button from "./Button";

function TextEncoder({ selectedShift }) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [isEncoding, setIsEncoding] = useState(true);

  function handleConvertion(event) {
    const newText = event.target.value;

    const shiftedAlphabet = alphabet
      .split("")
      .map((char) =>
        String.fromCharCode(
          ((char.charCodeAt(0) - 97 + selectedShift) % 26) + 97
        )
      )
      .join("");

    if (isEncoding) {
      let encodedText = "";
      for (let i = 0; i < newText.length; i++) {
        const letter = newText[i];
        const index = alphabet.indexOf(letter.toLowerCase());
        if (index !== -1) {
          const encodedLetter = shiftedAlphabet[index];
          encodedText += encodedLetter;
        } else {
          encodedText += letter;
        }
      }
      setText(newText);
      setOutput(encodedText);
    } else {
      // Decode the updated text using the shifted alphabet
      let decodedText = "";
      for (let i = 0; i < newText.length; i++) {
        const letter = newText[i];
        const index = shiftedAlphabet.indexOf(letter.toLowerCase());
        if (index !== -1) {
          const decodedLetter = alphabet[index];
          decodedText += decodedLetter;
        } else {
          decodedText += letter;
        }
      }
      setText(newText);
      setOutput(decodedText);
    }
  }

  function handleToggleEncoding() {
    setIsEncoding(!isEncoding);
    setText("");
    setOutput("");
  }

  return (
    <div>
      <div className="encoding-area">
        <br />
        <label>Text to {isEncoding ? "encrypt" : "decrypt"}:</label>
        <textarea
          type="text"
          id="input"
          value={text}
          onChange={handleConvertion}
        />

        <label>{isEncoding ? "Encoded" : "Decoded"} message:</label>
        <textarea
          type="text"
          id="output"
          value={output}
          onChange={handleConvertion}
          disabled
        />
      </div>

      <Button
        name={"Switch to " + (!isEncoding ? "Encode" : "Decode")}
        onClick={handleToggleEncoding}
      ></Button>
    </div>
  );
}

export default TextEncoder;
