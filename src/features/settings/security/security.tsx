import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../../../shared/services/user.queries";
import { useAuth } from "../../auth/context/auth.context";
import { useTranslation } from "react-i18next";

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
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
        <p className="text-sm text-slate-600">
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

        <button
          type="button"
          disabled={!user?.id}
          onClick={() => user?.id && Delete(user.id)}
          className="text-sm px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          Delete my account
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-500 mb-4">
          {t("common:general.save")} des parametres de securite plus avances:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {securityActions.map((action) => (
            <button
              key={action}
              type="button"
              className="rounded-lg border border-slate-200 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
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
