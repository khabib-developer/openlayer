import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style, Text } from "ol/style";
import { GeoJSON, MVT } from "ol/format";

export function drawSections(map) {


  const source = new VectorSource({
     url: new URL("../../../data/Konturlar.json", import.meta.url),
     format: new GeoJSON(),
  })

  const sections = new VectorImageLayer({
    source,
    visible: true,
    title: "GeoJson",
    // style: function (feature) {
    //   return style(String(feature.getProperties()['Kontur_raq']), true);
    // },
  });

  map.addLayer(sections);

  return { sections };
}
