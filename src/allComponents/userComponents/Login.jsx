import { useForm } from "react-hook-form"
import { Button } from "@/allComponents/ui/button"
import { Input } from "@/allComponents/ui/input"
import { Label } from "@/allComponents/ui/label"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import api from "@/lib/api"
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";


function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext);
console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()
  const [showLogin, setShowLogin] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
 console.log(credentialResponse);
 try{
  const res = await api.post("/users/google", {
    credential: credentialResponse.credential,
  });

  console.log(res.data.data.user.fullName);
   toast.success(`Welcome back, ${res.data.data.user.fullName}`);
    setUser(res.data.data);
    localStorage.setItem("user", JSON.stringify(res.data.data));
      setTimeout(() => navigate("/Dashboard"), 1500);
    } 
    catch (err) {
      toast.error(err?.res?.data?.message || "Login failed")
    }



};
 const handleGoogleError = () => {
  console.log("Google login failed");
}

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
  <div className="min-h-screen  flex items-center justify-center p-6 overflow-hidden">

    <motion.div
      animate={{
        width: showLogin ? "1000px" : "700px",
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      className="
        h-[550px]
        bg-white
        rounded-[40px]
        shadow-xl
        overflow-hidden
        flex
      "
    >

      {/* LEFT WELCOME PANEL */}

      <motion.div
        animate={{
          width: showLogin ? "45%" : "100%",
        }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
        className="
          relative
          bg-gradient-to-br
          from-blue-700
          via-blue-600
          to-indigo-700
          text-white
          flex
          flex-col
          justify-center
          px-12
          overflow-hidden
          background:url('')        "
      >

        {/* Background blobs */}

        <div className="
          absolute
          -top-20
          -left-20
          w-80
          h-80
          bg-white/10
          rounded-full
        "/>

        <div className="
          absolute
          bottom-[-100px]
          right-[-80px]
          w-96
          h-96
          bg-white/10
          rounded-full
        "/>


        <motion.div
          animate={{
            scale: showLogin ? 0.85 : 1
          }}
          transition={{
            duration:0.5
          }}
          className="relative z-10"
        >

          <h1 className="
            text-5xl
            font-black
            leading-tight
          ">
            Welcome
            <br/>
            Back
          </h1>


          <p className="
            mt-5
            text-white/80
            text-lg
            max-w-sm
          ">
            To keep connected with us,
            please login with your personal
            information.
          </p>


          {!showLogin && (

            <motion.button
              initial={{
                opacity:0,
                y:20
              }}

              animate={{
                opacity:1,
                y:0
              }}

              onClick={()=>setShowLogin(true)}

              className="
                mt-10
                border
                border-white
                px-12
                py-3
                rounded-full
                font-bold
                hover:bg-white
                hover:text-blue-700
                transition
              "
            >
              SIGN IN
            </motion.button>

          )}


        </motion.div>


      </motion.div>





      {/* LOGIN FORM */}

      <AnimatePresence>


      {
        showLogin && (

          <motion.div

            initial={{
              opacity:0,
              x:150
            }}

            animate={{
              opacity:1,
              x:0
            }}

            exit={{
              opacity:0,
              x:150
            }}

            transition={{
              duration:0.6
            }}

            className="
              w-[55%]
              p-12
              flex
              flex-col
              justify-center
            "

          >


            <h2 className="
              text-3xl
              font-black
              text-gray-900
            ">
              Sign In
            </h2>


            <p className="
              text-gray-500
              mt-2
            ">
              Enter your details to continue
            </p>



            <form
              onSubmit={handleSubmit(onSubmit)}
              className="
                mt-8
                space-y-5
              "
            >


              <div>

                <Input
                  {...register("email",{
                    required:"Email is required"
                  })}

                  placeholder="Email Address"

                  className="
                    h-14
                    rounded-2xl
                    bg-gray-100
                    border-none
                    px-5
                  "
                />

              </div>




              <div>

                <Input

                  type="password"

                  {...register("password",{
                    required:"Password is required"
                  })}

                  placeholder="Password"

                  className="
                    h-14
                    rounded-2xl
                    bg-gray-100
                    border-none
                    px-5
                  "
                />

              </div>





              <Button

                disabled={isSubmitting}

                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-bold
                "

              >

              {
                isSubmitting
                ?
                "Signing In..."
                :
                "LOGIN"
              }


              </Button>


            </form>




            <div className="
              flex
              items-center
              gap-3
              my-6
            ">

              <div className="
                h-px
                bg-gray-200
                flex-1
              "/>

              <span className="
                text-gray-400
                text-sm
              ">
                OR
              </span>


              <div className="
                h-px
                bg-gray-200
                flex-1
              "/>


            </div>





            <div className="flex justify-center">

              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />

            </div>





            <p className="
              mt-6
              text-center
              text-gray-500
            ">

              New user?

              <button
                onClick={()=>navigate("/signup")}
                className="
                  ml-2
                  text-blue-600
                  font-bold
                "
              >
                Create Account
              </button>


            </p>



          </motion.div>

        )
      }


      </AnimatePresence>


    </motion.div>


  </div>
)


}

  // return (
  //   <div className="min-h-screen bg-background flex items-center justify-center p-6 overflow-hidden relative">
  //     <div className="absolute inset-0 z-0">
  //       <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-[120px]" />
  //       <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-[120px]" />
  //     </div>

  //     <div className="relative z-10 w-full max-w-md transition-all duration-700 ease-out opacity-100 translate-y-0">
  //       <div className="mb-10 text-center">
  //         <div className="inline-flex flex-col items-center gap-2 transition-transform duration-500 hover:scale-105">
  //           <div className="h-16 w-16 rounded-[2rem] bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/40 mb-2">
  //             <span className="text-3xl font-black">N</span>
  //           </div>
  //           <span className="text-4xl font-[1000] tracking-tighter text-black">
  //             NAVYA<span className="text-primary">.</span>
  //           </span>
  //           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black">Creative Studio</p>
  //         </div>
  //       </div>

  //       <div className="bg-card p-10 md:p-12 border border-border shadow-2xl relative overflow-hidden rounded-3xl">
  //         <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary/10" />

  //         <div className="mb-10">
  //           <h2 className="text-3xl font-black text-black tracking-tighter">Welcome back</h2>
  //           <p className="text-sm font-bold text-black mt-2">Enter your credentials to continue</p>
  //         </div>

  //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
  //           <div className="space-y-3">
  //             <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Email Address</Label>
  //             <Input
  //               {...register("email", { required: "Email is required" })}
  //               className="bg-muted border-border focus:border-primary focus:ring-1 focus:ring-primary h-14 px-6 text-base rounded-2xl transition-all"
  //               placeholder="alex@studio.com"
  //             />
  //             {errors.email && (
  //               <p className="text-[10px] font-bold text-destructive uppercase ml-1 animate-pulse">
  //                 {errors.email.message}
  //               </p>
  //             )}
  //           </div>

  //           <div className="space-y-3">
  //             <div className="flex items-center justify-between px-1">
  //               <Label className="text-[10px] text-black uppercase tracking-[0.2em] text-primary">Password</Label>
  //               <button 
  //                 type="button" 
  //                 className="text-[10px] font-black uppercase tracking-[0.1em] text-black hover:text-primary transition-colors focus:outline-none"
  //               >
  //                 Forgot Key?
  //               </button>
  //             </div>
  //             <Input
  //               type="password"
  //               {...register("password", { required: "Password is required" })}
  //               className="bg-muted border-border focus:border-primary focus:ring-1 focus:ring-primary h-14 px-6 text-black rounded-2xl transition-all"
  //               placeholder="••••••••"
  //             />
  //             {errors.password && (
  //               <p className="text-[10px] font-bold text-destructive uppercase ml-1 animate-pulse">
  //                 {errors.password.message}
  //               </p>
  //             )}
  //           </div>

  //           <div className="transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]">
  //             <Button 
  //               type="submit" 
  //               disabled={isSubmitting} 
  //               className="bg-primary text-primary-foreground hover:bg-primary/90 w-full h-14 text-sm font-bold uppercase tracking-[0.2em] py-4 rounded-2xl shadow-lg shadow-primary/20"
  //             >
  //               {isSubmitting ? (
  //                 <div className="flex items-center gap-3">
  //                   <div className="h-4 w-4 border-2 border-white/30 border-t-white animate-spin rounded-full" />
  //                   Verifying...
  //                 </div>
  //               ) : "Sign In to Studio"}
  //             </Button>
  //           </div>
  //         </form>
  //         <div className="mt-6 text-center">  
  //         <span className="text-sm font-bold text-muted-foreground">or continue with</span>
  //         </div>
  //           <GoogleLogin className="mt-4 w-full flex justify-center items-center bg-white text-black border border-border hover:bg-primary/5 focus:bg-primary/10 h-14 rounded-2xl transition-all"
  //       onSuccess={handleGoogleSuccess}
  //       onError={handleGoogleError}
  //     />

  //         <div className="mt-10 text-center">
  //           <p className="text-sm font-bold text-muted-foreground">
  //             New to the platform?{" "}
  //             <button 
  //               onClick={() => navigate("/signup")}
  //               className="text-primary hover:underline underline-offset-4 decoration-2 focus:outline-none transition-all"
  //             >
  //               Create Account
  //             </button>
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );


export default Login;