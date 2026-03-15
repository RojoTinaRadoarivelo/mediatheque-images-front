import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  useCreateTag,
  useTags,
} from "../../../../shared/services/tags.queries";
import { useUpdatePhoto } from "../../../../shared/services/gallery.queries";
import type { TagsType } from "../../../tags/tags.type";
import { ENV } from "../../../../environment/env";
import { useAuth } from "../../../auth/context/auth.context";
import { useTranslation } from "react-i18next";

type UpdatePhotoFormProps = {
  photo: {
    id: string;
    src: string;
    name?: string;
    title?: string;
    description?: string;
    tags?: { name: string }[];
  };
  onClose: () => void;
};

const UpdatePhotoForm = ({ photo, onClose }: UpdatePhotoFormProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearch, setTagSearch] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAuth();
  const { t } = useTranslation();

  const { data } = useTags(0);
  const allTags: TagsType[] = data?.tags?.data ?? [];

  const { mutate: createTag } = useCreateTag();
  const { mutate: updatePhoto } = useUpdatePhoto();

  const textareaClassName =
    "mt-1 w-full rounded-xl border border-input bg-transparent px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 resize-none dark:bg-input/30";

  // react-hook-form setup with default values
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: photo.name ?? "",
      title: photo.title ?? "",
      description: photo.description ?? "",
    },
  });

  // Pre-fill tags
  useEffect(() => {
    setSelectedTags(photo.tags?.map((t) => t.name) ?? []);
  }, [photo.tags]);

  // Pre-fill image preview
  useEffect(() => {
    setPreview(ENV.API_URL + "/" + photo.src);
  }, [photo.src]);

  // Helpers for tags
  const normalizeTag = (tag: string) => tag.trim();

  const tagExistsGlobally = allTags.some(
    (t) => normalizeTag(t.name ?? "") === normalizeTag(tagSearch),
  );

  const addTag = (tag: string) => {
    const normalized = normalizeTag(tag);
    if (selectedTags.includes(normalized)) return;

    const tagAlreadyExists = allTags.some(
      (t) =>
        normalizeTag(t.name ?? "").toLowerCase() === normalized.toLowerCase(),
    );

    if (tagAlreadyExists) {
      setSelectedTags((prev) => [...prev, normalized]);
      setTagSearch("");
      return;
    }

    createTag(
      { name: normalized },
      {
        onSuccess: () => {
          setSelectedTags((prev) => [...prev, normalized]);
          setTagSearch("");
        },
      },
    );
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const filteredTags = allTags.filter(
    (tag) =>
      tag.name?.toLowerCase().includes(tagSearch.toLowerCase()) &&
      !selectedTags.includes(tag.name),
  );

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("photo_id", photo.id);
    formData.append("name", data.name);
    formData.append("title", data.title);
    formData.append("description", data.description);

    // Only append file if changed
    if (file) {
      formData.append("objectFile", file);
    }

    selectedTags.forEach((tag) => {
      const found = allTags.find((el) => el.name === tag)?.id;
      if (found) {
        formData.append("tags_id", found);
      }
    });
    formData.append("user_id", user?.id!);

    updatePhoto(formData, { onSuccess: () => onClose() });
  };

  const Cancel = () => {
    reset();
    setSelectedTags(photo.tags?.map((t) => t.name) ?? []);
    setPreview(ENV.API_URL + "/" + photo.src);
    setFile(null);
    onClose();
  };

  return (
    <form
      className="w-full p-6 h-full flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-1 min-h-0 overflow-auto flex-col md:flex-row gap-6">
        {/* IMAGE */}
        <label
          htmlFor="photo"
          className="w-full md:w-[65%] min-h-0 h-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:border-ring transition overflow-hidden"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain bg-background rounded-2xl"
            />
          ) : (
            <>
              <div className="text-6xl text-muted-foreground">+</div>
              <p className="text-sm text-muted-foreground mt-2">
                {t("common:upload") + " " + t("common:photo")}
              </p>
            </>
          )}
          <input
            id="photo"
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </label>

        {/* FORM */}
        <div className="w-full md:w-[35%] flex flex-col gap-4 min-h-0 pr-1">
          <h3 className="text-xl font-semibold">
            {t("common:general.updating") + " " + t("common:photo")}
          </h3>

          <Input
            className="h-10 rounded-xl px-3"
            placeholder={t("common:name")}
            {...register("name", { required: true })}
          />

          <Input
            className="h-10 rounded-xl px-3"
            placeholder={t("common:alt")}
            {...register("title")}
          />

          {/* TAGS */}
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-sm rounded-full bg-primary/10 text-primary border border-primary/20 dark:bg-secondary dark:text-secondary-foreground dark:border-transparent flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    className="button-reset text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => removeTag(tag)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <Input
              className="h-10 rounded-xl px-3"
              placeholder={
                t("common:general.search") +
                " " +
                t("common:or") +
                " " +
                t("common:general.add") +
                " tag..."
              }
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
            />

            {tagSearch && (
              <div
                className={`mt-2 max-h-40 overflow-y-auto rounded-lg bg-popover text-popover-foreground ${
                  !tagExistsGlobally ? "border border-border shadow-sm" : ""
                }`}
              >
                {filteredTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="px-3 py-2 text-sm hover:bg-muted cursor-pointer"
                    onClick={() => addTag(tag.name!)}
                  >
                    {tag.name}
                  </div>
                ))}

                {!filteredTags.length && !tagExistsGlobally && (
                  <div
                    className="px-3 py-2 text-sm text-primary cursor-pointer hover:bg-muted"
                    onClick={() => addTag(tagSearch)}
                  >
                    + {t("common:general.create")} "{tagSearch}"
                  </div>
                )}
              </div>
            )}
          </div>

          <textarea
            className={textareaClassName}
            rows={3}
            placeholder={t("common:description")}
            {...register("description")}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border">
        <Button
          type="button"
          onClick={Cancel}
          variant="outline"
          size="lg"
          className="button-reset h-10 rounded-xl px-5"
        >
          {t("common:general.cancel")}
        </Button>
        <Button
          type="submit"
          size="lg"
          className="button-reset h-10 rounded-xl px-5 font-semibold"
        >
          {t("common:general.update")}
        </Button>
      </div>
    </form>
  );
};

export default UpdatePhotoForm;
