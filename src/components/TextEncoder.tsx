import React, { useState, useEffect, ChangeEvent, FC } from 'react';
import Button from './Button';
import { CopyToClipboardButton } from './CopyToClipboardButton';

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

export const TextEncoder: FC<TextEncoderProps> = ({ selectedShift }) => {
  // State Declarations
  const [text, setText] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isEncoding, setIsEncoding] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const processType = isEncoding ? 'encrypt' : 'decrypt';

  const handleCopy = () => setIsCopied(true);
  const handleConversion = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    const shiftedAlphabet = shiftAlphabet(selectedShift);
    setText(newText);
    setOutput(
      isEncoding
        ? encode(newText, shiftedAlphabet)
        : decode(newText, shiftedAlphabet)
    );
    setIsCopied(false);
  };
  const handleToggleEncoding = () => {
    setIsEncoding(!isEncoding);
    setText('');
    setOutput('');
    setIsCopied(false);
  };

  useEffect(() => {
    const shiftedAlphabet = shiftAlphabet(selectedShift);
    setOutput(
      isEncoding ? encode(text, shiftedAlphabet) : decode(text, shiftedAlphabet)
    );
    setIsCopied(false);
  }, [selectedShift, text, isEncoding]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-3/5 mx-auto">
      <div className="w-full max-w-md">
        <label className="block mb-2 font-bold text-gray-700">
          Text to {processType}:
        </label>
        <div className="relative">
          <textarea
            id="input"
            value={text}
            onChange={handleConversion}
            className="block w-80 px-4 py-3 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline resize-none"
            rows={5}
            placeholder={`Enter text to ${processType}`}
          />
        </div>
        <label className="block mb-2 font-bold text-gray-700">
          {processType} message:
        </label>
        <div className="relative">
          <textarea
            id="output"
            value={output}
            disabled
            className="block w-80 px-4 py-3 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline resize-none"
            rows={5}
            placeholder="Result will appear here"
          />
          <CopyToClipboardButton
            textToCopy={output}
            isCopied={isCopied}
            onCopy={handleCopy}
          />
        </div>
      </div>
      <Button
        name={'Switch to ' + (!isEncoding ? 'Encode' : 'Decode')}
        onClick={handleToggleEncoding}
      />
    </div>
  );
};
