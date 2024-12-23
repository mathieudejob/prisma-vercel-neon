import RecipeList from "@/components/RecipesList";

export default async function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Recipes</h1>
      <RecipeList />
    </div>
  );
}
