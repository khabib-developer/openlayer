import { service } from "../service";
import { chooseTextColor, delay, removeLoader, showLoader } from "../utils";
import { Fill, Stroke, Style, Text } from "ol/style";
import {
  colorInformation,
  featureFieldNames,
  recommendedColorInformation,
} from "../modules/renderModules";

class RenderColors {
  data = [];
  sections = [];

  async setData(sections, value, recommendation = false) {
    const result = await service(`/api/modul/counter-db/`);
    if (result) {
      this.data = result;
      this.sections = sections.getProperties().source.getFeatures();
      recommendation
        ? this.changeFeaturesColorsWithRecommendedColors(value - 1)
        : this.changeFeaturesColors(value);
      return this.data;
    }
    return null;
  }

  async changeData(value, param = "", recommendation) {
    showLoader();
    const result = await service(`/api/modul/counter-db/${param}`);
    if (result && result.length > 0) {
      this.data = result;
      recommendation
        ? this.changeFeaturesColorsWithRecommendedColors(value + 1)
        : this.changeFeaturesColors(value + 1);
      removeLoader();
      return this.data;
    }
  }

  changeFeaturesColors(value) {

    this.sections.forEach((feature, i) => {
      const item = this.data.find(
        (item) => +item.counter_id === +feature.getProperties()["Kontur_raq"]
      );
      if (item === undefined) {
        return;
      }
      const level = item[featureFieldNames[value - 1]];
      if (item) {
        feature.setStyle(
          this.style(
            String(feature.getProperties()["Kontur_raq"]),
            colorInformation[value - 1][level - 1],
            chooseTextColor(level)
          )
        );
      }
    });
  }

  changeFeaturesColorsWithRecommendedColors(index) {
    this.sections.forEach((feature, i) => {
      const item = this.data.find(
        (item) => +item.counter_id === +feature.getProperties()["Kontur_raq"]
      );
      if (item === undefined) {
        return;
      }
      const level = item[featureFieldNames[index]];
      if (item) {
        feature.setStyle(
          this.style(
            String(feature.getProperties()["Kontur_raq"]),
            [...recommendedColorInformation[index]].reverse()[level - 1],
            chooseTextColor(level, true)
          )
        );
      }
    });
  }

  style(text, color, textColor) {
    return new Style({
      fill: new Fill({
        color: color,
      }),
      stroke: new Stroke({
        color: "rgb(0,0,0,0.5)",
        width: 1,
      }),
      text: new Text({
        text,
        fill: new Fill({
          color: textColor,
        }),
      }),
    });
  }
}

export default new RenderColors();
