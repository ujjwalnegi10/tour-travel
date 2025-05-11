import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
  const navigate = useNavigate();

  //SignUp Schema
  const SingUpSchema = z.object({
    firstName: z
      .string()
      .min(1, { message: "* Please enter your firstname *" })
      .regex(/^[A-Za-z\s]+$/, { message: "* Only contains letters *" }),
    email: z
      .string()
      .min(1, { message: "* Cannot be empty *" })
      .email({ message: "* Invalid email address *" }),
    password: z
      .string()
      .min(8, { message: "* Password must be at least 8 characters long *" }),
  });

  //Useform Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SingUpSchema),
  });

  const onSignUp = async (data) => {
    try {
      const payload = {
        name: data.firstName, // Combine names
        email: data.email,
        password: data.password,
      };

      const response = await axios.post(
        "http://localhost:5001/api/auth/register", // Update as per your backend route
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Signup success:", response.data);
      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      // Optionally show feedback
    }
  };

  return (
    <>
      <div className="flex justify-center h-screen w-screen items-center bg-gradient-to-t from-emerald-950 to-pink-100 relative">
        <div className="absolute w-[55%] h-[80%] top-26 left-[20%] bg-white/30 backdrop-blur-4xl border  border-none rounded-tl-[80px] rounded-br-[80px]"></div>
        <div className="flex w-[55%] h-[80%]">
          <div className=" w-1/2 h-full relative ">
            <div className="absolute inset-0 bg-[url('./assets/bg.jpg')] bg-cover bg-down w-full border border-hidden rounded-tl-[80px]">
              <div className="flex flex-col h-1/3 w-full justify-center items-center text-4xl text-emerald-950 italic font-light">
                TravelSphere
                <span className="text-lg">
                  connects you to the wonders of the world
                </span>
              </div>
            </div>
          </div>

          <div className="w-1/2 h-full z-2 flex flex-col  items-center bg-neutral-200 border border-transparent rounded-br-[80px] gap-5">
            <div className="h-1/3  flex flex-col justify-center items-center text-emerald-800 gap-2 ">
              <p className="text-6xl">Welcome</p>
              <p className="text-lg italic">
                " Let's explore the world together "
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSignUp)}
              className="flex-1 flex flex-col  w-[65%] items-center justify-center h-full px-3 pb-2 gap-2"
            >
              <div className="relative w-full flex-1">
                <label className="absolute left-4 -top-3.5 bg-neutral-200 text-emerald-800 text-sm px-1 rounded-xl">
                  Firstname
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  className="w-full h-1/2   caret-emerald-800  text-lg border-solid border-emerald-400 border-2 rounded-lg p-4  focus:border-emerald-800 focus:ring-2 focus:ring-emerald-100 focus:outline-none"
                  {...register("firstName")}
                />
                {errors.firstName?.message && (
                  <p className="absolute  h-1/2 text-red-500 text-xs left-3">
                    {errors.firstName?.message}
                  </p>
                )}
              </div>

              {/* <div className="relative w-full flex-1 ">
                            <label className="absolute left-4 -top-3.5 bg-neutral-200 text-emerald-800 text-sm px-1 rounded-xl">
                                LastName
                            </label>
                            <input autoComplete="off" type="text" className="w-full h-1/2  caret-emerald-800   text-lg border-solid border-emerald-400 border-2 rounded-lg p-4  bg-neutral-200 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-100 focus:outline-none" {...register("lastName")} />
                            {errors.lastName?.message && <p className="absolute text-red-500 text-xs left-3">{errors.lastName?.message}</p>}
                        </div> */}

              {/* <div className="relative w-full flex-1 ">
                            <label className="absolute left-4 -top-3.5 bg-neutral-200 text-emerald-800 text-sm px-1 rounded-xl">
                                Username
                            </label>
                            <input autoComplete="off" type="text" className="w-full h-1/2  caret-emerald-800   text-lg border-solid border-emerald-400 border-2 rounded-lg p-4  bg-neutral-200 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-100 focus:outline-none" {...register("userName")} />
                            {errors.userName?.message && <p className="absolute  text-red-500 text-xs left-3">{errors.userName?.message}</p>}
                        </div> */}

              <div className="relative w-full flex-1">
                <label className="absolute left-4 -top-3.5 bg-neutral-200 text-emerald-800 text-sm px-1 rounded-xl">
                  E-mail
                </label>
                <input
                  autoComplete="off"
                  type="email"
                  className="w-full h-1/2  caret-emerald-800   text-lg  border-solid border-emerald-400 border-2 rounded-lg p-4  bg-neutral-200 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-100 focus:outline-none"
                  {...register("email")}
                />
                {errors.email?.message && (
                  <p className="absolute  text-red-500 text-xs left-3">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="relative w-full flex-1">
                <label className="absolute left-4 -top-3.5 bg-neutral-200 text-emerald-800 text-sm px-1 rounded-xl">
                  Password
                </label>
                <input
                  autoComplete="off"
                  type="password"
                  className="w-full h-1/2 caret-emerald-800  text-lg border-solid border-emerald-400 border-2 rounded-lg p-4  bg-neutral-200 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-100 focus:outline-none"
                  {...register("password")}
                />
                {errors.password?.message && (
                  <p className="absolute  text-red-500 text-xs left-3">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <input
                autoComplete="off"
                type="submit"
                className=" bg-emerald-800  text-white px-6 py-2 rounded hover:bg-emerald-600 transition-colors cursor-pointer"
              />

              <Link to={"/signin"}>
                <p className="text-xs text-emerald-800 cursor-pointer">
                  If already signin
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
