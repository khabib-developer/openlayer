import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";

export function drawSections(map) {
  const source = new VectorSource({
     url: new URL("../../../data/Konturlar.json", import.meta.url),
     format: new GeoJSON(),
  })

  const sections = new VectorImageLayer({
    source,
    visible: true,
    title: "GeoJson",
  });

  map.addLayer(sections);

  return { sections };
}
