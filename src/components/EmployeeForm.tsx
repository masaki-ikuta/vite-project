import React, { useEffect, useState } from "react";
import { fetchEmployees, addEmployee } from "../utils/api";

export type Employee = {
  organization_id: string; // 必須
  employee_id: string;     // 必須
  employee_name: string;   // 必須
  department?: string;     // 任意
  role?: string;           // 任意
};

const EmployeeForm: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // 検索クエリ
  const [newEmployee, setNewEmployee] = useState<Employee>({
    organization_id: "org-0001",
    employee_id: "",
    employee_name: "",
    department: "", // 任意項目の初期値
    role: "",       // 任意項目の初期値
  });
  const organization_id = "org-0001";

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees(organization_id);
        setEmployees(data);
        setFilteredEmployees(data); // 初期状態では全社員を表示
      } catch (err) {
        console.error(err);
        setError("社員データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // 検索クエリに基づいて社員を絞り込む
    const filtered = employees.filter((employee) =>
      employee.employee_name.toLowerCase().includes(query.toLowerCase()) ||
      employee.employee_id.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedEmployee = await addEmployee(newEmployee);
      setEmployees((prev) => [...prev, addedEmployee]); // 新しい社員をリストに追加
      setFilteredEmployees((prev) => [...prev, addedEmployee]); // 絞り込みリストにも追加
      setNewEmployee({ organization_id: "org-0001", employee_id: "", employee_name: "", department: "", role: "" }); // フォームをリセット
    } catch (err) {
      console.error(err);
      setError("社員の追加に失敗しました");
    }
  };

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>社員一覧</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          検索:
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ marginLeft: "0.5rem", padding: "0.3rem" }}
            placeholder="社員名または社員IDで検索"
          />
        </label>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem", backgroundColor: "#f4f4f4" }}>社員名</th>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem", backgroundColor: "#f4f4f4" }}>社員ID</th>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem", backgroundColor: "#f4f4f4" }}>組織ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.employee_id}>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{employee.employee_name}</td>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{employee.employee_id}</td>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{employee.organization_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ marginTop: "2rem" }}>社員追加</h2>
      <form onSubmit={handleAddEmployee} style={{ marginBottom: "1rem" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            社員ID:
            <input
              type="text"
              name="employee_id"
              value={newEmployee.employee_id}
              onChange={handleInputChange}
              style={{ marginLeft: "0.5rem", padding: "0.3rem" }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            社員名:
            <input
              type="text"
              name="employee_name"
              value={newEmployee.employee_name}
              onChange={handleInputChange}
              style={{ marginLeft: "0.5rem", padding: "0.3rem" }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            部署 (任意):
            <input
              type="text"
              name="department"
              value={newEmployee.department || ""}
              onChange={handleInputChange}
              style={{ marginLeft: "0.5rem", padding: "0.3rem" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            役職 (任意):
            <input
              type="text"
              name="role"
              value={newEmployee.role || ""}
              onChange={handleInputChange}
              style={{ marginLeft: "0.5rem", padding: "0.3rem" }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          社員を追加
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;