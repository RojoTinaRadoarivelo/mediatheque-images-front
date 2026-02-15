import "./sign-in.scss";
import {
  SIGNIN_SCHEMA,
  type SigninFormData,
} from "./validators/sign-in.validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/auth.context";
import { useEffect } from "react";
import type { ModalKey } from "../../../shared/utils/modals.type";

function SignIn({
  closeModal,
  switchModal,
}: {
  closeModal: () => void;
  switchModal: (key: ModalKey) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(SIGNIN_SCHEMA),
  });

  const { login, isAuthenticated } = useAuth();

  const handleSignin = (data: SigninFormData): void => {
    login(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      closeModal();
    }
  }, [isAuthenticated, closeModal]);

  return (
    <div className="w-full flex flex-col items-center my-2 px-2 bg-white z-50">
      Se connecter
      <form
        className="w-5/6 space-y-4 mt-4"
        onSubmit={handleSubmit(handleSignin)}
      >
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="email@exemple.com"
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Connexion
        </button>
      </form>
      {/* Signup link */}
      <p className="text-sm text-center text-gray-600 mt-6">
        Pas encore de compte ?{" "}
        <a
          onClick={() => switchModal("sign-up")}
          className="text-blue-600 font-medium hover:cursor-pointer"
        >
          S’inscrire
        </a>
      </p>
    </div>
  );
}

export default SignIn;
