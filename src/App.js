import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Coins from "./components/Coins";
import Exchanges from "./components/Exchanges";
import CoinDetails from "./components/CoinDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Header/>
        <Route path="/" element={<Home/>} />
        <Route path="/header" element={<Header/>} />
        <Route path="/coins" element={<Coins/>} />
        <Route path="/exchanges" element={<Exchanges/>} />
        <Route path="/coin/:id" element={<CoinDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
