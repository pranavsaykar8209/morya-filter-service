import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Footer, Header } from "./components/SharedComponents";
import AppRouts from "./routes";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <AppRouts />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
