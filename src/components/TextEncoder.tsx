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
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <br />
        <label className="block mb-2 font-bold text-gray-700">
          Text to {isEncoding ? 'encrypt' : 'decrypt'}:
        </label>
        <textarea
          id="input"
          value={text}
          onChange={handleConversion}
          className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />

        <label className="block mb-2 font-bold text-gray-700">
          {isEncoding ? 'Encoded' : 'Decoded'} message:
        </label>
        <textarea
          id="output"
          value={output}
          onChange={handleConversion}
          disabled
          className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
