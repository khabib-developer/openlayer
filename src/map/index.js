import {Map, View} from "ol";
import VectorTileLayer from "ol/layer/VectorTile";
import OGCVectorTile from "ol/source/OGCVectorTile";
import {GeoJSON, MVT} from "ol/format";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {drawSections} from "./sections";
import {drawMassives} from "./massives";
import LayerGroup from "ol/layer/Group";
import {clearInput, searchMassiveByName, searchSection} from "../hooks/search.hook";
import {downloadHook} from "../hooks/download.hook";
import renderColors from "./renderColors";
import {renderInformation} from "../modules/information";
import {activeFeaturesNames} from "../modules/renderModules";
import TileLayer from "ol/layer/Tile";
import {TileImage} from "ol/source";

export const mapExtent = [
   7608167.238671773, 4908957.917046178, 7669859.814263282, 4958395.798040829,
];

export const mapCenter = [7639018.313112488, 4933510.741777165];

export const mapZoom = 12;

export let sectionsData = null

export let globalMassives = null

export let globalMap = null

export async function drawMap(download, sectionsShouldBeDrew = true) {

   const searchForm = document.querySelectorAll(".search");
   let searchInput = document.querySelectorAll(".search input");
   const clearButton = document.querySelectorAll(".clearButton")

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

   globalMap = map;

   const baseLayer = new TileLayer({
      source: new TileImage({url: 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}'})
   })

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
      style: {
         "stroke-width": 4,
         "stroke-color": "rgba(0, 0, 0,1)"
      },
      source: new VectorSource({
         url: "../../data/border.json",
         format: new GeoJSON(),
      }),
   });

   const baseLayerGroup = new LayerGroup({
      layers: [
         baseLayer,
         clipLayer
         //vectorLayer,
      ],
   });

   map.addLayer(baseLayerGroup);

   if (!sectionsShouldBeDrew) {
      const {massives} = drawMassives(map);
      globalMassives = massives
   }

   if (sectionsShouldBeDrew) {
      const {sections} = drawSections(map);
      const {massives} = drawMassives(map);

      globalMassives = massives
      if (activeFeaturesNames.length) {
         sectionsData = await renderColors.setData(sections, activeFeaturesNames[0].id)

         if (sections) {
            const defaultItem = sectionsData[0]

            if (!defaultItem)
               return

            renderInformation(
                defaultItem,
                massives.getProperties().source.getFeatureById(defaultItem.massiv).getProperties()['name']
            )

            searchForm.forEach(function (element, index) {
               element.addEventListener("submit", e => searchSection(e, sections, massives, map, searchInput[index].value));
            })

            clearButton.forEach(function (element, index) {
               element.addEventListener("click", () => clearInput(map, searchInput[index]))
            })

         }
      }
   }

   download.addEventListener("click", () => downloadHook(map));
}


