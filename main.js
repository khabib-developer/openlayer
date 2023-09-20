import './style.css';
import {Feature, Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from "ol/source/Vector";
import {LineString} from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import LayerGroup from "ol/layer/Group";
import {Vector, VectorImage} from "ol/layer";
import {GeoJSON} from "ol/format";
import VectorImageLayer from "ol/layer/VectorImage";
import {Fill, Stroke, Style} from "ol/style";
import {createEmpty} from "ol/extent";
import {fromLonLat} from "ol/proj";
// import DividedAreas from "./data/map.geojson";
//
// console.log(DividedAreas)

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
    // stamenLayer
  ]
})

map.addLayer(baseLayerGroup)

// Vector layers

const fieldsGeoJson = new VectorImageLayer({
  source: new VectorSource({
    url:"./data/map.geojson",
    format: new GeoJSON()
  }),
  visible: true,
  title: "GeoJson",
  style: new Style({
    fill: new Fill({
      color: [85, 118,255,0.6]
    }),
    stroke: new Stroke({
      color: [46,45,45,1],
      width: 1.2
    })
  })
})

map.addLayer(fieldsGeoJson)

map.on("click", evt => {
  console.log(evt.coordinate)
  fieldsGeoJson.getFeatures(evt.pixel).then((features) => {
    if(features.length) {
      const view = map.getView()
      view.fit( features[0].getGeometry().getExtent(), {duration: 500, padding: [50, 50, 50, 50]} )
    }
  })
})