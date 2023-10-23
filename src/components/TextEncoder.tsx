import React, { useState, ChangeEvent, FC } from 'react';
import Button from './Button';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

interface TextEncoderProps {
  selectedShift: number;
}

const isAlphabetic = (char: string): boolean =>
  ALPHABET.includes(char.toLowerCase());

const shiftAlphabet = (shift: number): string =>
  ALPHABET.split('')
    .map((char) =>
      String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97)
    )
    .join('');

const encode = (text: string, shiftedAlphabet: string): string =>
  text
    .split('')
    .map((char) =>
      isAlphabetic(char)
        ? shiftedAlphabet[ALPHABET.indexOf(char.toLowerCase())]
        : char
    )
    .join('');

const decode = (text: string, shiftedAlphabet: string): string =>
  text
    .split('')
    .map((char) =>
      isAlphabetic(char)
        ? ALPHABET[shiftedAlphabet.indexOf(char.toLowerCase())]
        : char
    )
    .join('');

const TextEncoder: FC<TextEncoderProps> = ({ selectedShift }) => {
  const [text, setText] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isEncoding, setIsEncoding] = useState<boolean>(true);

  const handleConversion = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    const shiftedAlphabet = shiftAlphabet(selectedShift);

    setText(newText);
    setOutput(
      isEncoding
        ? encode(newText, shiftedAlphabet)
        : decode(newText, shiftedAlphabet)
    );
  };

  const handleToggleEncoding = () => {
    setIsEncoding(!isEncoding);
    setText('');
    setOutput('');
  };

  return (
    <div>
      <div className="encoding-area">
        <br />
        <label>Text to {isEncoding ? 'encrypt' : 'decrypt'}:</label>
        <textarea id="input" value={text} onChange={handleConversion} />

        <label>{isEncoding ? 'Encoded' : 'Decoded'} message:</label>
        <textarea
          id="output"
          value={output}
          onChange={handleConversion}
          disabled
        />
      </div>

      <Button
        name={'Switch to ' + (!isEncoding ? 'Encode' : 'Decode')}
        onClick={handleToggleEncoding}
      />
    </div>
  );
};

export default TextEncoder;
