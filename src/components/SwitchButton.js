import React from "react";

function SwitchButton({ isEncoding, onClick }) {
  return (
    <button onClick={onClick}>
      {isEncoding ? "Switch to Decoding" : "Switch to Encoding"}
    </button>
  );
}

export default SwitchButton;
