"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/login", { method: "GET" });
      if (res.ok) {
        router.replace("/dashboard");
      }
    };
    checkAuth();
  }, [router]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const res = await fetch("/api/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!res.ok) {
  //       const data = await res.json();
  //       throw new Error(data.error || "Login failed");
  //     }

  //     toast.success("Logged in successfully");
  //     router.replace("/dashboard");
  //   } catch (error) {
  //     toast.error(error instanceof Error ? error.message : "Login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();

        if (res.status === 401) {
          throw new Error("Incorrect email or password");
        }

        throw new Error(data.error || "Login failed");
      }

      toast.success("Logged in successfully");
      router.replace("/dashboard");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Incorrect email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFEFEF] p-6">
      <Card className="w-full max-w-md border-[#0FB3B7]/20 bg-white/70 backdrop-blur-sm">
        <CardHeader className="border-b border-[#FFD700]/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
            <CardTitle className="text-[#0FB3B7] text-xl font-bold">Admin Login</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#0FB3B7] font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jsi.com"
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#0FB3B7] font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0FB3B7] hover:bg-[#0E9EA2] text-white"
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
