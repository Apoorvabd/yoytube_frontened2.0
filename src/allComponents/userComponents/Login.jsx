import { useForm } from "react-hook-form"
import { Button } from "@/allComponents/ui/button"
import { Input } from "@/allComponents/ui/input"
import { Label } from "@/allComponents/ui/label"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useContext } from "react"
import { DataContext } from "../../Context/UserContext"
import api from "@/lib/api"

function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(DataContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/users/login", data)
      toast.success(`Welcome back, ${response.data.data.user.fullName}`);
      setUser(response.data.data);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      setTimeout(() => navigate("/Dashboard"), 1500);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md transition-all duration-700 ease-out opacity-100 translate-y-0">
        <div className="mb-10 text-center">
          <div className="inline-flex flex-col items-center gap-2 transition-transform duration-500 hover:scale-105">
            <div className="h-16 w-16 rounded-[2rem] bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/40 mb-2">
              <span className="text-3xl font-black">N</span>
            </div>
            <span className="text-4xl font-[1000] tracking-tighter text-foreground">
              NAVYA<span className="text-primary">.</span>
            </span>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/60">Creative Studio</p>
          </div>
        </div>

        <div className="bg-card p-10 md:p-12 border border-border shadow-2xl relative overflow-hidden rounded-3xl">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary/10" />

          <div className="mb-10">
            <h2 className="text-3xl font-black text-foreground tracking-tighter">Welcome back</h2>
            <p className="text-sm font-bold text-muted-foreground mt-2">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Email Address</Label>
              <Input
                {...register("email", { required: "Email is required" })}
                className="bg-muted border-border focus:border-primary focus:ring-1 focus:ring-primary h-14 px-6 text-base rounded-2xl transition-all"
                placeholder="alex@studio.com"
              />
              {errors.email && (
                <p className="text-[10px] font-bold text-destructive uppercase ml-1 animate-pulse">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Password</Label>
                <button 
                  type="button" 
                  className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                >
                  Forgot Key?
                </button>
              </div>
              <Input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="bg-muted border-border focus:border-primary focus:ring-1 focus:ring-primary h-14 px-6 text-base rounded-2xl transition-all"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-[10px] font-bold text-destructive uppercase ml-1 animate-pulse">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]">
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full h-14 text-sm font-bold uppercase tracking-[0.2em] py-4 rounded-2xl shadow-lg shadow-primary/20"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                    Verifying...
                  </div>
                ) : "Sign In to Studio"}
              </Button>
            </div>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-bold text-muted-foreground">
              New to the platform?{" "}
              <button 
                onClick={() => navigate("/signup")}
                className="text-primary hover:underline underline-offset-4 decoration-2 focus:outline-none transition-all"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;