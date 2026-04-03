import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { Button } from "@/allComponents/ui/button";
import { Input } from "@/allComponents/ui/input";
import { Label } from "@/allComponents/ui/label";
import { UploadCloud, User, Mail, Lock, Camera } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const { setUser } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignup = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    
    if (data.avatar?.[0]) formData.append("avatar", data.avatar[0]);
    if (data.cover?.[0]) formData.append("cover", data.cover[0]);

    try {
      setIsSubmitting(true);
      const response = await api.post("/users/register", formData);
      setUser(response.data.data);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success(`Welcome to the Studio, ${data.fullName}!`);
      setTimeout(() => navigate("/Dashboard"), 1500);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 overflow-y-auto relative py-12">
      {/* Abstract Background Decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl transition-all duration-700 ease-out">
        <div className="mb-8 text-center">
          <div className="inline-flex flex-col items-center gap-2 group cursor-pointer" onClick={() => navigate("/")}>
            <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 mb-2 transition-transform group-hover:scale-110">
              <span className="text-2xl font-black">N</span>
            </div>
            <span className="text-3xl font-[1000] tracking-tighter text-foreground">
              NAVYA<span className="text-primary">.</span>
            </span>
          </div>
        </div>

        <div className="bg-card p-8 md:p-12 border border-border shadow-2xl relative overflow-hidden rounded-[2.5rem]">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary/10" />

          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black text-foreground tracking-tighter">Create your studio</h2>
            <p className="text-sm font-bold text-muted-foreground mt-2">Join a global community of world-class creators</p>
          </div>

          <form onSubmit={handleSubmit(onSignup)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Profile Details */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-[10px] text-black uppercase tracking-[0.2em] text-primary ml-1">Username</Label>
                  <Input
                    {...register("username", { required: "Username is required" })}
                    className="h-14 bg-muted border-border text-black focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl transition-all"
                    placeholder="skywalker_01"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Full Name</Label>
                  <Input
                    {...register("fullName", { required: "Full name is required" })}
                    className="h-14 bg-muted border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl transition-all text-black"
                    placeholder="Anakin Skywalker"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Email</Label>
                  <Input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    className="h-14 bg-muted border-border text-black focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl transition-all"
                    placeholder="anakin@jedi.com"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Master Key</Label>
                  <Input
                    {...register("password", { required: "Password is required" })}
                    type="password"
                    className="h-14 bg-muted border-border text-black  focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Media Uploads */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1 text-center block">Identity Image</Label>
                  <label className="flex flex-col items-center justify-center h-40 w-full border-2 border-dashed border-border rounded-[2rem] bg-muted/20 cursor-pointer hover:bg-muted/40 hover:border-primary/30 transition-all group">
                    <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-muted-foreground shadow-sm group-hover:scale-110 transition-transform">
                      <Camera size={20} />
                    </div>
                    <span className="mt-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Select Avatar</span>
                    <input {...register("avatar")} type="file" className="hidden" accept="image/*" />
                  </label>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1 text-center block">Studio Banner</Label>
                  <label className="flex flex-col items-center justify-center h-40 w-full border-2 border-dashed border-border rounded-[2rem] bg-muted/20 cursor-pointer hover:bg-muted/40 hover:border-primary/30 transition-all group">
                    <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-muted-foreground shadow-sm group-hover:scale-110 transition-transform">
                      <UploadCloud size={20} />
                    </div>
                    <span className="mt-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Studio Cover</span>
                    <input {...register("cover")} type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]">
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full h-16 text-sm font-bold uppercase tracking-[0.2em] rounded-[1.5rem] shadow-xl shadow-primary/20"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                    Initializing Account...
                  </div>
                ) : "Create My Studio"}
              </Button>
            </div>
          </form>

          <div className="mt-10 text-center border-t border-border pt-8">
            <p className="text-sm font-bold text-muted-foreground">
              Member already?{" "}
              <button 
                onClick={() => navigate("/login")}
                className="text-primary hover:underline underline-offset-4 decoration-2 focus:outline-none transition-all"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;