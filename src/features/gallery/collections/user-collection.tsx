import { Link, Outlet, useLocation } from "react-router-dom";

import "./user-collection.scss";

function UserCollection() {
  const location = useLocation();
  return (
    <div className="w-full h-full flex gap-0.5 max-sm:flex-col">
      {/* left menu */}
      <div className="px-1 w-1/12 max-sm:w-full min-w-[140px] bg-white  flex flex-col items-center space-y-4 pt-4">
        <Link to={"/settings"}>
          <span className=" hover:underline text-gray-700 hover:text-blue-500 ">
            Settings
          </span>
        </Link>
        <Link to={"/profile"}>
          <span className=" hover:underline text-gray-700 hover:text-blue-500 ">
            Profile
          </span>
        </Link>
        <Link to={"/galleries"}>
          <span className=" hover:underline text-gray-700 hover:text-blue-500 ">
            Gallery
          </span>
        </Link>
        <Link to={"/faq"}>
          <span className=" hover:underline text-gray-700 hover:text-blue-500 ">
            Faq
          </span>
        </Link>
      </div>
      <div className="flex flex-col px-1 w-11/12 max-sm:w-full">
        <div className="w-full min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserCollection;
