import React, { useState } from 'react';
import { ISettings } from "../../components/"

const InputRange: React.FC<ISettings> = ({ lineWidth, setLineWidth, editor }) => {
  const [value, setValue] = useState(lineWidth);

  const handleChange = (e) => {
    setValue(e.target.value);
    setLineWidth(e.target.value);
  };

  return (
      <input
        type="range"
        id="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className={!editor ? "tools__button--disabled" : "" }
        disabled={!editor ? true : false }
      />
  );
}

export { InputRange };