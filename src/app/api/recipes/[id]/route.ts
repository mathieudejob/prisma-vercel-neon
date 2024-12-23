import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, description, ingredients } = await req.json();

  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id: parseInt(id) },
      data: { title, description, ingredients },
    });
    return NextResponse.json(updatedRecipe, { status: 200 });
    // } catch (error) {
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update recipe" + error },
      { status: 500 }
    );
  }
}
