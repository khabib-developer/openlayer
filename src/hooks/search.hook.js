import {Fill, Stroke, Style, Text} from "ol/style";
import {renderInformation} from "../modules/information";
import {globalMassives, sectionsData} from "../map";
import {colorInformation, featureFieldNames, featuresNames} from "../modules/renderModules";
import {chooseTextColor} from "../utils";


const selectedStyle = (fill, stroke, text, textColor) => new Style({
   fill: new Fill({
      color: fill,
   }),
   stroke: new Stroke({
      color: stroke,
      width: 4,
   }),
   text: new Text({
      text,
      fill: new Fill({
         color: textColor,
      }),
   }),
});

const defaultStyle = (fill, text, textColor) => new Style({
       fill: new Fill({
          color: fill,
       }),
       stroke: new Stroke({
          color: [46, 45, 45, 0.01],
          width: 1,
       }),
       text: new Text({
          text,
          fill: new Fill({
             color: textColor,
          }),
       }),
    });

const standOutColors = [
   "rgb(255,0,0)",
   "rgb(255,0,0)",
   "rgb(255,0,0)",
   "#0072B2",
   "rgb(255,0,0)",
]

let selectedFeatureSearch = null
let section = null

export function searchSection(e, sections, massives, map, value, source, baseLayer) {

   const modules = document.querySelectorAll("input[name='module']")

   let moduleNumber = 0

   let count = 0;

   modules.forEach((module, i) => {
      if (module.checked) moduleNumber = i
   })

   e.preventDefault();

   if (selectedFeatureSearch) {
      section.setStyle(function (feature) {
         const item = sectionsData.find(item => +item.counter_id === +feature.getProperties()['Kontur_raq'])
         const level = item[featureFieldNames[moduleNumber]]
         return defaultStyle(
             colorInformation[moduleNumber][level - 1],
             String(feature.getProperties()['Kontur_raq']),
             chooseTextColor(value)
         );
      });
   }

   sections.getSource().forEachFeature(feature => {
      if (+feature.getProperties()['Kontur_raq'] === +value) {
         section = feature
      } else count++
   })

   if(count === sections.getSource().getFeatures().length) {
      console.log('not found')
      alert("Qidirilgan kontur afsuski topilmadi")
      return
   }

   massives.getSource().forEachFeature(feature => {
      if (section.getProperties()['massiv'] === feature.getProperties()['name']) {
         selectedFeatureSearch = feature
      }
   })


   if (sectionsData && globalMassives.getProperties().source.getFeatures().length) {
      const item = sectionsData.find(item => +item.counter_id === +value)
      renderInformation(featuresNames, item, selectedFeatureSearch.getProperties()['name'])

      const view = map.getView();

      if (selectedFeatureSearch) {
         view.fit(selectedFeatureSearch.getGeometry().getExtent(), {
            duration: 500,
         })
         const level = item[featureFieldNames[moduleNumber]]
         section.setStyle(
             selectedStyle(
                 colorInformation[moduleNumber][level - 1],
                 standOutColors[moduleNumber],
                 String(section.getProperties()['Kontur_raq']),
                 chooseTextColor(level)
             )
         );
      }
   }


}
