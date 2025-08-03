import { NavLink, useNavigate } from "react-router";
import image from "../assets/dashboard-svgrepo-com.svg";

interface Props {
  setToken: (token: string) => void;
}
const NavBar = ({ setToken }: Props) => {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  }
  return (
    <div className="flex justify-between bg-gray-900 rounded-b-lg p-2 px-4 max-sm:p-1 mb-2">
      <ul className="flex justify-between w-full">
        <NavLink to="/">
          <h1 className="flex">
            <img src={image} alt="logo" className="w-8 max-sm:w-5" />
            <span className="text-2xl font-bold text-white font-mono max-sm:text-base max-sm:font-semibold">
              {" "}
              Dashboard
            </span>
          </h1>
        </NavLink>
        <NavLink
          to="/add"
          className="text-lg  max-sm:text-sm max-sm:font-medium font-semibold text-white"
        >
          Add Progress
        </NavLink>
        <span
          onClick={() => logout()}
          className="text-lg font-semibold text-white max-sm:text-sm max-sm:font-medium cursor-pointer"
        >
          Logout
        </span>
      </ul>
    </div>
  );
};

export default NavBar;
