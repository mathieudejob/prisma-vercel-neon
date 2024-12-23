"use client";

import React, { useEffect, useState } from "react";
import Recipe, { RecipeType } from "./Recipe";
import AddRecipeButton from "./buttons/AddRecipeButton";
import RecipeFormModal from "./RecipeFormModal";

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes/");
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched recipes:", data);
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/recipes");
      if (!res.ok) {
        const errorDetails = await res.text(); // Attempt to read the response body for more details
        throw new Error(
          `Failed to fetch recipes. Status: ${res.status} - ${res.statusText}. Details: ${errorDetails}`
        );
      }
      const data = await res.json();
      setRecipes(data);
    } catch (error) {
      if (error instanceof Error) {
        // Log a more detailed error message
        console.error("An error occurred while fetching recipes:", {
          message: error.message,
          stack: error.stack,
        });
      } else {
        // Handle non-Error objects, just in case
        console.error("An unknown error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    const res = await fetch("/api/recipes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
    } else {
      console.error("Failed to delete recipe.");
    }
  };

  const handleUpdate = async (updatedRecipe: RecipeType) => {
    try {
      console.log(updatedRecipe);

      const res = await fetch(`/api/recipes/${updatedRecipe.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (res.ok) {
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
          )
        );
      } else {
        console.error("Failed to update recipe.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleAddRecipeClick = () => {
    setIsModalOpen(true);
  };

  const handleAddRecipeSubmit = async (recipeData: {
    title: string;
    description: string;
    ingredients: string[];
  }) => {
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (res.ok) {
        fetchRecipes(); // Refresh the recipe list after adding
      } else {
        console.error("Failed to add recipe.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsModalOpen(false); // Close the modal after submission
    }
  };

  return (
    <div className="p-4">
      <AddRecipeButton onAdd={handleAddRecipeClick} loading={loading} />
      <RecipeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRecipeSubmit}
      />
      {loading ? (
        <p className="text-center text-gray-500 mt-4">Loading recipes...</p>
      ) : (
        <ul className="space-y-4 mt-4">
          {recipes.map((recipe) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              onDelete={handleDelete}
              onUpdate={handleUpdate} // Pass the update handler to the Recipe component
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
