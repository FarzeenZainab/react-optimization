import { useState } from "react";
import { log } from "../../log";

const ConfigureCounter = ({ setChosenCount }) => {
  const [enteredNumber, setEnteredNumber] = useState(0);

  function handleChange(event) {
    log("Counter rendered");
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    setChosenCount(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <div>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button onClick={handleSetClick}>Set</button>
    </div>
  );
};

export default ConfigureCounter;
