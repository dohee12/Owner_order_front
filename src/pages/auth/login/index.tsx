import { LoginForm } from "@/features/auth/login/ui/login-form";
import { Card } from "@/shared/ui/card";

export const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-8">
        <h1 className="mb-6 text-2xl font-bold text-center">크레마</h1>
        <LoginForm />
      </Card>
    </div>
  );
};
