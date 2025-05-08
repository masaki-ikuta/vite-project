import React, { useEffect, useState } from "react";
import { fetchEmployees, addEmployee } from "../utils/api";

export type Employee = {
  organization_id: string;
  employee_id: string;
  employee_name: string;
  department?: string;
  role?: string;
};

const EmployeeForm: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newEmployee, setNewEmployee] = useState<Employee>({
    organization_id: "org-0001",
    employee_id: "",
    employee_name: "",
    department: "",
    role: "",
  });

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees("org-0001");
        setEmployees(data);
        setFilteredEmployees(data);
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
      setEmployees((prev) => [...prev, addedEmployee]);
      setFilteredEmployees((prev) => [...prev, addedEmployee]);
      setNewEmployee({ organization_id: "org-0001", employee_id: "", employee_name: "", department: "", role: "" });
    } catch (err) {
      console.error(err);
      setError("社員の追加に失敗しました");
    }
  };

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="employee-form">
      <h2>社員一覧</h2>
      <div className="search-box">
        <label>
          検索:
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="社員名または社員IDで検索"
          />
        </label>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>社員名</th>
            <th>社員ID</th>
            <th>組織ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.employee_name}</td>
              <td>{employee.employee_id}</td>
              <td>{employee.organization_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>社員追加</h2>
      <form onSubmit={handleAddEmployee} className="add-employee-form">
        <div>
          <label>
            社員ID:
            <input
              type="text"
              name="employee_id"
              value={newEmployee.employee_id}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            社員名:
            <input
              type="text"
              name="employee_name"
              value={newEmployee.employee_name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            部署 (任意):
            <input
              type="text"
              name="department"
              value={newEmployee.department || ""}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            役職 (任意):
            <input
              type="text"
              name="role"
              value={newEmployee.role || ""}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">社員を追加</button>
      </form>
    </div>
  );
};

export default EmployeeForm;