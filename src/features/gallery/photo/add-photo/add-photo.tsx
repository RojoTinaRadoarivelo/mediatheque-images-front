import { useEffect, useState } from "react";
import "./add-photo.scss";
import {
  useCreateTag,
  useTags,
} from "../../../../shared/services/tags.queries";
import type { TagsType } from "../../../tags/tags.type";
import { useCreatePhoto } from "../../../../shared/services/gallery.queries";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../auth/context/auth.context";

const AddPhotoForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearch, setTagSearch] = useState("");
  const { data, isLoading, error: tagsError } = useTags(0);
  const [file, setFile] = useState<File | null>(null);
  const { isAuthenticated, user } = useAuth();

  const {
    mutate: createTag,
    isPending: isCreatingTag,
    isError: isCreateTagError,
    error: createTagError,
  } = useCreateTag();

  const {
    mutate: createPhoto,
    isPending: isCreatingPhoto,
    isError: isCreatePhotoError,
    error: createPhotoError,
  } = useCreatePhoto();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const allTags: TagsType[] = data?.tags?.data ?? [];

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
        normalizeTag(t.name ?? "")?.toLowerCase() === normalized.toLowerCase(),
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

    const tagsIds: string[] = [];
    selectedTags.forEach((tag) => {
      const found = allTags.find((el) => el.name === tag)?.id;
      if (found) {
        tagsIds.push(found);
        formData.append("tags_id", found);
      }
    });
    formData.append("user_id", user?.id!);

    createPhoto(formData, {
      onSuccess: (res) => {
        console.log("created photo successfuly : ", res);

        Cancel();
      },
    });

    console.log("FORM DATA READY", [...formData.entries()]);
  };

  const Cancel = () => {
    reset();
    setSelectedTags([]);
    setPreview(null);
    setFile(null);
  };

  return (
    <form className="w-full max-w-5xl p-6 " onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-6">
        {/* IMAGE */}
        <label
          htmlFor="photo"
          className="w-5/12 min-h-[280px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <>
              <div className="text-6xl text-gray-400">+</div>
              <p className="text-sm text-gray-500 mt-2">Upload photo</p>
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
        <div className="w-7/12 flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Add photo</h3>

          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus: hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            {...register("name", { required: true })}
          />

          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus: hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Title ( alt )"
            {...register("title")}
          />

          {/* TAGS */}
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-sm rounded-full bg-gray-700 text-white flex items-center gap-2"
                >
                  {tag}
                  <button className="btn-small" onClick={() => removeTag(tag)}>
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <input
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus: hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search or add tag..."
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
            />

            {tagSearch && (
              <div
                className={`mt-2 max-h-40 overflow-y-auto bg-white
                  ${!tagExistsGlobally ? "border rounded-lg shadow" : ""}
                `}
              >
                {filteredTags.map((tag) => (
                  <div
                    key={tag?.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => addTag(tag.name!)}
                  >
                    {tag?.name}
                  </div>
                ))}

                {!filteredTags.length && !tagExistsGlobally && (
                  <div
                    className="px-4 py-2 text-primary cursor-pointer"
                    onClick={() => addTag(tagSearch)}
                  >
                    + Create "{tagSearch}"
                  </div>
                )}
                {isCreateTagError && (
                  <p className="text-red-500 text-sm mt-1">
                    {(createTagError as any)?.message ??
                      "Erreur lors de la création du tag"}
                  </p>
                )}
              </div>
            )}
          </div>

          <textarea
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus: hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Short description"
            {...register("description")}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-start gap-3 mt-6">
        <button
          onClick={() => Cancel()}
          className="px-6 py-2  bordered  rounded-lg hover:bg-gray-500 hover:text-white "
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddPhotoForm;
