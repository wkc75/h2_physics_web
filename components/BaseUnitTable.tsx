import React from "react";

export function BaseUnitTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="table-wrapper">
      <table className="physics-table">
        {children}
      </table>
    </div>
  );
}
