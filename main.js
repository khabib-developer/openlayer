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