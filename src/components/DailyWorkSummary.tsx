import React, { useEffect, useState } from "react";
import { fetchWorkSchedules } from "../utils/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type WorkSchedule = {
  date: string;
  employee_id: string;
  employee_name: string;
  shift: string;
  actual: string;
};

const DailyWorkSummary: React.FC = () => {
  const [schedules, setSchedules] = useState<WorkSchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`; // 初期表示を当月に設定
  });
  const organization_id = "org-0001"; // 組織IDを指定

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        setLoading(true);
        const data = await fetchWorkSchedules(organization_id, currentMonth);
        setSchedules(data);
      } catch (err) {
        console.error(err);
        setError("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadSchedules();
  }, [currentMonth]);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  // 日ごとの勤務予定と実績を集計
  const dailySummary = schedules.reduce((acc: { [key: string]: { planned: number; actual: number } }, schedule) => {
    if (!acc[schedule.date]) {
      acc[schedule.date] = { planned: 0, actual: 0 };
    }
    acc[schedule.date].planned += 1; // 予定のカウント
    if (schedule.actual) {
      acc[schedule.date].actual += 1; // 実績のカウント
    }
    return acc;
  }, {});

  // 表とグラフ用データに変換
  const summaryData = Object.entries(dailySummary).map(([date, { planned, actual }]) => ({
    date,
    planned,
    actual,
  }));

  return (
    <div>
      <h2>日ごとの勤務集計</h2>
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() =>
            setCurrentMonth((prev) => {
              const [year, month] = prev.split("-").map(Number);
              const newDate = new Date(year, month - 2); // 前月
              return `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}`;
            })
          }
          style={{ marginRight: "1rem" }}
        >
          前月
        </button>
        <span>{currentMonth}</span>
        <button
          onClick={() =>
            setCurrentMonth((prev) => {
              const [year, month] = prev.split("-").map(Number);
              const newDate = new Date(year, month); // 翌月
              return `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}`;
            })
          }
          style={{ marginLeft: "1rem" }}
        >
          翌月
        </button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>日付</th>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>稼働予定人数</th>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>稼働実績人数</th>
          </tr>
        </thead>
        <tbody>
          {summaryData.map(({ date, planned, actual }) => (
            <tr key={date}>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{date}</td>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{planned}</td>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{actual}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ marginTop: "2rem" }}>日ごとの稼働人数グラフ</h2>
      <BarChart width={600} height={300} data={summaryData} style={{ marginTop: "1rem" }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="planned" fill="#8884d8" name="予定" />
        <Bar dataKey="actual" fill="#82ca9d" name="実績" />
      </BarChart>
    </div>
  );
};

export default DailyWorkSummary;