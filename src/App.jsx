import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";

function App() {
  log("<App /> rendered");

  const [enteredNumber, setEnteredNumber] = useState(0);
  const [chosenCount, setChosenCount] = useState(0);

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    setChosenCount(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <>
      <Header />
      <main>
        <section id="configure-counter">
          <h2>Set Counter</h2>

          {/* 
            Problem:
              The when a new character is  entered in this input field, the state gets
              updated immediately, and because the state of this input is managed in the
              App component, the App and all of it's child components are rerendered on
              each state update. This is not optimized and to resolve this issue we have
              different approaches

              1. Memo function: The memo function will take a look at the props of your
              function component at when the component function would normally execute again.

              It will look at the old prop value and the new prop value and if the both values
              are exactly the same, the component rerender will be prevented by memo

              Memo only prevents function execution that are triggered by the parent component,
              and it will not prevent rerenders if the internal state of the component changes

              Do not overuse memo()

              Use it as high up in the component tree as possible

              -------------------------------------------------------------------------------

              2. Clever Structuring of the components:



          */}
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>
        </section>

        {/* 
          After adding the memo function in the Counter component, the component will
          not rerender if the value of the *INPUT* changes in the app component.
        */}
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
