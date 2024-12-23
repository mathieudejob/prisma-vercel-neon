import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const { title, description, ingredients } = await req.json();

    const updatedRecipe = await prisma.recipe.update({
      where: { id: parseInt(id) },
      data: { title, description, ingredients },
    });

    return NextResponse.json(updatedRecipe, { status: 200 });
  } catch (error) {
    console.error("Error updating recipe:", error);

    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
}
