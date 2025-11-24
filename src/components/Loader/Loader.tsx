import { Hourglass } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loaderWrapper}>
      <Hourglass
        visible={true}
        height="60"
        width="60"
        ariaLabel="hourglass-loading"
        wrapperClass={css.loader}
        colors={["#306cce", "#72a1ed"]}
      />
    </div>
  );
}
