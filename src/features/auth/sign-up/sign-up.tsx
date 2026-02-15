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
      <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
        <div className="relative overflow-hidden w-full">
          <div
            className={`flex transition-transform duration-500 ${
              step === "code" ? "-translate-x-1/2" : "translate-x-0"
            }`}
            style={{ width: "200%" }}
          >
            {/* STEP 1 */}
            <div className="w-1/2 pr-4 space-y-4">
              <div>
                <label>Email</label>
                <input type="email" {...register("email")} className="input" />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label>Mot de passe</label>
                <input
                  type="password"
                  {...register("password")}
                  className="input"
                />
                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label>Confirmer mot de passe</label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className="input"
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleSendCode}
                className="btn-primary w-full"
              >
                Envoyer le code
              </button>
            </div>

            {/* STEP 2 */}
            <div className="w-1/2 pl-4 space-y-4">
              <div>
                <label>Code de vérification</label>
                <input type="text" {...register("code")} className="input" />
                {errors.code && <p className="error">{errors.code.message}</p>}
              </div>

              <button type="submit" className="btn-primary w-full">
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
