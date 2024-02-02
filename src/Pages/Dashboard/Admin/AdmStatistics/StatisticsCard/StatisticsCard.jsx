import React from "react";

const StatisticsCard = ({ icon, title, count, amount }) => {
  return (
    <div className="bg-[#faf8f7] shadow-xl flex p-5">
      {icon && React.cloneElement(icon, { className: "mr-5 text-4xl" })}
      <div>
        <h1 className="text-lg mt-5">
          {title} Amount:{" "}
          <span className="text-red-400">$ {amount.toFixed(2)}</span>
        </h1>
      </div>
    </div>
  );
};

export default StatisticsCard;
