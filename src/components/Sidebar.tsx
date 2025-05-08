import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <nav>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <span className="material-icons" style={{ marginRight: "0.5rem" }}>dashboard</span>
          <Link to="/">ダッシュボード</Link>
        </li>
        <li style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <span className="material-icons" style={{ marginRight: "0.5rem" }}>people</span>
          <Link to="/employees">社員管理</Link>
        </li>
        <li style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <span className="material-icons" style={{ marginRight: "0.5rem" }}>schedule</span>
          <Link to="/schedule">勤務予定表</Link>
        </li>
        <li style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <span className="material-icons" style={{ marginRight: "0.5rem" }}>bar_chart</span>
          <Link to="/daily-summary">日別勤務実績</Link>
        </li>
        <li style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <span className="material-icons" style={{ marginRight: "0.5rem" }}>announcement</span>
          <Link to="/admin-notice">お知らせ</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;