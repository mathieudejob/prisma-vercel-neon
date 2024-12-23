"use client";

import { useState } from "react";
import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButton";
import EditRecipeModal from "./EditRecipeModal";

export type RecipeType = {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
};

type RecipeProps = {
  recipe: RecipeType;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (updatedRecipe: RecipeType) => void; // Callback for updating the recipe
};

const Recipe: React.FC<RecipeProps> = ({ recipe, onDelete, onUpdate }) => {
  const [loading, setLoading] = useState(false); // Local loading state
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onDelete(recipe.id); // Ensure Promise resolves before toggling loading
    setLoading(false);
  };

  const handleEditClick = () => {
    setEditModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setEditModalOpen(false); // Close the modal
  };

  const handleModalSubmit = (updatedRecipe: RecipeType) => {
    onUpdate(updatedRecipe); // Call the update function passed as a prop
    handleModalClose(); // Close the modal after updating
  };

  return (
    <div className="mb-2">
      <li className="border p-4 rounded shadow flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">{recipe.title}</h2>
          <p className="mt-2">{recipe.description}</p>
          <p className="text-sm text-gray-600 mt-1">
            Ingredients: {recipe.ingredients.join(", ")}
          </p>
        </div>
        <div className="flex justify-between">
          <EditButton onEdit={handleEditClick} loading={loading} />
          <span className="w-2"></span>
          <DeleteButton onDelete={handleDelete} loading={loading} />
        </div>
      </li>

      {/* Render the EditRecipeModal */}
      <EditRecipeModal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        recipe={recipe} // Pass the current recipe details to the modal
      />
    </div>
  );
};

export default Recipe;
