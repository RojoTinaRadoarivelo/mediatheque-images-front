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
  const canGoPrev = page > 1;
  const tags = data?.tags?.data ?? [];

  const nextTagPage = () => {
    setPage((p) => p + 1);
  };

  const prevTagPage = () => {
    setPage((p) => (p > 1 ? p - 1 : p));
  };

  if (isLoading) return null;
  if (error) return <span className="text-sm text-red-500">Error while loading tags</span>;

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
        {tags.map((t: TagsType) => (
          <button
            key={t.id}
            type="button"
            className="px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs text-left hover:bg-muted whitespace-nowrap"
          >
            #{t.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavbarMenu;
