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
import { useWindowSize } from "@uidotdev/usehooks";


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

  // desktop breakpoint matches Tailwind's `md` (768px). Below this the
  // panels stack vertically instead of animating side-by-side widths.
  const { width: winWidth } = useWindowSize();
  const isDesktop = winWidth ? winWidth >= 768 : true;

  const outerWidth = isDesktop ? (showLogin ? "100%" : "70%") : "100%";
  const leftWidth = isDesktop ? (showLogin ? "45%" : "100%") : "100%";

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
  <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden">

    <motion.div
      animate={{
        width: outerWidth,
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      className="
        w-full
        max-w-[1000px]
        min-h-[500px]
        md:h-[550px]
        bg-white
        rounded-[28px]
        sm:rounded-[40px]
        shadow-xl
        overflow-hidden
        flex
        flex-col
        md:flex-row
      "
    >

      {/* LEFT WELCOME PANEL */}

      <motion.div
        animate={{
          width: leftWidth,
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
          px-6
          py-10
          sm:px-8
          md:px-12
          md:py-0
          overflow-hidden
        "
      >

        {/* Background blobs */}

        <div className="
          absolute
          -top-20
          -left-20
          w-60
          h-60
          sm:w-80
          sm:h-80
          bg-white/10
          rounded-full
        "/>

        <div className="
          absolute
          bottom-[-100px]
          right-[-80px]
          w-72
          h-72
          sm:w-96
          sm:h-96
          bg-white/10
          rounded-full
        "/>


        <motion.div
          animate={{
            scale: showLogin && isDesktop ? 0.85 : 1
          }}
          transition={{
            duration:0.5
          }}
          className="relative z-10"
        >

          <h1 className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-black
            leading-tight
          ">
            Welcome
            <br/>
            Back
          </h1>


          <p className="
            mt-4
            sm:mt-5
            text-white/80
            text-sm
            sm:text-base
            md:text-lg
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
                mt-8
                sm:mt-10
                border
                border-white
                px-8
                sm:px-12
                py-2.5
                sm:py-3
                rounded-full
                font-bold
                text-sm
                sm:text-base
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
              y: isDesktop ? 0 : 30,
              x: isDesktop ? 150 : 0,
            }}

            animate={{
              opacity:1,
              y:0,
              x:0,
            }}

            exit={{
              opacity:0,
              y: isDesktop ? 0 : 30,
              x: isDesktop ? 150 : 0,
            }}

            transition={{
              duration:0.6
            }}

            className="
              w-full
              md:w-[55%]
              p-6
              sm:p-8
              md:p-12
              flex
              flex-col
              justify-center
            "

          >


            <h2 className="
              text-2xl
              sm:text-3xl
              font-black
              text-gray-900
            ">
              Sign In
            </h2>


            <p className="
              text-sm
              sm:text-base
              text-gray-500
              mt-2
            ">
              Enter your details to continue
            </p>



            <form
              onSubmit={handleSubmit(onSubmit)}
              className="
                mt-6
                sm:mt-8
                space-y-4
                sm:space-y-5
              "
            >


              <div>

                <Input
                  {...register("email",{
                    required:"Email is required"
                  })}

                  placeholder="Email Address"

                  className="
                    h-12
                    sm:h-14
                    rounded-2xl
                    bg-gray-100
                    border-none
                    px-5
                  "
                />

                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 ml-1">
                    {errors.email.message}
                  </p>
                )}

              </div>




              <div>

                <Input
                  type="password"
                  {...register("password",{
                    required:"Password is required"
                  })}
                  placeholder="Password"
                  className="
                    h-12
                    sm:h-14
                    rounded-2xl
                    bg-gray-100
                    border-none
                    px-5
                  "
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1 ml-1">
                    {errors.password.message}
                  </p>
                )}

              </div>
              <Button
                disabled={isSubmitting}
                className="
                  w-full
                  h-12
                  sm:h-14
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
              my-5
              sm:my-6
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
            <div className="flex justify-center w-full">

              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />

            </div>





            <p className="
              mt-5
              sm:mt-6
              text-center
              text-sm
              sm:text-base
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

export default Login;