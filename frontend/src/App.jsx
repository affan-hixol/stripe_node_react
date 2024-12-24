import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckoutForm from "./components/CheckoutForm";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";


function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<CheckoutForm />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
