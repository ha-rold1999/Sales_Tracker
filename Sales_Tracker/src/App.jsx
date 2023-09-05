import Sales from "./Components/Sales/Sales";
import Inventory from "./Components/Inventory/Inventory";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Components/Menu/MainPage";
import Expenses from "./Components/Expense/Expenses";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import Login from "./Components/Login/Login";

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menu" element={<MainPage />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/inventory/*" element={<Inventory />} />
          <Route path="/expenses/*" element={<Expenses />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
