import Template1Thumbnail from "../images/templates/template1.png";
import Template2Thumbnail from "../images/templates/template2.png";
import Template3Thumbnail from "../images/templates/template3.png";

import Temp1base from "../images/elements/golden-base.png";
import Temp2base from "../images/elements/stone-base.png";
import Temp3base from "../images/elements/wooden-base.png";

import DefaultGlobeImage from "../images/templates/globe.jpg";

const templates = [
  {
    templateName: "Template 1",
    thumbnailImage: Template1Thumbnail,
    globe: DefaultGlobeImage,
    base: Temp1base,
  },
  {
    templateName: "Template 2",
    thumbnailImage: Template2Thumbnail,
    globe: DefaultGlobeImage,
    base: Temp2base,
  },
  {
    templateName: "Template 3",
    thumbnailImage: Template3Thumbnail,
    globe: DefaultGlobeImage,
    base: Temp3base,
  },
];

export default templates;
