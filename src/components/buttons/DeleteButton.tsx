"use client";

import React from "react";

type DeleteButtonProps = {
  onDelete: () => void; // Callback function to handle deletion
  loading: boolean; // Loading state for the button
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, loading }) => {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={onDelete}
        className="px-6 py-2 bg-red-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default DeleteButton;
