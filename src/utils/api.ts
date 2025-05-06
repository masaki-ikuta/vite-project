import { Employee } from '../components/EmployeeForm';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchEmployees = async (organization_id: string): Promise<{ organization_id: string; employee_name: string; employee_id: string }[]> => {
  const response = await fetch(`${API_BASE_URL}/employees?organization_id=${encodeURIComponent(organization_id)}`); // クエリパラメータを追加
  if (!response.ok) {
    throw new Error("データの取得に失敗しました");
  }
  return response.json();
};

export const fetchWorkSchedules = async (organization_id: string, ymonth: string): Promise<{ date: string; employee_id: string; employee_name: string; shift: string; actual: string }[]> => {
  const response = await fetch(`${API_BASE_URL}/schedules?organization_id=${encodeURIComponent(organization_id)}&ymonth=${encodeURIComponent(ymonth)}`); // クエリパラメータを追加
  if (!response.ok) {
    throw new Error("勤務予定表の取得に失敗しました");
  }
  return response.json();
};

export const addEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await fetch(`${API_BASE_URL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee), // 任意項目も含めて送信
  });

  if (!response.ok) {
    throw new Error("社員の追加に失敗しました");
  }

  return response.json();
};