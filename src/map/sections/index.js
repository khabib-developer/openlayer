import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import {changeSelectedFeaturesStyle, setDefaultStyle} from "../../hooks/search.hook";
import {delay} from "../../utils";

export async function drawSections(map) {
  const source = new VectorSource({
     url: new URL("../../../data/Kontur.json", import.meta.url),
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
        setDefaultStyle()
        changeSelectedFeaturesStyle(features[0], map)
      }
    });
  });

  await checkIfLengthNotEmpty(source)

  console.log('loaded')

  return { sections };
}

async function checkIfLengthNotEmpty(s) {
  if (s.getFeatures().length)
    return s
  await delay(500)
  return await checkIfLengthNotEmpty(s)
}

