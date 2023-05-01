function SubmitBtn({ isEncoding, onClick }) {
  return (
    <button onClick={onClick}>
      {isEncoding ? "Encode " : "Decode "} message
    </button>
  );
}

export default SubmitBtn;
