import { useState } from "react";
import {
  useCreateTag,
  useTags,
} from "../../../../shared/services/tags.queries";
import type { TagsType } from "../../../tags/tags.type";
import { useCreatePhoto } from "../../../../shared/services/gallery.queries";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../auth/context/auth.context";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const AddPhotoForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearch, setTagSearch] = useState("");
  const { data } = useTags(0);
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAuth();
  const { t } = useTranslation();

  const {
    mutate: createTag,
    isError: isCreateTagError,
    error: createTagError,
  } = useCreateTag();
  const { mutate: createPhoto } = useCreatePhoto();

  const { register, handleSubmit, reset } = useForm();

  const allTags: TagsType[] = data?.tags?.data ?? [];
  const textareaClassName =
    "w-full rounded-xl border border-input bg-transparent px-3 py-2.5 text-sm text-foreground shadow-xs outline-none transition placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 resize-none dark:bg-input/30";

  const filteredTags = allTags.filter(
    (tag) =>
      tag.name?.toLowerCase().includes(tagSearch.toLowerCase()) &&
      !selectedTags.includes(tag?.name),
  );

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

  const onSubmit = (data: any) => {
    if (!file) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("objectFile", file);
    formData.append("name", data.name);
    formData.append("title", data.title);
    formData.append("description", data.description);

    selectedTags.forEach((tag) => {
      const found = allTags.find((el) => el.name === tag)?.id;
      if (found) formData.append("tags_id", found);
    });
    formData.append("user_id", user?.id ?? "");

    createPhoto(formData, {
      onSuccess: () => {
        cancel();
      },
    });
  };

  const cancel = () => {
    reset();
    setSelectedTags([]);
    setPreview(null);
    setFile(null);
  };

  return (
    <form
      className="w-full max-w-5xl p-5 md:p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-6">
        <label
          htmlFor="photo"
          className="w-5/12 min-h-[280px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:border-ring transition"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <>
              <div className="text-5xl text-muted-foreground">+</div>
              <p className="text-sm text-muted-foreground mt-2">
                {t("common:upload")} {t("common:photo")}
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

        <div className="w-7/12 flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-foreground">
            {t("common:general.new_f")} {t("common:photo")}
          </h3>

          <Input
            className="h-10 rounded-xl px-3 shadow-xs"
            placeholder={t("common:name")}
            {...register("name", { required: true })}
          />

          <Input
            className="h-10 rounded-xl px-3 shadow-xs"
            placeholder={t("common:alt")}
            {...register("title")}
          />

          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-2 h-6 rounded-full px-2.5 bg-primary/10 text-primary border border-primary/20 dark:bg-secondary dark:text-secondary-foreground dark:border-transparent"
                >
                  <span>{tag}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="button-reset -mr-1"
                    onClick={() => removeTag(tag)}
                    aria-label={`Remove tag ${tag}`}
                    title={`Remove tag ${tag}`}
                  >
                    ×
                  </Button>
                </Badge>
              ))}
            </div>

            <Input
              className="h-10 rounded-xl px-3 shadow-xs"
              placeholder={`${t("common:general.search")} ${t("common:or")} ${t("common:general.add")} tag...`}
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
                    key={tag?.id}
                    className="px-3 py-2 text-sm hover:bg-muted cursor-pointer"
                    onClick={() => addTag(tag.name!)}
                  >
                    {tag?.name}
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
                {isCreateTagError && (
                  <p className="text-red-500 text-sm mt-1 px-3 pb-2">
                    {(createTagError as any)?.message ??
                      "Error while creating tag"}
                  </p>
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

      <div className="flex justify-start gap-3 mt-6">
        <Button
          type="button"
          onClick={cancel}
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
          {t("common:general.save")}
        </Button>
      </div>
    </form>
  );
};

export default AddPhotoForm;
