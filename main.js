import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  constrainOnlyCenter: true,
  keyboardEventTarget: document,
  view: new View({
    center: [7990543.9060794385,4921870.8709625155],
    zoom: 14,
    extent: [7986418.6952091735, 4919358.7501129955, 7994915.745798781, 4924770.103558802],
  })
});
