import "../styles/style.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import LayerGroup from "ol/layer/Group";
import { GeoJSON, MVT } from "ol/format";
import VectorImageLayer from "ol/layer/VectorImage";
import { Fill, Stroke, Style, Text } from "ol/style";
import { weather } from "./weather/weather";
import VectorLayer from "ol/layer/Vector";
import OGCVectorTile from "ol/source/OGCVectorTile";
import VectorTileLayer from "ol/layer/VectorTile";
import { vectorLayers } from "./vectorLayers";
import { getVectorContext } from "ol/render";

const download = document.querySelector("#download");

const loader = document.querySelector(".loader");

const defaultStyle = (text) =>
  new Style({
    fill: new Fill({
      color: [85, 118, 255, 0.1],
    }),
    stroke: new Stroke({
      color: [46, 45, 45, 1],
      width: 1,
    }),
    text: new Text({
      text,
      fill: new Fill({
        color: [255, 255, 255, 1],
      }),
    }),
  });

const section = () =>
  new Style({
    fill: new Fill({
      color: [85, 118, 255, 0.1],
    }),
    stroke: new Stroke({
      color: [46, 45, 45, 0.2],
      width: 1,
    }),
  });

const selectedStyle = new Style({
  fill: new Fill({
    color: [85, 118, 255, 0.5],
  }),
  stroke: new Stroke({
    color: [46, 45, 45, 1],
    width: 0.5,
  }),
});

const map = new Map({
  target: "map",
  constrainOnlyCenter: true,
  keyboardEventTarget: document,
  view: new View({
    center: [7639018.313112488, 4933510.741777165],
    zoom: 11.5,
    extent: [
      7578606.048414063, 4895149.150804532, 7700339.7697632, 4970917.816961464,
    ],
  }),
});

const standardLayer = new TileLayer({
  source: new OSM(),
  visible: true,
  title: "OSMStandard",
});

const vectorLayer = new VectorTileLayer({
  source: new OGCVectorTile({
    url: "https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:cultural:ne_10m_admin_0_countries/tiles/WebMercatorQuad",
    format: new MVT(),
  }),
  background: "#d1d1d1",
  style: {
    "stroke-width": 0.6,
    "stroke-color": "#8c8b8b",
    "fill-color": "#f7f7e9",
  },
});

const clipLayer = new VectorLayer({
  style: null,
  source: new VectorSource({
    url: "../data/tuman_chegarasi.json",
    format: new GeoJSON(),
  }),
});

// clipLayer.getSource().on('addfeature', function () {
//   standardLayer.setExtent(clipLayer.getSource().getExtent());
// });

const style = new Style({
  fill: new Fill({
    color: "black",
    opacity: 0,
  }),
});

standardLayer.on("postrender", function (e) {
  const vectorContext = getVectorContext(e);
  e.context.globalCompositeOperation = "destination-in";
  clipLayer.getSource().forEachFeature(function (feature) {
    vectorContext.drawFeature(feature, style);
  });
  e.context.globalCompositeOperation = "source-over";
});

const baseLayerGroup = new LayerGroup({
  layers: [vectorLayer, standardLayer, clipLayer],
});

map.addLayer(baseLayerGroup);

// Vector layers

vectorLayers.forEach((el, i) => {
  const vectorField = new VectorImageLayer({
    source: new VectorSource({
      url: new URL(`../data/${el}.json`, import.meta.url),
      format: new GeoJSON(),
    }),
    visible: true,
    title: "GeoJson",
    style: defaultStyle(el),
  });
  map.addLayer(vectorField);
});

const fieldsGeoJson = new VectorImageLayer({
  source: new VectorSource({
    url: new URL("../data/mirzoobod.geojson", import.meta.url),
    format: new GeoJSON(),
  }),
  visible: true,
  title: "GeoJson",
  style: defaultStyle,
});

// map.addLayer(fieldsGeoJson);

const kontur = new VectorImageLayer({
  source: new VectorSource({
    url: new URL("../data/Konturs.json", import.meta.url),
    format: new GeoJSON(),
  }),
  visible: true,
  title: "GeoJson",
  style: section(),
});

map.addLayer(kontur);

let selectedFeature = null;

map.on("click", (evt) => {
  fieldsGeoJson.getFeatures(evt.pixel).then((features) => {
    if (features.length) {
      const view = map.getView();

      if (selectedFeature) {
        selectedFeature.setStyle(defaultStyle);
      }
      // Update the selected feature and set its style
      selectedFeature = features[0];
      view.fit(features[0].getGeometry().getExtent(), {
        duration: 500,
        padding: [300, 300, 300, 300],
      });

      selectedFeature.setStyle(selectedStyle);
    }
  });
});

download.addEventListener("click", () => {
  map.once("rendercomplete", function () {
    const mapCanvas = document.createElement("canvas");
    const size = map.getSize();
    mapCanvas.width = size[0];
    mapCanvas.height = size[1];
    const mapContext = mapCanvas.getContext("2d");
    Array.prototype.forEach.call(
      map.getViewport().querySelectorAll(".ol-layer canvas, canvas.ol-layer"),
      function (canvas) {
        if (canvas.width > 0) {
          const opacity =
            canvas.parentNode.style.opacity || canvas.style.opacity;
          mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
          let matrix;
          const transform = canvas.style.transform;
          if (transform) {
            // Get the transform parameters from the style's transform matrix
            matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(",")
              .map(Number);
          } else {
            matrix = [
              parseFloat(canvas.style.width) / canvas.width,
              0,
              0,
              parseFloat(canvas.style.height) / canvas.height,
              0,
              0,
            ];
          }
          // Apply the transform to the export map context
          CanvasRenderingContext2D.prototype.setTransform.apply(
            mapContext,
            matrix
          );
          const backgroundColor = canvas.parentNode.style.backgroundColor;
          if (backgroundColor) {
            mapContext.fillStyle = backgroundColor;
            mapContext.fillRect(0, 0, canvas.width, canvas.height);
          }
          mapContext.drawImage(canvas, 0, 0);
        }
      }
    );
    mapContext.globalAlpha = 1;
    mapContext.setTransform(1, 0, 0, 1, 0, 0);
    const link = document.getElementById("image-download");
    link.href = mapCanvas.toDataURL();
    link.click();
  });
  map.renderSync();
});

function removeLoader() {
  loader.classList.add("opacity-0");
  loader.classList.add("-z-10");
}

(async function () {
  try {
    await weather();
    removeLoader();
    // await activateModules()
  } catch (e) {
    console.log(e);
  }
})();
