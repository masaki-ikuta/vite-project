import React from "react";

const AdminNotice: React.FC = () => {
  const notices = [
    {
      id: 1,
      title: "システムメンテナンスのお知らせ",
      date: "2025-05-10",
      content: "2025年5月15日 22:00〜翌日6:00にシステムメンテナンスを実施します。この間、サービスをご利用いただけません。",
    },
    {
      id: 2,
      title: "新機能リリースのお知らせ",
      date: "2025-05-01",
      content: "新しいダッシュボード機能をリリースしました。詳細はヘルプページをご覧ください。",
    },
  ];

  return (
    <div className="admin-notice">
      <h2>システム管理者からのお知らせ</h2>
      <ul>
        {notices.map((notice) => (
          <li key={notice.id} style={{ marginBottom: "1.5rem" }}>
            <h3>{notice.title}</h3>
            <p><strong>日付:</strong> {notice.date}</p>
            <p>{notice.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNotice;