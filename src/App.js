import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ReportDetail from "./pages/ReportDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/report" element={<ReportDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
