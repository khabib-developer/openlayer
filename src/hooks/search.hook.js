import {Fill, Stroke, Style, Text} from "ol/style";
import {renderInformation} from "../modules/information";
import {globalMassives, mapExtent, mapZoom, sectionsData} from "../map";
import {
   colorInformation,
   featureFieldNames,
   recommendedColorInformation
} from "../modules/renderModules";
import {chooseTextColor} from "../utils";
import {defaultMassiveStyle, selectedMassiveStyle} from "../map/massives";
import renderColors from "../map/renderColors";

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
      color: [0, 0, 0, 0.5],
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

export function searchSection(e, sections, massives, map, value) {

   let count = 0;

   e.preventDefault();

   if(isNaN(Number(value))) {
      searchMassiveByName(massives, map, value)
      return
   }

   const {moduleNumber, recommendation} = findOutActiveModule()

   setDefaultStyle()

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

   changeSelectedFeaturesStyle(section, map)
}

export function changeSelectedFeaturesStyle(selectedSection, map) {
   const {moduleNumber, recommendation} = findOutActiveModule()

   section = selectedSection

   globalMassives.getSource().forEachFeature(feature => {
      if (section.getProperties()['massiv'] === feature.getProperties()['name']) {
         selectedFeatureSearch = feature
      }
   })

   if (renderColors.data && globalMassives.getProperties().source.getFeatures().length) {
      const item = renderColors.data.find(item => +item.counter_id === +section.getProperties()['Kontur_raq'])

      renderInformation(item, selectedFeatureSearch.getProperties()['name'], section.getProperties()['g'])

      const view = map.getView();

      if (selectedFeatureSearch) {
         view.fit(section.getGeometry().getExtent(), {
            duration: 500,
            maxZoom: 15
         })
         const level = item[featureFieldNames[moduleNumber]]


         section.setStyle(
             selectedStyle(
                 recommendation ? [...recommendedColorInformation[moduleNumber]].reverse()[level - 1] : colorInformation[moduleNumber][level - 1],
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

export function searchMassiveByName(massiveItems, map, value) {
   let count = 0

   const {recommendation, moduleNumber} = findOutActiveModule()

   setDefaultStyle()

   const view = map.getView();

   massiveItems.getSource().forEachFeature(feature => {
      if(feature.getProperties()['name'].toLowerCase() === value.toLowerCase()) {
         selectedFeatureSearch = feature
         view.fit(feature.getGeometry().getExtent(), {
            duration: 500,
            maxZoom: 15
         })
         feature.setStyle(
             selectedMassiveStyle(
                 feature.getProperties()["name"],
                 !recommendation?standOutColors[moduleNumber]:recommendationStandoutColor
             ),
         )
      } else count++
   })

   if(count === massiveItems.getSource().getFeatures().length) {
      alert("Qidirilgan massiv afsuski topilmadi")
   }
}

export function setDefaultStyle() {
   const {moduleNumber, recommendation} = findOutActiveModule()

   if(selectedFeatureSearch) selectedFeatureSearch.setStyle(function (feature) {
      return defaultMassiveStyle(feature.getProperties()["name"])
   })
   if(section) {
      section.setStyle(function (feature) {
         const item = renderColors.data.find(item => +item.counter_id === +feature.getProperties()['Kontur_raq'])
         const level = item[featureFieldNames[moduleNumber]]
         return defaultStyle(
             recommendation ? [...recommendedColorInformation[moduleNumber]].reverse()[level - 1] : colorInformation[moduleNumber][level - 1],
             String(feature.getProperties()['Kontur_raq']),
             chooseTextColor(moduleNumber, recommendation)
         );
      });
   }
}

export function clearInput(map, input = null) {

   setDefaultStyle()

   if(input) input.value = ""

   const view = map.getView();

   view.fit(mapExtent, {duration: 500, maxZoom: mapZoom + 4})
}