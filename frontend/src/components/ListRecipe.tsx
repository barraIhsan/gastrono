import { getAllRecipes } from "@/lib/api/recipe";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, Search, X } from "lucide-react";
import { cn, fmtTotalMin } from "@/lib/utils";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Recipe = {
  id: string;
  title: string;
  total_minutes: number;
  image_url: string;
  created_at: string;
};

export default function ListRecipe() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await getAllRecipes();
      setRecipes(res.data);
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const delaySearchTimeout = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);
    return () => clearTimeout(delaySearchTimeout);
  }, [searchValue]);

  useEffect(() => {
    const fetchSearchedRecipes = async () => {
      const res = await getAllRecipes(debouncedSearchValue);
      setRecipes(res.data);
    };

    fetchSearchedRecipes();
  }, [debouncedSearchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleMobileSearchOpen = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  return (
    <section>
      <div className="flex gap-5 justify-between items-center mb-8">
        <h1
          className={cn(
            "text-3xl font-bold",
            mobileSearchOpen && "hidden sm:block",
          )}
        >
          Your Recipes
        </h1>
        <InputGroup className="max-w-72 hidden sm:flex">
          <InputGroupInput
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        {mobileSearchOpen && (
          <Input
            className="flex sm:hidden"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        )}
        <Button
          variant="outline"
          size="icon"
          className="flex sm:hidden cursor-pointer"
          onClick={handleMobileSearchOpen}
        >
          {mobileSearchOpen ? <X /> : <Search />}
        </Button>
      </div>
      {recipes.length < 1 ? (
        <p className="text-center text-muted-foreground mt-24">
          {debouncedSearchValue
            ? "No recipes match your search"
            : "You haven't created any recipes yet"}
        </p>
      ) : (
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
      )}
    </section>
  );
}
