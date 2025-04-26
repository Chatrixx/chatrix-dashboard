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
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      toast("Lütfen gerekli alanları doldurunuz.");
      return;
    }
    try {
      setLoginLoading(true);
      await login({ email, password });
    } catch {
      setLoginLoading(false);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="flex h-[100vh] w-full items-center justify-center animate-fade-in">
      <Card className="w-full max-w-md rounded-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Giriş Yap
          </CardTitle>
          <CardDescription className="text-center">
            Sistem erişimi için kullanıcı adı ve şifrenizi giriniz.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Kullanıcı Adı</Label>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Şifre</Label>
            </div>
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
              type="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button onClick={handleLogin} className="w-full">
            {!loginLoading ? `Giriş Yap` : <Loader2 className="animate-spin" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
