import React, { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h2>カウント: {count}</h2>
      <button onClick={() => setCount(count + 1)}>増加</button>
      <button onClick={() => setCount(count - 1)}>減少</button>
    </div>
  );
};

export default Counter;