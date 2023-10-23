import React, { useState } from 'react';
import TextEncoder from './components/TextEncoder';

function App() {
  const [shift, setShift] = useState(1);

  function handleShiftChange(event: React.ChangeEvent<HTMLInputElement>) {
    setShift(parseInt(event.target.value, 10));
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Caesar Cipher</h1>
      <label htmlFor="shift" className="text-lg font-medium mb-2">
        Encoding key number:
      </label>
      <input
        type="number"
        id="shift"
        value={shift}
        onChange={handleShiftChange}
        min="1"
        max="10"
        className="w-24 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <TextEncoder selectedShift={shift} />
    </div>
  );
}

export default App;
