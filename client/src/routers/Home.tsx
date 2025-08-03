import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { toast } from "react-toastify";
interface Props {
  token: string;
}
interface Progress {
  date: string;
  calories: number;
  _id: string;
  userId: string;
  weight: number;
  reps: number;
}
const Home = ({ token }: Props) => {
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState<Progress[]>([]);
  const [progressLength, setProgressLength] = useState<number>(
    progressData.length
  );
  const [maxReps, setMaxReps] = useState<number>(0);
  const [maxCalories, setMaxCalories] = useState<number>(0);
  const [maxWeight, setMaxWeight] = useState<number>(0);
  const [date, setDate] = useState<Progress>();
  const [date2, setDate2] = useState<Progress>();
  const [date3, setDate3] = useState<Progress>();
  const [minReps, setMinReps] = useState<number>(0);
  const [minCalories, setMinCalories] = useState<number>(0);
  const [minWeight, setMinWeight] = useState<number>(0);
  const [date4, setDate4] = useState<Progress>();
  const [date5, setDate5] = useState<Progress>();
  const [date6, setDate6] = useState<Progress>();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  async function getData() {
    try {
      const respose = await axios.get("http://localhost:3000/v1/api", {
        headers: { token },
      });

      setProgressData(respose.data.progress);
      setProgressLength(respose.data.progress.length);
      setMaxReps(
        Math.max(...respose.data.progress.map((item: Progress) => item.reps))
      );
      setMaxCalories(
        Math.max(
          ...respose.data.progress.map((item: Progress) => item.calories)
        )
      );

      setMaxWeight(
        Math.max(...respose.data.progress.map((item: Progress) => item.weight))
      );
      setMinReps(
        Math.min(...respose.data.progress.map((item: Progress) => item.reps))
      );

      setMinCalories(
        Math.min(
          ...respose.data.progress.map((item: Progress) => item.calories)
        )
      );

      setMinWeight(
        Math.min(...respose.data.progress.map((item: Progress) => item.weight))
      );
      setDate(
        respose.data.progress.filter(
          (items: Progress) => items.reps === maxReps
        )[0] || { reps: 0, date: Date.now() }
      );
      setDate2(
        respose.data.progress.filter(
          (items: Progress) => items.calories === maxCalories
        )[0] || { calories: 0, date: Date.now() }
      );
      setDate3(
        respose.data.progress.filter(
          (items: Progress) => items.weight === maxWeight
        )[0] || { weight: 0, date: Date.now() }
      );
      setDate4(
        respose.data.progress.filter(
          (items: Progress) => items.reps === minReps
        )[0] || { reps: 0, date: Date.now() }
      );
      setDate5(
        respose.data.progress.filter(
          (items: Progress) => items.calories === minCalories
        )[0] || { calories: 0, date: Date.now() }
      );
      setDate6(
        respose.data.progress.filter(
          (items: Progress) => items.weight === minWeight
        )[0] || { weight: 0, date: Date.now() }
      );
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
  useEffect(() => {
    getData();
  }, [progressLength]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Progress Chart",
      },
    },
  };

  const extractData = (key: keyof Progress) => ({
    labels: progressData.map((p) => new Date(p.date).toLocaleDateString()),
    datasets: [
      {
        label: key,
        data: progressData.map((p) => p[key] || 0),
        fill: true,

        backgroundColor:
          key === "reps"
            ? "lightblue"
            : key === "calories"
            ? "#f9e4ad"
            : "lightgreen",

        borderColor:
          key === "reps" ? "blue" : key === "calories" ? "orange" : "green",
      },
    ],
  });
  return (
    <div>
      <div className="bg-gray-700 lg:h-[39rem] rounded-2xl p-2">
        <h2 className="text-white text-3xl max-sm:text-lg font-semibold mb-4 p-2">
          User Progress Dashboard
        </h2>
        <div className="flex gap-2 lg:justify-around max-md:flex-col">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">
              Track Max
            </h1>
            <div className="flex-col flex gap-2 sm:flex-row">
              <div className="w-fit p-4 rounded-lg bg-blue-400 flex gap-2 flex-col justify-center items-center cursor-pointer max-sm:p-2">
                <h1 className="self-baseline text-2xl text-gray-600 font-semibold max-sm:text-xl">
                  Max Reps 🔥🔥
                </h1>
                <p className="text-white max-sm:text-xl font-semibold text-2xl bg-blue-800 px-3 rounded-full">
                  {date?.reps}
                </p>
                <p className="text-gray-900 font-semibold text-sm ">
                  Date:
                  {
                    //@ts-expect-error aaa
                    new Date(date?.date).toDateString()
                  }
                </p>
              </div>

              <div className="w-fit p-4 rounded-lg bg-[#f9e4ad] flex gap-2 flex-col justify-center items-center cursor-pointer max-sm:p-2">
                <h1 className="self-baseline text-2xl text-gray-600 font-semibold max-sm:text-xl">
                  Max Calories 🌮
                </h1>
                <p className="text-white max-sm:text-xl font-semibold text-2xl bg-amber-500 px-3 rounded-full">
                  {date2?.calories}
                </p>
                <p className="text-gray-900 font-semibold text-sm">
                  Date:
                  {
                    //@ts-expect-error aaa
                    new Date(date?.date).toDateString()
                  }
                </p>
              </div>
              <div className="w-fit p-4 rounded-lg bg-green-300 flex gap-2 flex-col justify-center items-center cursor-pointer max-sm:p-2">
                <h1 className="self-baseline text-2xl text-gray-600 font-semibold max-sm:text-xl">
                  Max Weight 🫃
                </h1>
                <p className="text-white max-sm:text-xl font-semibold text-2xl bg-green-700 px-3 rounded-full">
                  {date3?.weight}
                </p>
                <p className="text-gray-900 font-semibold text-sm">
                  Date:
                  {
                    //@ts-expect-error aaa
                    new Date(date3?.date).toDateString()
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="-translate-y-2">
            <h1 className="text-2xl font-semibold text-white my-2">
              Track Min
            </h1>
            <div className="flex-col flex gap-2 sm:flex-row">
              <div className="w-fit p-4 rounded-lg bg-blue-400 flex gap-2 flex-col justify-center items-center cursor-pointer max-sm:p-2">
                <h1 className="self-baseline text-2xl text-gray-600 font-semibold max-sm:text-xl">
                  Min Reps 🔥🔥
                </h1>
                <p className="text-white max-sm:text-xl font-semibold text-2xl bg-blue-800 px-3 rounded-full">
                  {date4?.reps}
                </p>
                <p className="text-gray-900 font-semibold text-sm ">
                  Date:
                  {
                    //@ts-expect-error aaa
                    new Date(date4?.date).toDateString()
                  }
                </p>
              </div>

              <div className="w-fit p-4 rounded-lg bg-[#f9e4ad] flex gap-2 flex-col justify-center items-center cursor-pointer max-sm:p-2">
                <h1 className="self-baseline text-2xl text-gray-600 font-semibold max-sm:text-xl">
                  Min Calories 🌮
                </h1>
                <p className="text-white max-sm:text-xl font-semibold text-2xl bg-amber-500 px-3 rounded-full">
                  {date5?.calories}
                </p>
                <p className="text-gray-900 font-semibold text-sm">
                  Date:
                  {
                    //@ts-expect-error aaa
                    new Date(date5?.date).toDateString()
                  }
                </p>
              </div>
              <div className="w-fit p-4 rounded-lg bg-green-300 flex gap-2 flex-col justify-center items-center cursor-pointer max-sm:p-2">
                <h1 className="self-baseline text-2xl text-gray-600 font-semibold max-sm:text-xl">
                  Min Weight 🫃
                </h1>
                <p className="text-white max-sm:text-xl font-semibold text-2xl bg-green-700 px-3 rounded-full">
                  {date6?.weight}
                </p>
                <p className="text-gray-900 font-semibold text-sm">
                  Date:
                  {
                    //@ts-expect-error aaa
                    new Date(date6?.date).toDateString()
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-3xl text-white font-semibold my-2">
          Progress Chart
        </h1>
        <div className="flex flex-col lg:flex-row">
          <div className="w-120 h-fit max-sm:w-80">
            <Line options={options} data={extractData("reps")} />
          </div>
          <div className="w-120 h-fit max-sm:w-80">
            <Line data={extractData("calories")} />
          </div>
          <div className="w-120 h-fit max-sm:w-80">
            <Line data={extractData("weight")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
