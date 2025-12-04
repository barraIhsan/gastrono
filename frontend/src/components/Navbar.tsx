import { currentUser } from "@/lib/api/user";
import { ChevronDown, LogIn, LogOut } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { logout } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth";

export default function Navbar() {
  const [user, setUser] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useLayoutEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await currentUser();
        console.log(res);
        setUser(res.data.data.username);
      } catch {
        setUser("");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    useAuthStore.getState().clearToken();
    setUser("");
  };

  return (
    <nav className="container mx-auto fixed top-0 inset-x-0">
      <div className="flex justify-between items-center px-5 py-5">
        <Link href="/" className="text-2xl font-bold">
          Gastrono
        </Link>
        {!loading &&
          (user ? (
            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger className="flex items-center gap-3 cursor-pointer px-3 py-1.5">
                <p>{user}</p>
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
