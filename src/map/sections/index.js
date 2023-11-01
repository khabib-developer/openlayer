import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import {changeSelectedFeaturesStyle, setDefaultStyle} from "../../hooks/search.hook";

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

  map.on("click", (evt) => {
    sections.getFeatures(evt.pixel).then((features) => {
      if (features.length) {
        const view = map.getView();
        setDefaultStyle()
        changeSelectedFeaturesStyle(features[0], map)
        // view.fit(features[0].getGeometry().getExtent(), {
        //   duration: 500,
        // });
      }
    });
  });

  return { sections };
}
