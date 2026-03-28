import React, { useContext } from "react";
import { DataContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { Button } from "@/allComponents/ui/button";
import { Input } from "@/allComponents/ui/input";
import { Label } from "@/allComponents/ui/label";

function Signup() {
  const navigate = useNavigate();
  const { setUser, setSignup } = useContext(DataContext);
  const [loading, setLoading] = React.useState(false);

  const handdleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    try {
      setLoading(true);
      const response = await api.post("/users/register", formData);
      console.log("Signup successful:", response.data);
      setUser(response.data.data);
      console.log("User data set in context:", response.data.data);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success(`Welcome, ${response.data.data.fullName}!`);
      setTimeout(() => {
        navigate("/Dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 min-h-screen w-screen bg-[#0f0f0f] overflow-y-auto flex items-center justify-center p-4">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-[#b3b3b3] hover:text-white text-xl z-10"
      >
        ← Back
      </button>

      <div className="w-full max-w-md animate-fade-up">
        <div className="surface-card p-6 md:p-8 space-y-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-[#b3b3b3]">Join us</p>
            <h1 className="mt-2 text-3xl font-black text-white">Create Account</h1>
            <p className="mt-2 text-sm text-[#b3b3b3]">Start your creative journey</p>
          </div>

          <form onSubmit={handdleSignup} className="space-y-4">
            <div>
              <Label className="text-white">Username</Label>
              <Input name="username" required type="text" placeholder="Choose a username" className="mt-1" />
            </div>

            <div>
              <Label className="text-white">Full Name</Label>
              <Input name="fullName" required type="text" placeholder="Your name" className="mt-1" />
            </div>

            <div>
              <Label className="text-white">Email</Label>
              <Input name="email" required type="email" placeholder="your@email.com" className="mt-1" />
            </div>

            <div>
              <Label className="text-white">Password</Label>
              <Input name="password" required type="password" placeholder="••••••••" className="mt-1" />
            </div>

            <div>
              <Label className="text-white">Profile Picture</Label>
              <div className="mt-1 border-2 border-dashed border-white/20 rounded-lg p-4 cursor-pointer hover:border-white/40 transition">
                <input name="avatar" required type="file" className="w-full text-sm text-white file:mr-2 file:rounded-lg file:border-0 file:bg-[#E50914] file:text-white file:font-semibold" />
              </div>
            </div>

            <div>
              <Label className="text-white">Cover Image</Label>
              <div className="mt-1 border-2 border-dashed border-white/20 rounded-lg p-4 cursor-pointer hover:border-white/40 transition">
                <input name="cover" required type="file" className="w-full text-sm text-white file:mr-2 file:rounded-lg file:border-0 file:bg-[#E50914] file:text-white file:font-semibold" />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating..." : "Sign Up"}
            </Button>
          </form>

          <div className="text-center text-sm text-[#b3b3b3]">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-[#E50914] font-semibold hover:underline">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;