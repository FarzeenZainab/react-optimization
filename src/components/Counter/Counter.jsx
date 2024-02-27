import { useCallback, useState, useMemo } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

export default function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);

  /**
   * useMemo is used for memoizing values (not functions). It memoizes the result of a function
   * and returns the cached result until one of the dependencies changes.
   *
   * It's useful for optimizing expensive calculations or computations so that they are only
   * re-executed when necessary.
   *
   * It is typically used for memoizing complex calculations, data transformation, or any value that's
   * expensive to compute.
   */

  /**
   * isPrime function is executed every time the counter changes even though the initialCount does not
   * change. We can avoid the re-execution of the function and return a memoized value of the function
   */
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  const [counter, setCounter] = useState(initialCount);

  /**
   * useCallback is primarily used for memoizing functions. It returns a memoized version
   * of the callback function that only changes if one of the dependencies has changed.
   *
   * It is useful when passing callbacks to optimized child components that rely on reference
   * equality to prevent unnecessary renders.
   *
   * It is typically used when you want to pass a stable callback to child components, especially
   * in scenarios where the parent component might re-render frequently but the callback itself
   * does not need to change
   *
   */
  const handleDecrement = useCallback(function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  /**
   * useCallback is for memoizing functions and useMemo is for memoizing values.
   */

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        {/* 
           // ! Un-optimized code: 
            In this implementation when the count updates Icon button component 
            re renders every time. 

            We added memo function to avoid unnecessary re-renders but, it is still re renders.
            The reason is the props passed to the IconButton component changes  on each render specifically
            the onClick prop sends new function on each re render AS THE FUNCTION BODY IS RECREATED DURING
            EACH RERENDER 

            How to fix it?
            To memoize function body we use useCallback function, which will only recreate the function body if any
            of the provided dependencies changes
        */}
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
}
