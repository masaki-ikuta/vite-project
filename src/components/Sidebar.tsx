import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">社員一覧</Link></li>
        <li><Link to="/schedule">勤務予定表</Link></li>
        <li><Link to="/daily-summary">日別勤務実績</Link></li>
      </ul>
    </nav>

  );
};

export default Sidebar;