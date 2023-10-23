import React, { useState, ChangeEvent, FC } from 'react';
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

const TextEncoder: FC<TextEncoderProps> = ({ selectedShift }) => {
  const [text, setText] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isEncoding, setIsEncoding] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);

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

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-full max-w-md">
        <label className="block mb-2 font-bold text-gray-700">
          Text to {isEncoding ? 'encrypt' : 'decrypt'}:
        </label>
        <div className="relative">
          <textarea
            id="input"
            value={text}
            onChange={handleConversion}
            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>

        <label className="block mb-2 font-bold text-gray-700">
          {isEncoding ? 'Encoded' : 'Decoded'} message:
        </label>
        <div className="relative">
          <textarea
            id="output"
            value={output}
            disabled
            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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

export default TextEncoder;
