import React from 'react';

export interface SubmitButtonProps {
  name: string;
  onClick: () => void;
}

const Button: React.FC<SubmitButtonProps> = ({ name, onClick }) => {
  return (
    <button
      type="submit"
      name={name}
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
    >
      {name}
    </button>
  );
};

export default Button;
