import Horizontal from "./horizontal/Horizontal";
import Vertical from "./vertical/Vertical";
import "./Layout.scss";
import { useLayout } from "./context/layout.context";

const layout = () => {
  const { layout } = useLayout();
  return (
    <div id="container">
      {layout === "Vertical" ? <Vertical /> : <Horizontal />}
    </div>
  );
};

export default layout;
