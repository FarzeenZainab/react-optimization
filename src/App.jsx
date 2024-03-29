import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  return (
    <>
      <Header />
      <main>
        <section id="configure-counter">
          <h2>Set Counter</h2>

          {/* 
            Problem:
              When a new character is  entered in the input field, the state gets
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
              We can move the input in to a separate component which will  manage its own state
              instead of having it in the parent component. So whenever user enters something
              into the input, the parent component does not get re rendered. Only the InputCounter
              component will get re rendered with the new value passed down from the parent component.

              Because we restructured our code and moved the input inside a separate component, we 
              do not need the memo function in the Counter component. 

          */}

          {/* // ! Un-optimized implementation */}
          {/* <input type="number" onChange={handleChange} value={enteredNumber} /> */}
          {/* <button onClick={handleSetClick}>Set</button> */}

          {/* // ** Optimized implementation */}
          <ConfigureCounter setChosenCount={setChosenCount} />
        </section>

        {/* 
          After adding the memo function in the Counter component, the component will
          not rerender if the value of the *INPUT* changes in the app component.
        */}

        {/* 
          using key to reset component - when the value of chosenCount changes
          it will basically destroy the old component instance and re-create it
        */}
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;

/**
 * You should not use index as key of a dynamically generated list
 *
 * You might be tempted to use an item's index in the array as its key. In fact, that's
 * what react will use if you don't specify a key at all. But the order in which you render
 * items will change over time if an item is inserted, deleted, or if the array get reordered.
 *
 * Index as a key often leads to subtle and confusing bugs because react is unable to find a
 * unique identifier in the list. It is recommended to use stable and unique identifiers as
 * keys for dynamically generated lists in react. This ensures that react can accurately track
 * each item and optimize rerendering performance
 */
