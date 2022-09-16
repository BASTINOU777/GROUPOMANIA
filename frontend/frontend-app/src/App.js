import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={loginUser}>OM</button>
        <a
          className="App-link"
          href="http://localhost:3001/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
async function loginUser() {
  const result = await fetch("http://localhost:3001/api/auth/test1").then(
    (data) => data.json()
  );
}

export default App;
