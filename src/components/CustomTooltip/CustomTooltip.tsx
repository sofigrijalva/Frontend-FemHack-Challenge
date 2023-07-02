import React from "react";

export const CustomTooltip = ({
  active,
  amount,
  label,
}: {
  active?: boolean;
  amount: string;
  label: string;
}): JSX.Element | null => {
  if (active) {
    return (
      <div className="border-2 shadow-lg rounded-lg p-2 text-white">
        <h4>{label}</h4>
        <p>{amount}</p>
      </div>
    );
  }
  return null;
};
