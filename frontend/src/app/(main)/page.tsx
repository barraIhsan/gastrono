"use client";
import { useAuthStore } from "@/lib/store/auth";
import NotLoggedIn from "./NotLoggedIn";
import AddRecipe from "@/components/AddRecipe";
import { Separator } from "@/components/ui/separator";

export default function Main() {
  const loading = useAuthStore((state) => state.loading);
  const username = useAuthStore((state) => state.username);

  if (!loading) {
    return !username ? (
      <NotLoggedIn />
    ) : (
      <>
        <AddRecipe />
        <Separator className="mt-20 mb-10" />
      </>
    );
  }
}
