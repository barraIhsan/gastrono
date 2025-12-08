"use client";
import { deleteRecipe, getRecipe } from "@/lib/api/recipe";
import { useEffect, useState } from "react";
import { recipeApiSchema } from "@/lib/schema/recipe";
import z from "zod";
import { ChevronLeft, Clock, Pencil, Trash2 } from "lucide-react";
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
import Link from "next/link";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { fmtTimestamp, fmtTotalMin } from "@/lib/utils";

export default function Detail({ id }: { id: string }) {
  const [recipe, setRecipe] = useState<z.infer<typeof recipeApiSchema>>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await getRecipe(id);
        const html = generateHTML(JSON.parse(res.data.description), [
          StarterKit,
        ]);

        setRecipe({ ...res.data, description: html });
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
    <section className="pt-10 pb-30">
      <div className="flex flex-wrap gap-5 justify-between mb-12">
        <Link href="/" className="flex flex-wrap items-center gap-3">
          <ChevronLeft size={32} />
          <p className="text-2xl font-bold">Recipe Details</p>
        </Link>
        <div className="flex gap-3">
          <Button
            className="cursor-pointer"
            variant="default"
            size="icon-lg"
            asChild
          >
            <Link href={`/recipe/${id}/edit`}>
              <Pencil />
            </Link>
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="cursor-pointer"
                variant="default"
                size="icon-lg"
              >
                <Trash2 />
              </Button>
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
      <div className="flex flex-col lg:flex-row gap-12">
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + recipe.image_url}
          width={288}
          height={288}
          alt={recipe.title}
          className="w-full h-50 sm:size-50 2xl:size-72 object-cover shrink-0 rounded-md"
        />
        <div>
          <h1 className="text-3xl font-bold wrap-anywhere mb-1">
            {recipe.title}
          </h1>
          <p className="font-normal text-muted-foreground inline-flex items-center gap-1 mb-5">
            <Clock size={16} />
            {fmtTotalMin(recipe.total_minutes)}
          </p>
          <article
            className="prose prose-neutral dark:prose-invert max-w-none wrap-anywhere"
            dangerouslySetInnerHTML={{ __html: recipe.description }}
          />
          <p className="italic text-sm text-muted-foreground mt-12">
            Created at {fmtTimestamp(recipe.created_at)}
          </p>
        </div>
      </div>
    </section>
  );
}
