import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style, Text } from "ol/style";
import { GeoJSON, MVT } from "ol/format";

export function drawMassives(map) {
  const defaultStyle = (text) =>
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

  const massives = new VectorImageLayer({
    source: new VectorSource({
      url: new URL("../../../data/Massivlar.json", import.meta.url),
      format: new GeoJSON(),
    }),
    visible: true,
    title: "GeoJson",
    style: function (feature) {
      return defaultStyle(feature.getProperties()["name"]);
    },
  });

  map.addLayer(massives);

  return { massives };
}
