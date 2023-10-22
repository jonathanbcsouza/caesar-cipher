import React from 'react';

export interface SubmitButtonProps {
  name: string;
  onClick: () => void;
}

const Button: React.FC<SubmitButtonProps> = ({ name, onClick }) => {
  return (
    <button type="submit" name={name} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
