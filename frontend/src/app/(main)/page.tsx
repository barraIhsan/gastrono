"use client";
import { useAuthStore } from "@/lib/store/auth";
import NotLoggedIn from "./NotLoggedIn";
import { Separator } from "@/components/ui/separator";
import ListRecipe from "@/components/ListRecipe";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import Link from "next/link";

export default function Main() {
  const loading = useAuthStore((state) => state.loading);
  const username = useAuthStore((state) => state.username);

  if (!loading) {
    return !username ? (
      <NotLoggedIn />
    ) : (
      <>
        <section className="pt-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-5">
              What&apos;s on your mind?
            </h1>
            <Button className="cursor-pointer" asChild>
              <Link href="/recipe/new">
                <SquarePen />
                Create new recipe
              </Link>
            </Button>
          </div>
        </section>
        <Separator className="mt-20 mb-10" />
        <ListRecipe />
        <div className="h-500"></div>
      </>
    );
  }
}
