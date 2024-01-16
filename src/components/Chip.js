import React from "react";

const Chip = ({ label, onDelete }) => (
  <div className="px-2 py-2 m-1 text-black bg-gray-200 rounded-lg">
    {label}
    <button className="px-1 py-1" onClick={onDelete}>
      ×
    </button>
  </div>
);

export default Chip;
