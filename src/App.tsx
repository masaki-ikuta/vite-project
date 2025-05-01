// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import EmployeeForm from "./components/EmployeeForm";
import WorkSchedule from "./components/WorkSchedule";

function App() {
  return (
    <Router>
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <div style={{ display: "flex", flex: 1 }}>
          <Sidebar />
          <main style={{ flex: 1, padding: "1rem" }}>
            <Routes>
              <Route path="/" element={<EmployeeForm />} />
              <Route path="/schedule" element={<WorkSchedule />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

