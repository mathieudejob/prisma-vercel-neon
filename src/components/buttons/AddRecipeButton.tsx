"use client";

import React from "react";

type AddRecipeButtonProps = {
  onAdd: () => void; // Callback to trigger adding a recipe
  loading: boolean; // Loading state for the button
};

const AddRecipeButton: React.FC<AddRecipeButtonProps> = ({
  onAdd,
  loading,
}) => {
  return (
    <button
      onClick={onAdd}
      className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      disabled={loading}
    >
      {loading ? "Adding..." : "Add Recipe"}
    </button>
  );
};

export default AddRecipeButton;
