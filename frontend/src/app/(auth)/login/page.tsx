"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import Link from "next/link";
import { login } from "@/lib/api/auth";
import { loginSchema } from "@/lib/schema/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthStore } from "@/lib/store/auth";
import Navbar from "@/components/Navbar";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await login(data);
      const accessToken = res.data.data.accessToken;
      useAuthStore.getState().setToken(accessToken);

      toast.success("Login success. Redirecting you to homepage", {
        duration: 2000,
      });
      router.replace("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An error occured");
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <section className="container mx-auto flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Login</CardTitle>
            <CardDescription>Enter your credentials below</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="username"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Username</FieldLabel>
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
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Password</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          type={showPassword ? "text" : "password"}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            aria-label="Show/Hide Password"
                            title="Show/Hide Password"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeClosed className="size-4" />
                            ) : (
                              <Eye className="size-4" />
                            )}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button
              type="submit"
              className="w-full cursor-pointer"
              form="form-login"
            >
              Login
            </Button>
            <p className="text-sm text-muted-foreground">
              Not registered?{" "}
              <Link href="/register" className="underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
