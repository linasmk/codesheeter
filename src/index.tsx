import { useState } from "react";
import ReactDom from "react-dom";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const onClick = () => {
    console.log(input);
  };
  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button type="button" onClick={onClick}>
          Submit
        </button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
