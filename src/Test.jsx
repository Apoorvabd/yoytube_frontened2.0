import { StrictMode, useState } from "react";
function Test() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");

  const doubled = count * 2;

  return (
    <>
      <h1>{doubled}</h1>

      <button onClick={() => setCount(count + 1)}>
        Count
      </button>

      <button onClick={() => setTheme("dark")}>
        Theme
      </button>
    </>
  );
}
export default Test;