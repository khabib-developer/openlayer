import {service} from "../service";
import {chooseTextColor, delay} from "../utils";
import {Fill, Stroke, Style, Text} from "ol/style";
import {colorInformation, featureFieldNames} from "../modules/renderModules";


class RenderColors {
   data = []
   sections = []

   async setData(sections) {
      const result = await service("/api/modul/counter/")
      if(result) this.data = result
      await delay(500)
      this.sections = sections.getProperties().source.getFeatures()
      this.changeFeaturesColors(1)
      return this.data
   }

   changeFeaturesColors(value) {
      this.sections.forEach((feature, i) => {
         const item = this.data.find(item => +item.counter_id === +feature.getProperties()["Kontur_raq"])
         const level = item[featureFieldNames[value - 1]]
         if(item) {
            feature.setStyle(
                this.style(
                    String( feature.getProperties()["Kontur_raq"] ),
                    colorInformation[value -1][level - 1],
                    chooseTextColor(level)
                )
            )
         }
      })
   }

   style(text, color, textColor) {
      return new Style({
         fill: new Fill({
            color: color,
         }),
         stroke: new Stroke({
            color: color,
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

export default new RenderColors()