import "./sign-in.scss";
import {
  SIGNIN_SCHEMA,
  type SigninFormData,
} from "../validators/sign-in.validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/auth.context";
import { useEffect } from "react";
import type { ModalKey } from "../../../shared/utils/modals.type";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

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
  const { t } = useTranslation();

  const handleSignin = (data: SigninFormData): void => {
    login(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      closeModal();
    }
  }, [isAuthenticated, closeModal]);

  return (
    <div className="w-full  bg-background p-5  text-foreground">
      <div className="mb-4">
        <p className="text-lg font-semibold">{t("common:auth.signin")}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Access your account to manage galleries and preferences.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(handleSignin)}>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("common:general.email")}
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/40"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("common:auth.password")}
          </label>
          <input
            type="password"
            placeholder="........"
            className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/40"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="button-reset mt-1 h-10 w-full rounded-xl text-sm font-semibold"
        >
          {t("common:auth.signin")}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-muted-foreground">
        {t("common:auth.dontHaveAccount")}{" "}
        <a
          onClick={() => switchModal("sign-up")}
          className="font-semibold text-foreground hover:cursor-pointer hover:underline"
        >
          {t("common:auth.signup")}
        </a>
      </p>
    </div>
  );
}

export default SignIn;
