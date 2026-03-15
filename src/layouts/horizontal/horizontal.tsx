import Gallery from "../../features/gallery/gallery";
import NavbarMenu from "../../shared/components/navbar/navbar-menu";
import "./horizontal.scss";

const Horizontal = () => {
  return (
    <>
      <div className="mx-3 mb-3 p-2 flex justify-center bg-card border border-border rounded-xl">
        <NavbarMenu orientation="horizontal"></NavbarMenu>
      </div>
      <div className="px-3">
        <Gallery />
      </div>
    </>
  );
};

export default Horizontal;
