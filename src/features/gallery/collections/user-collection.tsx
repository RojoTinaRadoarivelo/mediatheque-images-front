import { Link, Outlet, useLocation } from "react-router-dom";
import "./user-collection.scss";
import { useTranslation } from "react-i18next";

type UserCollectionProps = {
  children?: React.ReactNode;
};

function UserCollection({ children }: UserCollectionProps) {
  const location = useLocation();
  const { t } = useTranslation("common");

  const links = [
    { to: "/galleries", label: t("gallery"), subtitle: "My gallery" },
    { to: "/profile", label: t("profile"), subtitle: "Photographer card" },
    { to: "/settings", label: t("settings"), subtitle: "Preferences and app" },
    { to: "/faq", label: "FAQ", subtitle: "Help and docs" },
  ];

  return (
    <div className="w-full h-full flex gap-3 max-sm:flex-col px-3">
      <aside className="w-1/12 max-sm:w-full min-w-[200px] bg-background border border-border rounded-xl p-3 h-fit sticky top-20">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-3">
          Workspace
        </p>
        <nav className="space-y-2">
          {links.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to} className="block">
                <div
                  className={`rounded-lg border px-3 py-2 transition-colors ${
                    active
                      ? "border-blue-500/40 bg-blue-500/10"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      active ? "text-blue-600" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex flex-col w-11/12 max-sm:w-full">
        <div className="w-full min-h-screen">
          {children ?? <Outlet />}
        </div>
      </main>
    </div>
  );
}

export default UserCollection;
