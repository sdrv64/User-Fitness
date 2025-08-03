import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

interface Form {
  reps: string;
  calories: string;
  weight: string;
}
interface Props {
  token: string;
}
const Add = ({ token }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Form>();
  const navigate = useNavigate();

  async function onSubmit(data: Form) {
    try {
      console.log(data);
      const respose = await axios.post(
        "http://localhost:3000/v1/api",
        {
          reps: Number(data.reps),
          calories: Number(data.calories),
          weight: Number(data.weight),
        },
        {
          headers: { token },
        }
      );
      toast.success(respose.data.message);
      reset();
      navigate("/");
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
  }
  return (
    <div className="flex items-center h-60 mt-20">
      <form
        className="min-w-3/5 lg:min-w-1/2 bg-gray-700 p-4 py-10 rounded-2xl m-auto gap-5 flex flex-col "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl sm:text-2xl font-semibold text-white mb-2">
          Add Progress
        </h1>
        <div className="md:w-2/3 lg:w-full md:m-auto ">
          <input
            autoComplete="name"
            {...register("reps", {
              required: "You must provide Reps",
            })}
            type="number"
            className="w-full outline-amber-600 p-2 bg-white rounded-md   placeholder:text-gray-800 font-medium placeholder:font-semibold text-gray-700"
            placeholder="Reps"
          />
          <p className="text-sm  ml-3 text-red-600 font-semibold">
            {errors.reps?.message}
          </p>
        </div>
        <div className="md:w-2/3 lg:w-full md:m-auto ">
          <input
            autoComplete="name"
            {...register("calories", {
              required: "You must provide Calories",
            })}
            type="number"
            className="w-full outline-amber-600 p-2 bg-white rounded-md   placeholder:text-gray-800 font-medium placeholder:font-semibold text-gray-700"
            placeholder="Calories"
          />
          <p className="text-sm  ml-3 text-red-600 font-semibold">
            {errors.calories?.message}
          </p>
        </div>
        <div className="md:w-2/3 lg:w-full md:m-auto ">
          <input
            autoComplete="name"
            {...register("weight", {
              required: "You must provide Weight",
            })}
            type="number"
            className="w-full outline-amber-600 p-2 bg-white rounded-md   placeholder:text-gray-800 font-medium placeholder:font-semibold text-gray-700"
            placeholder="Weight"
          />
          <p className="text-sm  ml-3 text-red-600 font-semibold">
            {errors.weight?.message}
          </p>
        </div>
        {isSubmitting ? (
          <button
            className="bg-gray-900 text-white px-8 font-semibold py-2 w-fit m-auto   rounded-2xl mt-2 cursor-pointer flex"
            disabled
          >
            <Loader2Icon />
            Submitting
          </button>
        ) : (
          <button
            type="submit"
            className="bg-gray-900 text-white px-8 font-semibold py-2 w-fit m-auto  rounded-2xl mt-2 cursor-pointer"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default Add;
