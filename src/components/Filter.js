import React from "react";

function Filter({ onFilterChange }) {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="flex items-center my-4">
      <label className="mr-2 text-gray-600 font font-bold">Filter</label>
      <input
        type="text"
        className="px-2 py-1 border border-gray-400"
        placeholder="Enter name or WMI"
        onChange={handleFilterChange}
      />
    </div>
  );
}

export default Filter;
