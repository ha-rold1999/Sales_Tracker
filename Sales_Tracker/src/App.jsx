import Sales from "./Components/Sales/Sales";
import Inventory from "./Components/Inventory/Inventory";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Components/Menu/MainPage";
import Expenses from "./Components/Expense/Expenses";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Account from "./Components/Account/Account";
import Archive from "./Components/Archive/Archive";
import Danger from "./Components/Danger/Danger";
import ChangePassword from "./Components/Danger/ChangePassword";
import Statistics from "./Components/Statistics/Statistics";

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
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/danger" element={<Danger />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
