import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../store/slices/authslice";

// Zod schema
const SignInSchema = z.object({
  email: z.string().nonempty({ message: "* email is required *" }),
  password: z.string().nonempty({ message: "* password is required *" }),
});

export const SignIn = () => {
  const navigate = useNavigate();
  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
    mode: "onSubmit",
  });

  const onSignIn = async (data) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Signin success:", response.data);
      if (response.data) {
        dispatch(setUser(response.data.user));
        navigate("/");
        alert("signup success");
      }
      navigate("/");
    } catch (error) {
      console.error("Signin error:", error.response?.data || error.message);
    }
    finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <div className="flex justify-center h-screen w-screen items-center bg-gradient-to-t from-cyan-300 via-blue-300 to-slate-300 relative">
      <div className="absolute w-[55%] h-[80%] top-8 left-[25%] bg-white/50 backdrop-blur-4xl border border-none rounded-tr-[80px]"></div>
      <div className="flex w-[55%] h-[80%]">
        <div className="relative w-1/2 h-full">
          <div className="absolute inset-0 bg-[url('./assets/bg3.jpg')] bg-center bg-cover w-full border border-hidden rounded-bl-[80px]">
            <div className="flex flex-col h-1/3 w-full justify-center items-center text-4xl text-cyan-900 italic font-light">
              TravelSphere
              <span className="text-lg italic">explore beyond boundaries</span>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col gap-10 bg-teal-50 z-2 items-center border border-hidden rounded-tr-[80px]">
          <div className="h-1/3 flex flex-col justify-center gap-2 items-center text-cyan-600">
            <p className="text-6xl">Welcome</p>
            <p className="text-lg italic">Your next journey awaits!</p>
          </div>

          <form
            onSubmit={handleSubmit(onSignIn)}
            className="h-1/3 gap-2 flex flex-col w-[65%] items-center justify-center px-5 pb-2"
          >
            <div className="relative w-full flex-1">
              <label className="absolute left-4 -top-3.5 bg-teal-50 text-cyan-600 text-sm px-1 rounded-xl">
                Email
              </label>
              <input
                type="email"
                autoComplete="off"
                {...register("email")}
                className="w-full h-1/2 text-cyan-900 caret-cyan-900 text-lg border-solid border-cyan-400 border-2 rounded-lg p-4 bg-teal-50 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100 focus:outline-none"
              />
              {errors.email?.message && (
                <p className="absolute text-red-500 text-xs left-3 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative w-full flex-1">
              <label className="absolute left-4 -top-3.5 bg-teal-50 text-cyan-600 text-sm px-1 rounded-xl">
                Password
              </label>
              <input
                type="password"
                autoComplete="off"
                {...register("password")}
                className="w-full h-1/2 caret-cyan-700 text-cyan-900 text-lg border-solid border-cyan-400 border-2 rounded-lg p-4 bg-teal-50 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100 focus:outline-none"
              />
              {errors.password?.message && (
                <p className="absolute text-red-500 text-xs left-3 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <input
              type="submit"
              className="bg-cyan-800 mb-2 text-white px-6 py-2 rounded hover:bg-cyan-600 transition-colors cursor-pointer"
            />
            <Link to="/signup">
              <p className="text-base text-cyan-900">
                Don't have an account? Sign up
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
