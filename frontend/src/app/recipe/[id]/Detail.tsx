"use client";
import { deleteRecipe, getRecipe } from "@/lib/api/recipe";
import { useEffect, useState } from "react";
import { recipeApiSchema } from "@/lib/schema/recipe";
import z from "zod";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

export default function Detail({ id }: { id: string }) {
  const [recipe, setRecipe] = useState<z.infer<typeof recipeApiSchema>>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await getRecipe(id);
        setRecipe(res.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            toast.error("Recipe not found");
            router.replace("/");
          } else {
            toast.error("An error occured");
            router.replace("/");
          }
        }
      }
    };

    fetchRecipe();
  }, [id, router]);

  const handleDelete = async () => {
    try {
      await deleteRecipe(id);
      setDialogOpen(false);
      router.replace("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An error occured");
        }
      }
    }
  };

  if (!recipe) return null;

  return (
    <section className="pt-10">
      <div className="flex justify-between mb-12">
        <div className="flex items-center gap-3">
          <ChevronLeft
            onClick={() => router.push("/")}
            size={32}
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
        </div>
        <div className="flex gap-5">
          <Pencil className="cursor-pointer" />
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Trash2 className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Recipe</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this recipe? This action is
                  irreversible
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="cursor-pointer"
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Image
        src={process.env.NEXT_PUBLIC_API_URL + recipe.image_url}
        width={400}
        height={400}
        alt={recipe.title}
        className="size-100 object-cover float-right"
      />
      <p>{recipe.description}</p>
    </section>
  );
}
