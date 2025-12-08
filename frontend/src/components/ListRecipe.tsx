import { getAllRecipes } from "@/lib/api/recipe";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import { fmtTotalMin } from "@/lib/utils";

type Recipe = {
  id: string;
  title: string;
  total_minutes: number;
  image_url: string;
  created_at: string;
};

export default function ListRecipe() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await getAllRecipes();
      setRecipes(res.data);
    };

    fetchRecipes();
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8">Your Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="pt-0 overflow-hidden cursor-pointer"
            onClick={() => router.push("/recipe/" + recipe.id)}
          >
            <Image
              src={process.env.NEXT_PUBLIC_API_URL + recipe.image_url}
              alt={recipe.title}
              width={359}
              height={200}
              className="object-cover h-50 w-full"
            />
            <CardHeader>
              <CardTitle className="inline-flex justify-between items-center">
                {recipe.title}
                <p className="font-normal text-muted-foreground text-sm inline-flex items-center gap-1">
                  <Clock size={16} />
                  {fmtTotalMin(recipe.total_minutes)}
                </p>
              </CardTitle>
              <CardDescription>
                <p className="font-normal text-muted-foreground text-sm">
                  {new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "full",
                    timeStyle: "short",
                  }).format(new Date(recipe.created_at))}
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
