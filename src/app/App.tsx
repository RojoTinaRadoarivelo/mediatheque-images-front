import "./App.scss";
import { LayoutProvider } from "../layouts/context/layout.context";
import Layout from "../layouts/layout";
import Footer from "../shared/components/footer/footer";
import Header from "../shared/components/header/header";
import { AuthProvider } from "../features/auth/context/auth.context";

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
              <Layout></Layout>
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
