import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2>ダッシュボード</h2>
      <p>ここではアプリケーションの概要や重要な情報を表示します。</p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <div style={{ flex: 1, padding: "1rem", background: "#f4f4f4", borderRadius: "8px" }}>
          <h3>社員数</h3>
          <p>50人</p>
        </div>
        <div style={{ flex: 1, padding: "1rem", background: "#f4f4f4", borderRadius: "8px" }}>
          <h3>今月の勤務予定</h3>
          <p>120シフト</p>
        </div>
        <div style={{ flex: 1, padding: "1rem", background: "#f4f4f4", borderRadius: "8px" }}>
          <h3>今月の勤務実績</h3>
          <p>110シフト</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;