import Sales from "./Components/Sales/Sales";
import Inventory from "./Components/Inventory/Inventory";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Components/Menu/MainPage";
import Expenses from "./Components/Expense/Expenses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/inventory/*" element={<Inventory />} />
        <Route path="/expenses/*" element={<Expenses />} />
      </Routes>
    </Router>
  );
}

export default App;
