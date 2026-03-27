import { useForm } from "react-hook-form"

import { Button } from "@/allComponents/ui/button"
import { Input } from "@/allComponents/ui/input"
import { Label } from "@/allComponents/ui/label"
import { FaUser, FaLock } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useContext } from "react"
import { DataContext } from "../../Context/UserContext"
import api from "@/lib/api"



function Login(){

  const navigate = useNavigate()
    const { user, setUser} = useContext(DataContext);
  

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      console.log("Submitting login", data)
      const response = await api.post("/users/login", data)
      console.log(response.data)
      toast.success(`Welcome back, ${response.data.data.user.fullName}`);
      setUser(response.data.data);
      localStorage.setItem("user", JSON.stringify(response.data.data));

      setTimeout(() => {
        navigate("/Dashboard");
      }, 2000);
      console.log("USER OBJECT:", user);
      console.log("ACCESS TOKEN:", user?.accessToken);
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E50914]/10 to-transparent opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-6 animate-fade-up">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-[#b3b3b3]">Creator Platform</p>
          <h1 className="mt-2 text-4xl font-black text-white">NAVYA</h1>
        </div>

        <div className="surface-card p-6 md:p-8 space-y-5">
          <div className="text-center">
            <p className="text-xl font-bold text-white">Sign In</p>
            <p className="mt-1 text-sm text-[#b3b3b3]">Continue to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="text-white">Email</Label>
              <Input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
                required
                placeholder="your@email.com"
                className="mt-1"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-[#ff7b82]">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                required
                placeholder="••••••••"
                className="mt-1"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-[#ff7b82]">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center text-sm text-[#b3b3b3]">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/Signup")}
              className="text-[#E50914] font-semibold hover:underline"
            >
              Create one
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login