import "./App.scss";
import Layout from "../layouts/Layout";
import Footer from "../shared/components/footer/Footer";
import Header from "../shared/components/header/Header";
import { LayoutProvider } from "../layouts/context/layout.context";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
