import { zodResolver } from "@hookform/resolvers/zod";
import {
  SIGNUP_SCHEMA,
  type SignUpFormData,
} from "../sign-in/validators/sign-up.validator";
import "./sign-up.scss";
import { useAuth } from "../context/auth.context";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function SignUp({ closeModal }: { closeModal: () => void }) {
  const [step, setStep] = useState<"form" | "code">("form");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SIGNUP_SCHEMA),
  });

  const { isAuthenticated, signup, sendingEmailVerification } = useAuth();

  const handleSignUp = (data: SignUpFormData): void => {
    const { email, code, password } = data;
    signup({ email, code, password });
    localStorage.removeItem("sentTo");
  };

  useEffect(() => {
    if (isAuthenticated) {
      closeModal();
    }
  }, [isAuthenticated, closeModal]);

  const handleSendCode = async () => {
    const email = localStorage.getItem("sentTo") ?? getValues("email");
    await sendingEmailVerification(email);
    setStep("code");
  };

  return (
    <div className="w-full flex flex-col items-center my-2 px-2 bg-white z-50">
      Sign Up
      <form className="space-y-4 mt-4" onSubmit={handleSubmit(handleSignUp)}>
        <div className="relative overflow-hidden w-full">
          <div
            className={`flex transition-transform duration-500 ${
              step === "code"
                ? "-translate-x-1/2 h-36 -ml-1"
                : "translate-x-0 ml-2"
            }`}
            style={{ width: "200%" }}
          >
            {/* STEP 1 */}
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
                  <p className="error">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirmer mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleSendCode}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Envoyer le code
              </button>
            </div>

            {/* STEP 2 */}
            <div className="w-1/2 pl-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Code de vérification
                </label>
                <input
                  type="text"
                  placeholder="XXXXXXXX"
                  {...register("code")}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.code && <p className="error">{errors.code.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Créer le compte
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
