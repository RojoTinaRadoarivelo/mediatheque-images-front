import "./App.scss";
import { LayoutProvider } from "../layouts/context/layout.context";
import Footer from "../shared/components/footer/footer";
import Header from "../shared/components/header/header";
import { AuthProvider } from "../features/auth/context/auth.context";
import AppRouter from "./App.route";
import { ThemeProvider } from "../shared/context/themes";

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <LayoutProvider>
            <div id="app-container">
              <div id="header-container">
                <Header></Header>
              </div>

              <div id="main-container">
                <AppRouter></AppRouter>
              </div>
              <div id="footer-container">
                <Footer></Footer>
              </div>
            </div>
          </LayoutProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
