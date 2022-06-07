import "../Banner/Banner.scss";
import { useStretchingTextWithCache } from "../../hooks/useStretchingTextWithCache";
const icon = require("../../static/vs.png");

export const BannerWithCache = ({ text_1, text_2 }) => {
  useStretchingTextWithCache("banner__text");

  return (
    <div className="banner">
      <div className="banner__text-container">
        <p className="banner__text banner__text_1">{text_1}</p>
      </div>
      <img className="banner__img" src={icon} />
      <div className="banner__text-container">
        <p className="banner__text banner__text_2">{text_2}</p>
      </div>
    </div>
  );
};
