import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
