import React, { useEffect, useState } from "react";
import { fetchEmployees } from "../utils/api";

type Employee = {
  organization_id: string;
  employee_id: string;
  employee_name: string;
};

const EmployeeForm: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const organization_id = "org-0001";

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees(organization_id);
        setEmployees(data);
      } catch (err) {
        console.error(err);
        setError("社員データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>社員一覧</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem", backgroundColor: "#f4f4f4" }}>社員名</th>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem", backgroundColor: "#f4f4f4" }}>社員ID</th>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem", backgroundColor: "#f4f4f4" }}>組織ID</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employee_id}>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{employee.employee_name}</td>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{employee.employee_id}</td>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{employee.organization_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeForm;