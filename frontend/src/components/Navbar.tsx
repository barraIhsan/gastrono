"use client";
import { currentUser } from "@/lib/api/user";
import { ChevronDown, LogIn, LogOut } from "lucide-react";
import { useLayoutEffect } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { logout } from "@/lib/api/auth";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth";
import { toast } from "sonner";

export default function Navbar() {
  const loading = useAuthStore((state) => state.loading);
  const setLoading = useAuthStore((state) => state.setLoading);
  const username = useAuthStore((state) => state.username);
  const setUsername = useAuthStore((state) => state.setUsername);

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
    <nav className="container mx-auto fixed top-0 inset-x-0">
      <div className="flex justify-between items-center px-5 py-5 h-20">
        <Link href="/" className="text-2xl font-bold">
          Gastrono
        </Link>
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
      </div>
    </nav>
  );
}
