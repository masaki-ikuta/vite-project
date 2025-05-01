import React, { useEffect, useState } from "react";
import { fetchWorkSchedules, fetchEmployees } from "../utils/api";

type WorkSchedule = {
  date: string;
  employee_id: string;
  employee_name: string;
  shift: string;
  actual: string;
};

type Employee = {
  employee_id: string;
  employee_name: string;
};

const WorkSchedule: React.FC = () => {
  const [schedules, setSchedules] = useState<WorkSchedule[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`; // 初期表示を当月に設定
  });
  const organization_id = "org-0001"; // 組織IDを指定

  // 指定された月の日付を生成する関数
  const generateMonthDates = (year: number, month: number): { date: string; day: string; isWeekend: boolean }[] => {
    const dates = [];
    const daysInMonth = new Date(year, month, 0).getDate(); // 月の日数を取得
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = weekdays[date.getDay()];
      const isWeekend = date.getDay() === 0 || date.getDay() === 6; // 日曜または土曜
      dates.push({
        date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        day: dayOfWeek,
        isWeekend,
      });
    }
    return dates;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // 社員一覧を取得
        const employeeData = await fetchEmployees(organization_id);
        setEmployees(employeeData);

        // 勤務予定表を取得
        const scheduleData = await fetchWorkSchedules(organization_id, currentMonth);
        setSchedules(scheduleData);
      } catch (err) {
        console.error(err);
        setError("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentMonth]);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const [year, month] = currentMonth.split("-").map(Number);
  const dates = generateMonthDates(year, month); // 指定された月の日付を生成

  // ページング処理
  const handlePreviousMonth = () => {
    const prevDate = new Date(year, month - 2); // 前月
    setCurrentMonth(`${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`);
  };

  const handleNextMonth = () => {
    const nextDate = new Date(year, month); // 翌月
    setCurrentMonth(`${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}`);
  };

  return (
    <div>
      <h2>勤務予定表</h2>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handlePreviousMonth} style={{ marginRight: "1rem" }}>前月</button>
        <span>{currentMonth}</span>
        <button onClick={handleNextMonth} style={{ marginLeft: "1rem" }}>翌月</button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th rowSpan={2} style={{ border: "1px solid #ddd", padding: "0.5rem" }}>従業員名</th>
            <th rowSpan={2} style={{ border: "1px solid #ddd", padding: "0.5rem" }}>予定／実績</th>
            {dates.map(({ date, day, isWeekend }) => (
              <th
                key={date}
                style={{
                  border: "1px solid #ddd",
                  padding: "0.5rem",
                  backgroundColor: isWeekend ? "#f9e6e6" : "#f4f4f4", // 土日は背景色を変更
                  color: isWeekend ? "red" : "black", // 土日は文字色を変更
                }}
              >
                {date.split("-")[2]} ({day})
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.employee_id}>
                <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{employee.employee_name}</td>
                <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  <div>予定</div>
                  <div>実績</div>
                </td>
                {dates.map(({ date }) => {
                  const schedule = schedules.find(
                    (s) => s.employee_id === employee.employee_id && s.date === date
                  );
                  return (
                    <td key={date} style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                      <div>{schedule ? schedule.shift : "-"}</div>
                      <div>{schedule ? schedule.actual : "-"}</div>
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={dates.length + 2} style={{ textAlign: "center", padding: "1rem" }}>
                データがありません
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkSchedule;