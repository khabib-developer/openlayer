import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style, Text } from "ol/style";
import { GeoJSON } from "ol/format";

export const defaultMassiveStyle = (text) =>
    new Style({
       fill: new Fill({
          color: [85, 118, 255, 0.01],
       }),
       stroke: new Stroke({
          color: [46, 45, 45, 1],
          width: 1,
       }),
       text: new Text({
          text,
          fill: new Fill({
             color: [0, 0, 0, 1],
          }),
       }),
    });

export const selectedMassiveStyle = (text, strokeColor) => {
   return new Style({
      fill: new Fill({
         color: [85, 118, 255, 0.01],
      }),
      stroke: new Stroke({
         color: strokeColor,
         width: 2,
      }),
      text: new Text({
         text,
         fill: new Fill({
            color: [0, 0, 0, 1],
         }),
      }),
   });
}

export function drawMassives(map) {


  const massives = new VectorImageLayer({
    source: new VectorSource({
      url: new URL("../../../data/Massivlar.json", import.meta.url),
      format: new GeoJSON(),
    }),
    visible: true,
    title: "GeoJson",
    style: function (feature) {
      return defaultMassiveStyle(feature.getProperties()["name"]);
    },
  });

  map.addLayer(massives);

   map.on("click", (evt) => {
      massives.getFeatures(evt.pixel).then((features) => {
       if (features.length) {
         const view = map.getView();
         //
         // if (selectedFeature) {
         //   selectedFeature.setStyle(defaultStyle);
         // }
         // Update the selected feature and set its style
         // selectedFeature = features[0];
         view.fit(features[0].getGeometry().getExtent(), {
           duration: 500,
         });

         // selectedFeature.setStyle(selectedStyle);
       }
     });
   });

  return { massives };
}
