import { ChangeEvent, FormEvent, useState } from "react";

import { calculator } from "../utils/Calculator";
import styles from "@/pages/index.module.css";

export default function Home() {
  const [input, setInput] = useState<number>(1);
  const [result, setResult] = useState<string>();

  const isButtonDisabled = !input || input < 1 || input > 1000;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(calculator.integerToRoman(input));
  };

  const inputChangeHandler = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (result) setResult(undefined);

    setInput(parseInt(value, 10));
  };

  return (
    <div className={styles.container}>
      <form data-testid="calc-roman" onSubmit={handleSubmit}>
        <label>
          Integer:
          <input
            type="number"
            value={input}
            onChange={inputChangeHandler}
            min={1}
            max={1000}
          />
        </label>
        <button type="submit" disabled={isButtonDisabled}>
          Calculate
        </button>
      </form>
      {isButtonDisabled ? <p>Integer must be between 1 and 1000</p> : null}
      <p>RESULT: {result}</p>
    </div>
  );
}
