import React from 'react';
import { FaClipboard, FaCheck } from 'react-icons/fa';

interface Props {
  textToCopy: string;
  isCopied: boolean;
  onCopy: () => void;
}

export const CopyToClipboardButton: React.FC<Props> = ({
  textToCopy,
  isCopied,
  onCopy,
}) => {
  const copyTextToClipboard = async () => {
    await navigator.clipboard.writeText(textToCopy);
    onCopy();
  };

  return (
    <button
      type="button"
      onClick={copyTextToClipboard}
      className={`
        absolute top-0 right-0 px-4 py-3 
        text-sm font-semibold text-white 
        bg-blue-500 rounded shadow 
        hover:bg-blue-600 focus:outline-none focus:shadow-outline
      `}
    >
      {isCopied ? <FaCheck /> : <FaClipboard />}
    </button>
  );
};
