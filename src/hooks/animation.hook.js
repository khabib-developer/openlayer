import {Point} from "ol/geom";
import {fromLonLat} from "ol/proj";
import {Feature} from "ol";
import {unByKey} from "ol/Observable";
import {getVectorContext} from "ol/render";
import {easeOut} from 'ol/easing.js';
import {Stroke, Style} from "ol/style";
import CircleStyle from "ol/style/Circle";


const duration = 3000;
function flash(feature, map, baseLayer) {
   const start = Date.now();
   const flashGeom = feature.getGeometry().clone();
   const listenerKey = baseLayer.on('postrender', animate);

   function animate(event) {
      const frameState = event.frameState;
      const elapsed = frameState.time - start;
      if (elapsed >= duration) {
         unByKey(listenerKey);
         return;
      }
      const vectorContext = getVectorContext(event);
      const elapsedRatio = elapsed / duration;
      // radius will be 5 at start and 30 at end.
      const radius = easeOut(elapsedRatio) * 25 + 5;
      const opacity = easeOut(1 - elapsedRatio);

      const style = new Style({
         image: new CircleStyle({
            radius: radius,
            stroke: new Stroke({
               color: 'rgba(255, 0, 0, ' + opacity + ')',
               width: 0.25 + opacity,
            }),
         }),
      });

      vectorContext.setStyle(style);
      vectorContext.drawGeometry(flashGeom);
      // tell OpenLayers to continue postrender animation
      map.render();
   }
}

export {flash}