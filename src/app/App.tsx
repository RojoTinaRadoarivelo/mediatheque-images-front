import "./App.scss";
import { LayoutProvider } from "../layouts/context/layout.context";
import Layout from "../layouts/layout";
import Footer from "../shared/components/footer/footer";
import Header from "../shared/components/header/header";
import { AuthProvider } from "../features/auth/context/auth.context";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <AuthProvider>
        <LayoutProvider>
          <div id="app-container">
            <div id="header-container">
              <Header></Header>
            </div>

            <div id="main-container">
              <Routes>
                {/* page par défaut */}
                <Route path="/" element={<Navigate to="/gallery" />} />

                {/* PAGE GALLERY */}
                <Route path="/gallery" element={<Layout />} />

                {/* PROFILE PAGE */}
                {/* <Route path="/profile" element={<Profile />} /> */}
              </Routes>
              {/* <Layout></Layout> */}
            </div>
            <div id="footer-container">
              <Footer></Footer>
            </div>
          </div>
        </LayoutProvider>
      </AuthProvider>
    </>
  );
}

export default App;
