"use client";

import React from "react";

type EditButtonProps = {
  onEdit: () => void; // Callback function to handle deletion
  loading: boolean; // Loading state for the button
};

const EditButton: React.FC<EditButtonProps> = ({ onEdit, loading }) => {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={onEdit}
        className="px-6 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Updating..." : "Edit"}
      </button>
    </div>
  );
};

export default EditButton;
