import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside style={{ background: "#f4f4f4", padding: "1rem", width: "200px" }}>
      <ul>
        <li><Link to="/">社員一覧</Link></li>
        <li><Link to="/schedule">勤務予定表</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;