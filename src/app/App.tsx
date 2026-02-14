import "./App.scss";
import { LayoutProvider } from "../layouts/context/layout.context";
import Layout from "../layouts/layout";
import Footer from "../shared/components/footer/footer";
import Header from "../shared/components/header/header";

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
