import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function NotLoggedIn() {
  return (
    <section className="text-center pt-10">
      <h1 className="font-bold text-3xl mb-5">
        Quick and easy way to take your recipe notes
      </h1>
      <Button className="cursor-pointer" asChild>
        <Link href="/login">
          <LogIn />
          Login to get started
        </Link>
      </Button>
    </section>
  );
}
