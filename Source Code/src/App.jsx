/* eslint-disable no-unused-vars */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FileUpload from "./FileUpload";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <FileUpload />
    </div>
  );
}

export default App;
