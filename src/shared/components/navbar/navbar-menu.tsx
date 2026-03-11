import { useEffect, useMemo, useState } from "react";
import type { TagsType } from "../../../features/tags/tags.type";
import { useTags } from "../../services/tags.queries";
import "./navbar-menu.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { MAX_LIST_LIMIT } from "@/shared/utils/queryClient";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type NavbarMenuProps = {
  orientation: "horizontal" | "vertical";
};

const NavbarMenu = ({ orientation }: NavbarMenuProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useTags(0);
  const allTags = Array.isArray(data?.tags?.data) ? data?.tags?.data : [];
  const totalPages = Math.max(1, Math.ceil(allTags.length / MAX_LIST_LIMIT));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * MAX_LIST_LIMIT;
  const tags = allTags.slice(startIndex, startIndex + MAX_LIST_LIMIT);
  const canGoPrev = safePage > 1;
  const canGoNext = safePage < totalPages;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const selectedTagNames = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const tagsParam = params.get("tags") ?? "";
    return new Set(
      tagsParam
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    );
  }, [location.search]);

  const nextTagPage = () => {
    setPage((p) => Math.min(p + 1, totalPages));
  };

  const prevTagPage = () => {
    setPage((p) => (p > 1 ? p - 1 : 1));
  };

  if (isLoading) return null;
  if (error)
    return (
      <span className="text-sm text-red-500">Error while loading tags</span>
    );

  const handleGalleryFilter = (tag: TagsType) => {
    const tagName = tag.name?.trim();
    if (!tagName) return;

    const params = new URLSearchParams(location.search);
    const next = new Set(selectedTagNames);

    if (next.has(tagName)) next.delete(tagName);
    else next.add(tagName);

    if (next.size) params.set("tags", Array.from(next).join(","));
    else params.delete("tags");

    const nextSearch = params.toString();
    navigate(`/home${nextSearch ? `?${nextSearch}` : ""}`, { replace: true });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground px-1">
          Popular tags
        </p>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={prevTagPage}
            disabled={!canGoPrev}
            aria-label="Previous tag page"
            title="Previous"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="w-7 text-center text-xs tabular-nums text-muted-foreground">
            {safePage}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={nextTagPage}
            disabled={!canGoNext}
            aria-label="Next tag page"
            title="Next"
          >
            <ChevronRight className="size-4" />
          </Button>
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
          const tagName = t.name?.trim() ?? "";
          const isSelected = tagName ? selectedTagNames.has(tagName) : false;
          return (
            <button
              key={t.id}
              type="button"
              className={`px-3 py-2 rounded-xl border ${
                isSelected
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border bg-background text-foreground"
              } text-xs text-left hover:bg-muted whitespace-nowrap`}
              onClick={() => handleGalleryFilter(t)}
            >
              #{tagName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavbarMenu;
