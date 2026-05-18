import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  BarChart3,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MessageSquare,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";
import * as z from "zod";
import { Link, useNavigate } from "react-router";
import { useRegister } from "../hooks/useRegister";

const registerSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  terms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister({
    onSuccess: () => navigate("/login"),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const password = watch("password");

  const getPasswordStrength = () => {
    if (!password) return "Weak";
    if (password.length < 8) return "Weak";
    if (password.length < 12) return "Medium";
    return "Strong";
  };

  const onSubmit = async (data: RegisterFormValues) => {
    mutate({
      username: data.fullName,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="auth-layout">
        {/* LEFT SIDE */}
        <div className="auth-left">
          <div className="w-full max-w-md">
            {/* Back */}
            <Link
              to={"/"}
              className="mb-10 flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-800"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Home
            </Link>

            {/* Logo */}
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500 shadow-lg">
                <span className="text-lg font-bold text-white">⚡</span>
              </div>

              <h1 className="text-2xl font-bold text-primary-700">
                LaunchPoll
              </h1>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                Create your account
              </h2>

              <p className="mt-3 text-gray-500">
                Start creating interactive polls and gathering insights today.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="label">Full Name</label>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register("fullName")}
                    className="input input-with-icon"
                  />
                </div>

                {errors.fullName && (
                  <p className="error-text">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="label">Work Email</label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    placeholder="name@company.com"
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
                <label className="label">Password</label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className="input input-with-icon pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Password Strength */}
                <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-wide text-gray-400">
                  <span>Password Strength</span>

                  <span>{getPasswordStrength()}</span>
                </div>

                {errors.password && (
                  <p className="error-text">{errors.password.message}</p>
                )}
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start gap-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    {...register("terms")}
                    className="checkbox mt-1"
                  />

                  <span>
                    I agree to the{" "}
                    <button type="button" className="btn-ghost font-medium">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button type="button" className="btn-ghost font-medium">
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>

                {errors.terms && (
                  <p className="error-text">{errors.terms.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="btn-primary w-full"
              >
                {isPending ? "Creating Account..." : "Get Started for Free"}

                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Footer */}
              <p className="pt-2 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link to={"/login"} className="btn-ghost font-semibold">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <div className="badge mb-6">Join 10,000+ creators</div>

          <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-gray-900 xl:text-5xl">
            The smartest way to{" "}
            <span className="italic text-primary-600">measure the pulse</span>{" "}
            of your community.
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
            LaunchPoll gives you the tools to create beautiful, engaging polls
            and turn real-time data into actionable decisions.
          </p>

          {/* Feature Cards */}
          <div className="mt-12 space-y-5">
            <div className="feature-card">
              <div className="flex items-start gap-4">
                <div className="feature-icon">
                  <BarChart3 className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Real-time Analytics
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    Watch results pour in with live-updating charts and
                    demographic breakdowns.
                  </p>
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="flex items-start gap-4">
                <div className="feature-icon">
                  <MessageSquare className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Seamless Integration
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    Embed your polls anywhere from your personal blog to
                    enterprise dashboards.
                  </p>
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="flex items-start gap-4">
                <div className="feature-icon">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Anonymous Voting
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    Ensure honest feedback with cryptographically secure
                    anonymous voting options.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-4 rounded-3xl border border-white/60 bg-white/70 p-6 backdrop-blur">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-300" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-400" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-500" />
              </div>

              <span className="text-sm font-medium text-gray-700">
                ★★★★★ 4.9/5 Rating
              </span>
            </div>

            <p className="text-sm italic leading-relaxed text-gray-600">
              “LaunchPoll has completely changed how we run our weekly product
              team syncs. The instant insights are incredible.”
            </p>

            <div className="mt-4">
              <h4 className="font-semibold text-gray-900">Sarah Jenkins</h4>

              <p className="text-sm text-gray-500">Product Lead at TechFlow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
