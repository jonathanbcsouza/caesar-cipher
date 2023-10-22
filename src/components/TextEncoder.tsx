import React, { useState, ChangeEvent, FC } from 'react';
import Button from './Button';

enum Alphabet {
  A_CHAR_CODE = 'a'.charCodeAt(0),
  LENGTH = 26,
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

interface TextEncoderProps {
  selectedShift: number;
}

const isAlphabetic = (char: string): boolean =>
  ALPHABET.includes(char.toLowerCase());

const encode = (text: string, shiftedAlphabet: string): string => {
  let encodedText = '';
  for (let i = 0; i < text.length; i++) {
    const letter = text[i];
    if (isAlphabetic(letter)) {
      const index = ALPHABET.indexOf(letter.toLowerCase());
      const encodedLetter = shiftedAlphabet[index];
      encodedText += encodedLetter;
    } else {
      encodedText += letter;
    }
  }
  return encodedText;
};

const decode = (text: string, shiftedAlphabet: string): string => {
  let decodedText = '';
  for (let i = 0; i < text.length; i++) {
    const letter = text[i];
    if (isAlphabetic(letter)) {
      const index = shiftedAlphabet.indexOf(letter.toLowerCase());
      const decodedLetter = ALPHABET[index];
      decodedText += decodedLetter;
    } else {
      decodedText += letter;
    }
  }
  return decodedText;
};

const TextEncoder: FC<TextEncoderProps> = ({ selectedShift }) => {
  const [text, setText] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isEncoding, setIsEncoding] = useState<boolean>(true);

  const handleConversion = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;

    const shiftedAlphabet = ALPHABET.split('')
      .map((char) =>
        String.fromCharCode(
          ((char.charCodeAt(0) - Alphabet.A_CHAR_CODE + selectedShift) %
            Alphabet.LENGTH) +
            Alphabet.A_CHAR_CODE
        )
      )
      .join('');

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
