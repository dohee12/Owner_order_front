import { useLogin } from "@/entities/auth/model/use-login";
import { AuthInput } from "@/entities/auth/ui/auth-input";
import { Button } from "@/shared/ui/button";
import { useForm, Controller } from "react-hook-form";

interface LoginFormValues {
  id: string;
  password: string;
}

export const LoginForm = () => {
  const { mutate: login, isPending, error: loginError, isError: isLoginError } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      id: "", // 초기 값 명시
      password: "", // 초기 값 명시
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="id"
        control={control}
        rules={{ required: "아이디를 입력하세요" }}
        render={({ field }) => (
          <AuthInput {...field} type="text" placeholder="아이디를 입력하세요" error={errors.id} />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: "비밀번호를 입력하세요" }}
        render={({ field }) => (
          <AuthInput
            {...field}
            type="password"
            placeholder="비밀번호를 입력하세요"
            error={errors.password}
          />
        )}
      />
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "로그인 중..." : "로그인"}
      </Button>
      {/* 에러 메시지 표시 */}
      {isLoginError && (
        <p className="text-red-500">
          {loginError?.response?.data?.error || "알 수 없는 오류가 발생했습니다."}
        </p>
      )}
    </form>
  );
};
