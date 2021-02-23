import * as esbuild from "esbuild-wasm";
import { useState, useEffect } from "react";
import ReactDom from "react-dom";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
    console.log(service);
  };
  const onClick = () => {
    console.log(input);
  };
  useEffect(() => {
    startService();
  }, []);

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
