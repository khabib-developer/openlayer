import { Map, View } from "ol";
import VectorTileLayer from "ol/layer/VectorTile";
import OGCVectorTile from "ol/source/OGCVectorTile";
import { GeoJSON, MVT } from "ol/format";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { drawSections } from "./sections";
import { drawMassives } from "./massives";
import LayerGroup from "ol/layer/Group";
import {searchSection} from "../hooks/search.hook";
import {downloadHook} from "../hooks/download.hook";
import renderColors from "./renderColors";
import {renderInformation} from "../modules/information";
import {activeFeaturesNames, featuresNames} from "../modules/renderModules";

const mapExtent = [
  7578606.048414063, 4895149.150804532, 7700339.7697632, 4970917.816961464,
];

const mapCenter = [7639018.313112488, 4933510.741777165];

const mapZoom = 11.5;

export let sectionsData = null

export let globalMassives = null

export async function drawMap(download, sectionsShouldBeDrew = true) {

  const searchForm = document.querySelectorAll(".search");
  const searchInput = document.querySelectorAll(".search input");

  const map = new Map({
    target: "map",
    constrainOnlyCenter: true,
    keyboardEventTarget: document,
    view: new View({
      center: mapCenter,
      zoom: mapZoom,
      extent: mapExtent,
    }),
  });

  const vectorLayer = new VectorTileLayer({
    source: new OGCVectorTile({
      url: "https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:cultural:ne_10m_admin_0_countries/tiles/WebMercatorQuad",
      format: new MVT(),
    }),
    background: "#f2f2f2", //"#d1d1d1",
    style: {
      "stroke-width": 0.6,
      "stroke-color": "#8c8b8b",
      "fill-color": "#f2f2f2" //"#f7f7e9",
    },
  });

  const clipLayer = new VectorLayer({
    style: null,
    source: new VectorSource({
      url: "../../data/tuman_chegarasi.json",
      format: new GeoJSON(),
    }),
  });

  const baseLayerGroup = new LayerGroup({
    layers: [ vectorLayer, clipLayer, ],
  });

  map.addLayer(baseLayerGroup);

  if(!sectionsShouldBeDrew) {
    const { massives } = drawMassives(map);
    globalMassives = massivesgit
  }


  if(sectionsShouldBeDrew) {
    const { sections} = drawSections(map);
    const { massives } = drawMassives(map);
    globalMassives = massives
    if(activeFeaturesNames.length) {
      sectionsData = await renderColors.setData(sections, activeFeaturesNames[0].id)

      if(sections) {
        const defaultItem = sectionsData[0]

        if(!defaultItem)
          return

        renderInformation(
            featuresNames,
            defaultItem,
            massives.getProperties().source.getFeatureById(defaultItem.massiv).getProperties()['name']
        )

        searchForm.forEach(function (element, index) {
          element.addEventListener("submit", e => searchSection(e, sections, massives, map, searchInput[index].value));
        })
      }
    }


  }

  download.addEventListener("click", () => downloadHook(map));
}


