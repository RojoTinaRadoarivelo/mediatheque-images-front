import NavbarMenu from "../../shared/components/navbar/navbar-menu";
import "./vertical.scss";

const Vertical = () => {
  return (
    <div className="w-full flex gap-0.5 max-sm:flex-col">
      <div className="px-1 w-1/12 max-sm:w-full text-center">
        <NavbarMenu></NavbarMenu>
      </div>
      <div className="px-1 w-11/12 max-sm:w-full">
        GALERY + SMOOTH PAGINATION
      </div>
    </div>
  );
};

export default Vertical;
