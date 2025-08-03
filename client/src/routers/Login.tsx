import { useEffect, useState } from "react";
import image from "../assets/loginimage.png";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

interface Form {
  name: string;
  email: string;
  password: string;
}
interface Props {
  setToken: (token: string) => void;
  token: string;
}
const Login = ({ setToken, token }: Props) => {
  const [title, setTitle] = useState<string>("Login");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Form>();
  const navigate = useNavigate();
  async function onSubmit(data: Form) {
    try {
      if (title === "Register") {
        const response = await axios.post(
          "http://localhost:3000/v1/api/register",
          data
        );
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
      } else {
        const response = await axios.post(
          "http://localhost:3000/v1/api/login",
          data
        );
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
      }
      navigate("/");
      reset();
      //@ts-expect-error aaa
    } catch (error: Error) {
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.response.data) {
        console.log(error);
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
    // reset();
  }
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });
  return (
    <div>
      <div className="flex max-lg:h-screen h-[40rem] m-auto  justify-center lg:mt-8 max-sm:flex-col ">
        <div>
          <form
            className="flex flex-col p-6 justify-center items-center  h-full bg-[#e4c440] rounded-2xl gap-2 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="self-baseline mb-8 max-sm:mb-4 text-4xl font-bold text-gray-800">
              {title}
            </h1>
            {title === "Register" && (
              <div className="md:w-1/3 min-w-60">
                <input
                  autoComplete="name"
                  {...register("name", {
                    required: "You must provide your name",
                  })}
                  type="text"
                  className="w-full outline-amber-600 p-1 bg-white rounded-md placeholder:text-gray-800 font-medium placeholder:font-semibold text-gray-700"
                  placeholder="Name"
                />
                <p className="text-sm -translate-1 ml-3 text-red-600 font-semibold">
                  {errors.name?.message}
                </p>
              </div>
            )}
            <div className="md:w-1/3 min-w-60">
              <input
                autoComplete="name"
                {...register("email", {
                  required: "You must provide an email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="w-full p-1 bg-white rounded-md placeholder:text-gray-800 font-medium placeholder:font-semibold outline-amber-600 text-gray-700"
                placeholder="your@mail.com"
              />
              <p className="text-sm -translate-1 ml-3 text-red-600 font-semibold">
                {errors.email?.message}
              </p>
            </div>
            <div className="md:w-1/3 min-w-60">
              <input
                autoComplete="name"
                type="password"
                {...register("password", {
                  required: "You must provide password",
                  minLength: {
                    value: 8,
                    message: "Your Password must exceed 8 charachters",
                  },
                })}
                className="w-full p-1 outline-amber-600 bg-white rounded-md placeholder:text-gray-800
                font-medium placeholder:font-semibold text-gray-700"
                placeholder="Password"
              />
              <p className="text-sm -translate-1 ml-3 text-red-600 font-semibold">
                {errors.password?.message}
              </p>
            </div>
            {title === "Register" ? (
              <p className="text-gray-400 text-sm">
                Already have an Account?{" "}
                <span
                  className="text-gray-800 font-semibold cursor-pointer hover:text-gray-600 active:text-gray-500"
                  onClick={() => setTitle("Login")}
                >
                  Login
                </span>
              </p>
            ) : (
              <p className="text-gray-400 text-sm">
                Doesn't have an Account?{" "}
                <span
                  className="text-gray-800 font-semibold cursor-pointer hover:text-gray-600 active:text-gray-500"
                  onClick={() => setTitle("Register")}
                >
                  Register
                </span>
              </p>
            )}
            {isSubmitting ? (
              <button
                className="bg-gray-900 text-white px-6 py-2 sm:self-baseline  rounded-2xl mt-2 cursor-pointer flex"
                disabled
              >
                <Loader2Icon />
                Submitting
              </button>
            ) : (
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-2 sm:self-baseline  rounded-2xl mt-2 cursor-pointer"
              >
                Submit
              </button>
            )}
          </form>
        </div>

        <div className="bg-gray-100 p-3 rounded-2xl">
          <img src={image} className="h-full " alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
