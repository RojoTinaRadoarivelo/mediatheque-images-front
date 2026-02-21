import Gallery from "../../features/gallery/gallery";
import NavbarMenu from "../../shared/components/navbar/navbar-menu";
import "./horizontal.scss";

const Horizontal = () => {
  return (
    <>
      <div className="mb-2 p-1 flex justify-center bg-white">
        <NavbarMenu orientation="horizontal"></NavbarMenu>
      </div>
      <div className="p-0.5">
        <Gallery />
      </div>
    </>
  );
};

export default Horizontal;
