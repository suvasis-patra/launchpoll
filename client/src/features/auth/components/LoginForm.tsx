import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, ArrowRight } from "lucide-react";
import * as z from "zod";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../hooks/useRegister";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin({
    onSuccess: () => navigate("/dashboard"),
  });
  const onSubmit = async (data: LoginFormValues) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary-50 via-white to-emerald-50 p-4">
      <div className="card w-full max-w-md p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 shadow-lg">
            <span className="text-2xl font-bold text-white">⚡</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your credentials to access your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="label">Email Address</label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                className="input input-with-icon"
              />
            </div>

            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="label mb-0">Password</label>

              <button type="button" className="btn-ghost text-xs">
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="input input-with-icon"
              />
            </div>

            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              {...register("rememberMe")}
              className="checkbox"
            />

            <label htmlFor="rememberMe" className="text-sm text-gray-600">
              Keep me signed in for 30 days
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full"
          >
            {isPending ? "Signing In..." : "Sign In to Dashboard"}

            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          New to LaunchPoll?{" "}
          <Link to={"/register"} className="btn-ghost font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
