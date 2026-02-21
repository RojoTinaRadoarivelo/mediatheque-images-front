import { useState } from "react";
import type { TagsType } from "../../../features/tags/tags.type";
import { useTags } from "../../services/tags.queries";
import "./navbar-menu.scss";

type NavbarMenuProps = {
  orientation: "horizontal" | "vertical";
};

const NavbarMenu = ({ orientation }: NavbarMenuProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useTags(page);

  const nextTagPage = () => {
    setPage((p) => p + 1);
  };

  const prevTagPage = () => {
    setPage((p) => (p > 1 ? p - 1 : p));
  };

  if (isLoading) return null;
  if (error) return <span>Erreur</span>;

  return (
    <div
      className={
        orientation === "horizontal"
          ? "flex space-x-1 w-full overflow-x-auto"
          : "flex flex-col space-y-1  h-full overflow-y-auto"
      }
    >
      {data?.tags?.data?.map((t: TagsType) => (
        <button key={t.id} className="p-1 border ">
          {t.name}
        </button>
      ))}
    </div>
  );
};

export default NavbarMenu;
