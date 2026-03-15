import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../../../shared/services/user.queries";
import { useAuth } from "../../auth/context/auth.context";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

function Security() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const { mutate: deleteUser } = useDeleteUser();
  const securityActions = [
    "Change password",
    "Two-factor authentication (2FA)",
    "Email verification",
    "Login activity (sessions)",
    "Logout all devices",
  ];

  const Delete = (id: string) => {
    deleteUser(id, {
      onSuccess: () => {
        logout();
        navigate("/home");
      },
    });
  };

  return (
    <div className="space-y-5 text-foreground">
      <div className="rounded-xl border border-border bg-muted/60 p-4">
        <p className="text-sm text-muted-foreground">
          Gere les actions sensibles du compte. Verifie bien avant de confirmer
          une suppression definitive.
        </p>
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
        <h3 className="text-sm font-semibold text-red-700 mb-2">Danger zone</h3>
        <p className="text-sm text-red-900/80 mb-4">
          All infos and photos will be removed permanently after the account
          deletion.
        </p>

        <Button
          type="button"
          disabled={!user?.id}
          onClick={() => user?.id && Delete(user.id)}
          variant="destructive"
          size="lg"
          className="button-reset h-10 rounded-lg px-4 text-sm font-semibold"
        >
          Delete my account
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-background p-4">
        <p className="text-sm text-muted-foreground mb-4">
          {t("common:general.save")} des parametres de securite plus avances:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {securityActions.map((action) => (
            <button
              key={action}
              type="button"
              className="button-reset rounded-lg border border-border bg-background px-4 py-3 text-left text-sm text-foreground hover:bg-muted whitespace-normal"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Security;
