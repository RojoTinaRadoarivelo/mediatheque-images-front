import "./Layout.scss";
import { useLayout } from "./context/layout.context";
import Horizontal from "./horizontal/horizontal";
import Vertical from "./vertical/vertical";

const layout = () => {
  const { layout } = useLayout();
  return (
    <div id="container">
      {layout === "Vertical" ? <Vertical /> : <Horizontal />}
    </div>
  );
};

export default layout;
