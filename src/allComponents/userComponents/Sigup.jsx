import React, { useContext, useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { Button } from "@/allComponents/ui/button";
import { Input } from "@/allComponents/ui/input";
import { Label } from "@/allComponents/ui/label";
import { UploadCloud, User, Mail, Lock, Camera } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters long"),
  fullName: z.string().min(3, "Full name must be more than 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  avatar: z.any().optional(),
  cover: z.any().optional(),
})

function Signup() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarFileName, setAvatarFileName] = useState("");
  const [coverFileName, setCoverFileName] = useState("");

  const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver:zodResolver(schema)});

  const errorTextClass = "mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600";

  const onSignup = async (data) => {
    const avatarFile = data.avatar?.[0];
    const coverFile = data.cover?.[0];

    if (avatarFile && avatarFile.size > MAX_IMAGE_SIZE) {
      toast.error("Avatar image must be less than 4 MB");
      return;
    }

    if (coverFile && coverFile.size > MAX_IMAGE_SIZE) {
      toast.error("Studio cover must be less than 4 MB");
      return;
    }

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    
    if (avatarFile) formData.append("avatar", avatarFile);
    if (coverFile) formData.append("cover", coverFile);
{console.log("Form Data:", avatarFile, coverFile, data.username, data.fullName, data.email, data.password);}
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
                    {...register("username")}
                    className="h-14 bg-muted border-border text-black focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl transition-all"
                    placeholder="skywalker_01"
                  />
                  {errors.username?.message && (
                    <p className={errorTextClass}>{errors.username.message}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Full Name</Label>
                  <Input
                    {...register("fullName")}
                    className="h-14 bg-muted border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl transition-all text-black"
                    placeholder="Anakin Skywalker"
                  />
                  {errors.fullName?.message && (
                    <p className={errorTextClass}>{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Email</Label>
                  <Input
                    {...register("email")}
                    type="email"
                    className="h-14 bg-muted border-border text-black focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl transition-all"
                    placeholder="anakin@jedi.com"
                  />
                  {errors.email?.message && <p className={errorTextClass}>{errors.email.message}</p>}
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className="h-14 bg-muted border-border text-black  focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl transition-all"
                    placeholder="••••••••"
                  />
                  {errors.password?.message && (
                    <p className={errorTextClass}>{errors.password.message}</p>
                  )}
                </div>
                 <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Confirm Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className="h-14 bg-muted border-border text-black  focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl transition-all"
                    placeholder="••••••••"
                  />
                  {errors.password?.message && (
                    <p className={errorTextClass}>{errors.password.message}</p>
                  )}
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
                    <input
                      {...register("avatar", {
                        onChange: (e) => {
                          const file = e.target.files?.[0];
                          if (!file) {
                            setAvatarFileName("");
                            return;
                          }

                          if (file.size > MAX_IMAGE_SIZE) {
                            toast.error("Avatar image must be less than 4 MB");
                            e.target.value = "";
                            setAvatarFileName("");
                            return;
                          }

                          setAvatarFileName(file.name);
                        },
                      })}
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />

                  </label>
                  {avatarFileName && (
                    <div className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium text-foreground shadow-sm">
                      {avatarFileName}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1 text-center block">Studio Banner</Label>
                  <label className="flex flex-col items-center justify-center h-40 w-full border-2 border-dashed border-border rounded-[2rem] bg-muted/20 cursor-pointer hover:bg-muted/40 hover:border-primary/30 transition-all group">
                    <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-muted-foreground shadow-sm group-hover:scale-110 transition-transform">
                      <UploadCloud size={20} />
                    </div>
                    <span className="mt-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Studio Cover</span>
                    <input
                      {...register("cover", {
                        onChange: (e) => {
                          const file = e.target.files?.[0];
                          if (!file) {
                            setCoverFileName("");
                            return;
                          }

                          if (file.size > MAX_IMAGE_SIZE) {
                            toast.error("Studio cover must be less than 4 MB");
                            e.target.value = "";
                            setCoverFileName("");
                            return;
                          }

                          setCoverFileName(file.name);
                        },
                      })}
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                  {coverFileName && (
                    <div className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium text-foreground shadow-sm">
                      {coverFileName}
                    </div>
                  )}
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

          <div className="bg-primary mt-10 flex pt-4 justify-center text-primary-foreground hover:bg-primary/90 w-full h-16 text-sm font-bold uppercase tracking-[0.2em] rounded-[1.5rem] shadow-xl shadow-primary/20"> Countinue with google </div>

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