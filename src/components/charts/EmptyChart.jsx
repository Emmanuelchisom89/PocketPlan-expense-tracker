import React from "react";

function EmptyChart() {
    const img = "/src/assets/transactions.svg"
  return (
    <div className="emptychart">
      <img src={img} alt="Empty Chart" />
      <p>
        You Have No Transactions Currently
      </p>
    </div>
  );
}

export default EmptyChart;