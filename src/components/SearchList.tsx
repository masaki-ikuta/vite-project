import React, { useState } from "react";

const SearchList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // 検索キーワード
  const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]; // 一覧データ

  // 検索キーワードに基づいてフィルタリング
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="検索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index} style={{ padding: "0.5rem 0", borderBottom: "1px solid #ddd" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;