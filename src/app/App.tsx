import "./App.scss";
import { LayoutProvider } from "../layouts/context/layout.context";
import Footer from "../shared/components/footer/footer";
import Header from "../shared/components/header/header";
import { AuthProvider } from "../features/auth/context/auth.context";
import AppRouter from "./App.route";

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
              <AppRouter></AppRouter>
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
