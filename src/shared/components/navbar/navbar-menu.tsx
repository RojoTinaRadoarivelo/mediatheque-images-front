import { useState } from "react";
import type { TagsType } from "../../../features/tags/tags.type";
import { useTags } from "../../services/tags.queries";
import "./navbar-menu.scss";
import { useNavigate } from "react-router-dom";

type NavbarMenuProps = {
  orientation: "horizontal" | "vertical";
};

const NavbarMenu = ({ orientation }: NavbarMenuProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useTags(page);
  const canGoPrev = page > 1;
  const tags = data?.tags?.data ?? [];
  const [tagFiltering, setFilter] = useState<TagsType[]>([]);
  const navigate = useNavigate();

  const nextTagPage = () => {
    setPage((p) => p + 1);
  };

  const prevTagPage = () => {
    setPage((p) => (p > 1 ? p - 1 : p));
  };

  if (isLoading) return null;
  if (error)
    return (
      <span className="text-sm text-red-500">Error while loading tags</span>
    );

  const handleGalleryFilter = (tag: TagsType) => {
    setFilter((prev) => {
      let newTags;
      if (prev.find((t) => t.id === tag.id)) {
        newTags = prev.filter((t) => t.id !== tag.id);
      } else {
        newTags = [...prev, tag];
      }
      if (newTags.length) {
        const tagNames = newTags.map((t) => t.name).join(",");
        navigate(`/home?tags=${tagNames}`, { replace: true });
      } else {
        navigate(`/home`, { replace: true });
      }

      return newTags;
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground px-1">
          Popular tags
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevTagPage}
            disabled={!canGoPrev}
            className="w-7 h-7 rounded-md border border-border bg-background text-xs text-muted-foreground hover:bg-muted disabled:opacity-50"
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={nextTagPage}
            className="w-7 h-7 rounded-md border border-border bg-background text-xs text-muted-foreground hover:bg-muted"
          >
            {">"}
          </button>
        </div>
      </div>

      <div
        className={
          orientation === "horizontal"
            ? "flex gap-2 w-full overflow-x-auto pb-1"
            : "flex flex-col gap-2 h-full overflow-y-auto pr-1"
        }
      >
        {tags.map((t: TagsType) => {
          const isSelected = tagFiltering.some((f) => f.id === t.id);
          return (
            <button
              key={t.id}
              type="button"
              className={`px-3 py-2 rounded-xl border ${
                isSelected
                  ? "border-blue-500 bg-blue-100 text-blue-700"
                  : "border-border bg-background text-foreground"
              } text-xs text-left hover:bg-muted whitespace-nowrap`}
              onClick={() => handleGalleryFilter(t)}
            >
              #{t.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavbarMenu;
