import type { TagsType } from "../../../features/tags/tags.type";
import { useTags } from "../../services/tags.queries";
import "./navbar-menu.scss";

const NavbarMenu = () => {
  const { data, isLoading, error } = useTags();

  if (isLoading) return null;
  if (error) return <span>Erreur</span>;

  return (
    <div className="flex space-x-1">
      {data?.tags?.data?.map((t: TagsType) => (
        <button key={t.id} className="p-1 border">
          {t.name}
        </button>
      ))}
    </div>
  );
};

export default NavbarMenu;
