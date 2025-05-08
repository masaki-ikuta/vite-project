import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";
import WorkSchedule from "./components/WorkSchedule";
import DailyWorkSummary from "./components/DailyWorkSummary";
import AdminNotice from "./components/AdminNotice";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Router>
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <button className="hamburger" onClick={toggleSidebar}>
          {isSidebarOpen ? "閉じる" : "メニュー"}
        </button>
        <div style={{ display: "flex", flex: 1 }}>
          <aside className={isSidebarOpen ? "open" : ""}>
            <Sidebar />
          </aside>
          <main className={isSidebarOpen ? "sidebar-open" : ""}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<EmployeeForm />} />
              <Route path="/schedule" element={<WorkSchedule />} />
              <Route path="/daily-summary" element={<DailyWorkSummary />} />
              <Route path="/admin-notice" element={<AdminNotice />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;