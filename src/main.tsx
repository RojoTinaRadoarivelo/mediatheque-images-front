import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./assets/styles/tailwind.css"; // Tailwind
import "./index.scss";
import App from "./app/App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/utils/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
