import logo from "./logo.svg";
import "./App.css";
import Apps from "./Components/App";
import { io } from "socket.io-client";

function App() {
  const Socket = io("http://localhost:5000");
  console.log(Socket);
  return (
    <div className="App">
      <Apps socket={Socket} />
    </div>
  );
}

export default App;
