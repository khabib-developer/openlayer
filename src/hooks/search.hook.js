import {Fill, Stroke, Style, Text} from "ol/style";
import {renderInformation} from "../modules/information";
import {globalMassives, sectionsData} from "../map";
import {
   colorInformation,
   featureFieldNames,
   featuresNames,
   recommendedColorInformation
} from "../modules/renderModules";
import {chooseTextColor} from "../utils";
import {defaultMassiveStyle, selectedMassiveStyle} from "../map/massives";


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

const recommendationStandoutColor = '#FFFB01'

let selectedFeatureSearch = null
let section = null

export function findOutActiveModule() {
   const modules = document.querySelectorAll("input[name='module']")
   let moduleNumber = 0

   modules.forEach((module, i) => {
      if (module.checked) moduleNumber = i
   })

   const recommendation = moduleNumber > 4

   moduleNumber = recommendation ? moduleNumber - 5 : moduleNumber

   return {recommendation, moduleNumber}
}

export function searchSection(e, sections, massives, map, value, source, baseLayer) {

   let count = 0;

   e.preventDefault();

   const {moduleNumber, recommendation} = findOutActiveModule()

   if (selectedFeatureSearch && section) {
      section.setStyle(function (feature) {
         const item = sectionsData.find(item => +item.counter_id === +feature.getProperties()['Kontur_raq'])

         const level = item[featureFieldNames[moduleNumber]]
         return defaultStyle(
             recommendation ? recommendedColorInformation[moduleNumber][level - 1] : colorInformation[moduleNumber][level - 1],
             String(feature.getProperties()['Kontur_raq']),
             chooseTextColor(value, recommendation)
         );
      });
      selectedFeatureSearch.setStyle(function (feature) {
         return defaultMassiveStyle(feature.getProperties()["name"])
      })
   }

   sections.getSource().forEachFeature(feature => {
      if (+feature.getProperties()['Kontur_raq'] === +value) {
         section = feature
      } else count++
   })

   if (count === sections.getSource().getFeatures().length) {
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
                 recommendation ? recommendedColorInformation[moduleNumber][level - 1] : colorInformation[moduleNumber][level - 1],
                 !recommendation?standOutColors[moduleNumber]:recommendationStandoutColor,
                 String(section.getProperties()['Kontur_raq']),
                 chooseTextColor(level, recommendation)
             )
         );
         selectedFeatureSearch.setStyle(
             selectedMassiveStyle(
                 selectedFeatureSearch.getProperties()["name"],
                 !recommendation?standOutColors[moduleNumber]:recommendationStandoutColor
             ),
         )
      }
   }


}
