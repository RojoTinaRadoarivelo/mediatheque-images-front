import Gallery from "../../features/gallery/gallery";
import NavbarMenu from "../../shared/components/navbar/navbar-menu";
import "./vertical.scss";

const Vertical = () => {
  return (
    <div className="w-full min-h-screen flex gap-3 max-sm:flex-col overflow-y-auto px-3">
      <aside className="w-1/12 max-sm:w-full min-w-[180px] bg-white border border-slate-200 rounded-xl p-2 h-fit sticky top-20">
        <NavbarMenu orientation="vertical"></NavbarMenu>
      </aside>
      <main className="w-11/12 max-sm:w-full">
        <Gallery />
      </main>
    </div>
  );
};

export default Vertical;
