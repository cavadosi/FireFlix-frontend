import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import AuthContext from "@/components/core/UserProvider";
import { useContext, useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const auth = useContext(AuthContext);

  const login = auth?.Login;
  const signup = auth?.Signup;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error before attempting login
    setLoading(true);

    if (login) {
      const success = await login(username, password);
      if (!success) {
        setError("Invalid username or password");
      }
    }
    setLoading(false);
  };

  return (
    <DialogContent
      className={cn(
        "flex flex-col gap-6 p-0 bg-transparent border-0",
        className
      )}
      {...props}
    >
      <Card className="mx-2">
        <DialogTitle>
          <CardHeader>
            <CardTitle className="text-2xl">Log in</CardTitle>
            <CardDescription>
              Enter your credentials below to login to your TMDB account
            </CardDescription>
          </CardHeader>
        </DialogTitle>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="userName">Username</Label>
                <Input
                  id="userName"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    onMouseDown={signup}
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="underline underline-offset-4"
                onMouseDown={signup}
              >
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </DialogContent>
  );
}