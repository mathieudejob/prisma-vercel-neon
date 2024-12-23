// components/EditRecipeModal.tsx
import React, { useState, useEffect } from "react";

interface EditRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipeData: {
    id: number;
    title: string;
    description: string;
    ingredients: string[];
  }) => void;
  recipe: {
    id: number;
    title: string;
    description: string;
    ingredients: string[];
  };
}

const EditRecipeModal: React.FC<EditRecipeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  recipe,
}) => {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState(recipe.ingredients);

  useEffect(() => {
    if (isOpen) {
      setTitle(recipe.title);
      setDescription(recipe.description);
      setIngredients(recipe.ingredients);
    }
  }, [isOpen, recipe]);

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleSubmit = () => {
    onSubmit({ id: recipe.id, title, description, ingredients });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 text-gray-700">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Recipe</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
        ></textarea>

        <div className="mb-4">
          <h4 className="font-medium mb-1">Ingredients</h4>
          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Ingredient ${index + 1}`}
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
            />
          ))}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeModal;
