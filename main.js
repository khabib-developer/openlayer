import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from "ol/source/Vector";
import LayerGroup from "ol/layer/Group";
import {GeoJSON} from "ol/format";
import VectorImageLayer from "ol/layer/VectorImage";
import {Fill, Stroke, Style} from "ol/style";
//
// console.log(DividedAreas)

const download = document.querySelector("#download");

const defaultStyle = new Style({
  fill: new Fill({
    color: [85, 118,255,0.1]
  }),
  stroke: new Stroke({
    color: [46,45,45,1],
    width: 1
  })
})

const selectedStyle = new Style({
  fill: new Fill({
    color: [85, 118,255,0.5]
  }),
  stroke: new Stroke({
    color: [46,45,45,1],
    width: 0.5
  })
})

const map = new Map({
  target: 'map',
  constrainOnlyCenter: true,
  keyboardEventTarget: document,
  view: new View({
    center: [7990543.9060794385,4921870.8709625155],
    zoom: 14,
    extent: [7986418.6952091735, 4919358.7501129955, 7994915.745798781, 4924770.103558802],
  })
});

const standardLayer = new TileLayer({
  source: new OSM(),
  visible: true,
  title: "OSMStandard"
})


const baseLayerGroup = new LayerGroup({
  layers: [
    standardLayer,
  ]
})

map.addLayer(baseLayerGroup)

// Vector layers

const fieldsGeoJson = new VectorImageLayer({
  source: new VectorSource({
    url: new URL("./data/result_geo.json", import.meta.url) ,
    format: new GeoJSON()
  }),
  visible: true,
  title: "GeoJson",
  style: defaultStyle
})

map.addLayer(fieldsGeoJson)

let selectedFeature = null;

map.on("click", evt => {
  fieldsGeoJson.getFeatures(evt.pixel).then((features) => {
    if(features.length) {
      const view = map.getView()

      if (selectedFeature) {
        selectedFeature.setStyle(defaultStyle);
      }
      // Update the selected feature and set its style
      selectedFeature = features[0];
      view.fit( features[0].getGeometry().getExtent(), {duration: 500, padding: [300, 300, 300, 300]} )

      selectedFeature.setStyle(selectedStyle);
    }
  })
})

download.addEventListener("click", () => {
  map.once('rendercomplete', function () {
    const mapCanvas = document.createElement('canvas');
    const size = map.getSize();
    mapCanvas.width = size[0];
    mapCanvas.height = size[1];
    const mapContext = mapCanvas.getContext('2d');
    Array.prototype.forEach.call(
        map.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
        function (canvas) {
          if (canvas.width > 0) {
            const opacity =
                canvas.parentNode.style.opacity || canvas.style.opacity;
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
            let matrix;
            const transform = canvas.style.transform;
            if (transform) {
              // Get the transform parameters from the style's transform matrix
              matrix = transform
                  .match(/^matrix\(([^\(]*)\)$/)[1]
                  .split(',')
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
    const link = document.getElementById('image-download');
    link.href = mapCanvas.toDataURL();
    link.click();
  });
  map.renderSync();
})