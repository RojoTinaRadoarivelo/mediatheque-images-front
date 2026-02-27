import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../layouts/layout";
import NotFoundPage from "../shared/components/page-not-found/page-not-found";
import ProtectedRoute from "../features/auth/guards/auth.guard";

/* 🔥 Lazy loaded pages */
const HomePage = lazy(() => import("../features/gallery/gallery"));
const Profile = lazy(() => import("../features/profile/profile"));
// const Settings = lazy(() => import("../pages/Settings"));
const UserCollection = lazy(
  () => import("../features/gallery/collections/user-collection"),
);
const FaqPage = lazy(() => import("../features/faq/faq"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div> Chargement...</div>}>
      <Routes>
        {/* redirect racine */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* pages publiques */}
        <Route path="/home" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* pages protégées */}
        <Route element={<ProtectedRoute />}>
          <Route element={<UserCollection />}>
            <Route path="profile" element={<Profile />} />
            <Route path="galleries" element={<HomePage />} />
            <Route path="settings" element={<div>Settings</div>} />
            <Route path="faq" element={<FaqPage />} />
            {/* <Route path="/settings" element={<Settings />} /> */}
          </Route>
        </Route>

        {/* 404 */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
