import { zodResolver } from "@hookform/resolvers/zod";
import {
  SIGNUP_SCHEMA,
  type SignUpFormData,
} from "../validators/sign-up.validator";
import "./sign-up.scss";
import { useAuth } from "../context/auth.context";
import { useForm } from "react-hook-form";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

function SignUp({ closeModal }: { closeModal: () => void }) {
  const [step, setStep] = useState<"form" | "code">("form");
  const [panelHeight, setPanelHeight] = useState<number>(0);
  const formPanelRef = useRef<HTMLDivElement | null>(null);
  const codePanelRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    trigger,
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
    const isValid = await trigger(["email", "password", "confirmPassword"]);
    if (!isValid) return;

    const email = getValues("email");
    await sendingEmailVerification(email);
    setStep("code");
  };

  const handleBackToForm = () => {
    setStep("form");
  };

  useLayoutEffect(() => {
    const activePanel =
      step === "form" ? formPanelRef.current : codePanelRef.current;
    if (activePanel) {
      setPanelHeight(activePanel.scrollHeight);
    }
  }, [step, errors]);

  return (
    <div className="w-full bg-background p-5 text-foreground">
      <div className="mb-4">
        <p className="text-lg font-semibold">{t("common:auth.signup")}</p>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {step === "form"
          ? "Create your account in two quick steps."
          : "Enter the verification code sent to your email."}
      </p>

      <div className="my-4 flex items-center gap-2 text-xs">
        <span
          className={`h-2.5 w-2.5 rounded-full ${step === "form" ? "bg-primary" : "bg-muted-foreground/40"}`}
        />
        <span className="text-muted-foreground">
          {step === "form" ? "Credentials" : "Verification"}
        </span>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
        <div
          className="relative w-full overflow-hidden transition-[height] duration-300"
          style={{ height: panelHeight ? `${panelHeight}px` : "auto" }}
        >
          <div
            ref={formPanelRef}
            className={`space-y-4 transition-all duration-300 ${
              step === "form"
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0 pointer-events-none"
            }`}
            style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
          >
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("common:general.email")}
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                autoComplete="email"
                {...register("email")}
                className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/40"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("common:auth.password")}
              </label>
              <input
                type="password"
                placeholder="........"
                autoComplete="new-password"
                {...register("password")}
                className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/40"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("common:auth.confirmPassword")}
              </label>
              <input
                type="password"
                placeholder="........"
                autoComplete="new-password"
                {...register("confirmPassword")}
                className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/40"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="button"
              onClick={handleSendCode}
              size="lg"
              className="button-reset mt-1 h-10 w-full rounded-xl text-sm font-semibold"
            >
              {t("common:auth.sendCode")}
            </Button>
          </div>

          <div
            ref={codePanelRef}
            className={`space-y-4 transition-all duration-300 ${
              step === "code"
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0 pointer-events-none"
            }`}
            style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
          >
            <div className="my-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("common:auth.validationCode")}
              </label>
              <input
                type="text"
                placeholder="xxxxxxxx"
                autoComplete="one-time-code"
                inputMode="numeric"
                maxLength={8}
                {...register("code")}
                className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/40"
              />
              {errors.code && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.code.message}
                </p>
              )}
            </div>

            <div className="mt-1 w-full flex justify-between ">
              <Button
                type="button"
                onClick={handleBackToForm}
                variant="ghost"
                size="sm"
                className="button-reset w-24 inline-flex items-center justify-start gap-2 px-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground"
              >
                <span aria-hidden="true">&larr;</span>
                <span>Back</span>
              </Button>
              <Button
                type="submit"
                size="lg"
                className="button-reset w-24 h-10 rounded-xl text-sm font-semibold"
              >
                {t("common:general.save")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
