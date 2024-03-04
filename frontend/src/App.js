import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
// import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
