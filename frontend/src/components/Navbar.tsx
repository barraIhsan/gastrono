"use client";
import { currentUser } from "@/lib/api/user";
import { ChevronDown, LogIn, LogOut, Moon, Sun } from "lucide-react";
import { useLayoutEffect } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { logout } from "@/lib/api/auth";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export default function Navbar() {
  const loading = useAuthStore((state) => state.loading);
  const setLoading = useAuthStore((state) => state.setLoading);
  const username = useAuthStore((state) => state.username);
  const setUsername = useAuthStore((state) => state.setUsername);

  const { theme, setTheme } = useTheme();

  useLayoutEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await currentUser();
        setUsername(res.data.username);
      } catch {
        setUsername("");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setLoading, setUsername]);

  const handleLogout = async () => {
    await logout();
    useAuthStore.getState().clearToken();
    setUsername("");
    toast.success("Logged out");
  };

  return (
    <nav className="fixed top-0 inset-x-0 bg-background/80 backdrop-blur-md z-10">
      <div className="container mx-auto flex justify-between items-center px-5 py-5 h-20">
        <Link href="/" className="text-2xl font-bold">
          Gastrono
        </Link>
        <div className="flex items-center gap-5">
          {!loading &&
            (username ? (
              <HoverCard openDelay={0}>
                <HoverCardTrigger className="flex items-center gap-3 cursor-pointer px-3 py-1.5">
                  <p>{username}</p>
                  <ChevronDown size={16} className="text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent className="size-fit">
                  <Button
                    className="flex items-center gap-3 cursor-pointer"
                    variant="ghost"
                    onClick={() => handleLogout()}
                  >
                    <p>Logout</p>
                    <LogOut size={16} className="text-muted-foreground" />
                  </Button>
                </HoverCardContent>
              </HoverCard>
            ) : (
              <Button variant="ghost" asChild>
                <Link
                  href="/login"
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <p>Login</p>
                  <LogIn size={16} className="text-muted-foreground" />
                </Link>
              </Button>
            ))}
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
