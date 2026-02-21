import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../layouts/layout";
import NotFoundPage from "../shared/components/page-not-found/page-not-found";
import ProtectedRoute from "../features/auth/guards/auth.guard";
import Tags from "../features/tags/tags";

/* 🔥 Lazy loaded pages */
const GalleryPage = lazy(() => import("../features/gallery/gallery"));
// const Profile = lazy(() => import("../pages/Profile"));
// const Settings = lazy(() => import("../pages/Settings"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div> Chargement...</div>}>
      <Routes>
        {/* redirect racine */}
        <Route path="/" element={<Navigate to="/gallery" replace />} />

        {/* pages publiques */}
        <Route path="/gallery" element={<Layout />}>
          <Route index element={<GalleryPage />} />
        </Route>

        {/* pages protégées */}
        <Route element={<ProtectedRoute />}>
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} /> */}
          <Route path="/tags" element={<Tags />} />
        </Route>

        {/* 404 */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
