import { useForm } from "react-hook-form";
import { useAuth } from "../auth/context/auth.context";
import "./profile.scss";
import { useEffect, useState } from "react";
import {
  USER_SCHEMA,
  type UserFormData,
} from "../auth/validators/user.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useDeleteUser,
  useUpdateUser,
} from "../../shared/services/user.queries";
import { ENV } from "../../environment/env.local";
import { useNavigate } from "react-router-dom";

function profile() {
  const { user, logout } = useAuth();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const {
    mutate: updateUser,
    isPending: isUpdatingUser,
    isError: isUpdateUserError,
    error: updateUserError,
  } = useUpdateUser();

  const {
    mutate: deleteUser,
    isPending: isdeletingUser,
    isError: isdeleteUserError,
    error: deleteUserError,
  } = useDeleteUser();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(USER_SCHEMA),
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user.email ?? "",
        userName: user.userName ?? "",
      });
    }
  }, [user]);

  // Pre-fill image preview
  useEffect(() => {
    if (user?.avatar) {
      setPreview(ENV.API_URL + "/" + user?.avatar);
    }
  }, [user?.avatar]);

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
    formData.append("email", data.email);
    formData.append("userName", data.userName);
    formData.append("avatar", data.userName);

    updateUser(formData, {
      onSuccess: (res) => {
        Cancel();
      },
    });
  };

  const Cancel = () => {
    if (user) {
      reset({
        email: user.email ?? "",
        userName: user.userName ?? "",
      });
    }
    setPreview(null);
    setFile(null);
  };

  const Delete = (id: string) => {
    deleteUser(id, {
      onSuccess: (res) => {
        reset();
        setPreview(null);
        setFile(null);
        logout();
        navigate("/home");
      },
    });
  };

  return (
    <div className="">
      <div className="">profile</div>
      <form className="w-full max-w-5xl p-6 " onSubmit={handleSubmit(onSubmit)}>
        {/* avatar */}
        <label
          htmlFor="photo"
          className="w-5/12 min-h-[280px] flex flex-col items-center justify-center border border-dashed rounded-lg cursor-pointer hover:border-primary transition"
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

        {/* user form */}
        <div className="w-1/2 pr-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="email@exemple.com"
              {...register("email")}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom utilisateur
            </label>
            <input
              type="text"
              placeholder="Nom utilisateur"
              {...register("userName")}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.userName && (
              <p className="text-red-500">{errors.userName.message}</p>
            )}
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
      <button onClick={() => Delete(user?.id!)}>Supprimer</button>
    </div>
  );
}

export default profile;
