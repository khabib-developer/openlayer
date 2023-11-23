import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import {Fill, Stroke, Style, Text} from "ol/style";
import {GeoJSON} from "ol/format";
import {setDefaultStyle} from "../../hooks/search.hook";

export const defaultMassiveStyle = (text) => new Style({
   fill: new Fill({
      color: [85, 118, 255, 0.01],
   }),
   stroke: new Stroke({
      color: [0, 0, 0, 1],
      width: 2,
   }),
   text: new Text({
      text,
      fill: new Fill({
         color: [0, 0, 0, 1],
      }),
      font: '20px sans-serif'
   }),
});

export const selectedMassiveStyle = (text, strokeColor) => {
   return new Style({
      fill: new Fill({
         color: [85, 118, 255, 0.01],
      }),
      stroke: new Stroke({
         color: strokeColor,
         width: 8,
      }),
      text: new Text({
         text,
         fill: new Fill({
            color: [0, 0, 0, 1],
         }),
         font: '20px sans-serif'
      }),
   });
}

export function drawMassives(map) {
   const massives = new VectorImageLayer({
      source: new VectorSource({
         url: new URL("../../../data/Massivlar_new.json", import.meta.url),
         format: new GeoJSON(),
      }),
      visible: true,
      title: "GeoJson",
      style: function (feature) {
         return defaultMassiveStyle(feature.getProperties()["name"]);
      },
   });

   map.addLayer(massives);



   return {massives};
}
