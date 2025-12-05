"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { recipeSchema } from "@/lib/schema/recipe";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, X } from "lucide-react";
import { uploadImg } from "@/lib/api/upload";
import { createRecipe } from "@/lib/api/recipe";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Tiptap from "@/components/TipTap";

export default function AddRecipe() {
  const [previewImg, setPreviewImg] = useState("");
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof recipeSchema>) => {
    // upload image
    const formData = new FormData();
    formData.append("image", data.image[0]);
    const resImg = await uploadImg(formData);

    // create recipe
    const payload = {
      title: data.title,
      description: data.description,
      image_url: resImg.data.filePath,
    };

    try {
      await createRecipe(payload);

      // clear form
      setPreviewImg("");
      form.reset();
      router.push("/");

      toast.success("Recipe created successfully");
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

  return (
    <section className="pt-10">
      <div className="flex items-center gap-3 mb-12">
        <ChevronLeft
          onClick={() => router.push("/")}
          size={32}
          className="cursor-pointer"
        />
        <h1 className="text-2xl font-bold">Create new recipe</h1>
      </div>
      <form
        id="form-add-recipe"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FieldGroup>
          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Recipe Image</FieldLabel>
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="relative">
                    <Input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="h-20 w-full sm:size-40 cursor-pointer file:opacity-0 text-transparent"
                      onChange={(e) => {
                        const files = e.target.files;
                        field.onChange(e.target.files);
                        if (files && files[0]) {
                          setPreviewImg(URL.createObjectURL(files[0]));
                        }
                      }}
                    />
                    <div className="absolute inset-0 text-muted-foreground flex justify-center items-center select-none pointer-events-none">
                      <p className="text-center text-sm">
                        Drop image here or click to upload
                      </p>
                    </div>
                  </div>
                  {previewImg && (
                    <div className="h-60 sm:h-40 relative">
                      <Image
                        src={previewImg}
                        alt="uploaded image"
                        height={160}
                        width={282}
                        className="object-cover size-full"
                      />
                      <div
                        className="bg-accent border border-input size-fit p-1.5 rounded-full absolute -top-5 -right-5 cursor-pointer"
                        onClick={() => {
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                          field.onChange(undefined);
                          setPreviewImg("");
                        }}
                      >
                        <X size={16} className="text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Recipe Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Recipe Instructions</FieldLabel>
                <Tiptap value={field.value} onChange={field.onChange} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Button
        type="submit"
        form="form-add-recipe"
        className="cursor-pointer mt-5"
      >
        Create
      </Button>
    </section>
  );
}
