import "./Header.scss";
import { useLayout } from "../../../layouts/context/layout.context";

function header() {
  const { layout, setLayout } = useLayout();

  return (
    <div className="w-full flex justify-between my-1">
      <div>LOGO</div>
      <div>Search</div>
      <div>
        <select
          name="layoutSelection"
          id="layoutSelection"
          value={layout}
          onChange={(e) =>
            setLayout(e.target.value as "Vertical" | "Horizontal")
          }
        >
          <option value="Vertical">Vertical</option>
          <option value="Horizontal">Horizontal</option>
        </select>
      </div>
    </div>
  );
}

export default header;
