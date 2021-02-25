import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef, Fragment } from "react";
import ReactDom from "react-dom";
import "normalize.css";
import "./styles/styles.scss";

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };
  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    const result = await ref.current.transform(input, {
      loader: "jsx",
      target: "es2015",
    });
    setCode(result.code);
  };
  useEffect(() => {
    startService();
  }, []);

  return (
    <Fragment>
      <header className="header">
        <div className="header__title-holder">
          <h1 className="header__title">
            Code<span className="header__title--italics">Sheeter</span>
          </h1>
        </div>
      </header>
      <main role="main" className="main-content">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}></textarea>
        <div>
          <button type="button" onClick={onClick}>
            Submit
          </button>
        </div>
        <pre className="code">{code}</pre>
      </main>
    </Fragment>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
