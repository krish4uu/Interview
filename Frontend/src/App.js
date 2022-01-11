import logo from "./logo.svg";
import "./App.css";
import Form from "./Form";
import { UrlProvider } from "./url-context";

function App() {
  return (
    <UrlProvider>
    <div className="App">
      <header className="App-header">
        <Form />
      </header>
    </div>
    </UrlProvider>
  );
}

export default App;
