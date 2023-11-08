import renderColors from "../map/renderColors";
import {clearInput} from "../hooks/search.hook";
import {globalMap} from "../map";

export const colorInformation = [
    [
       "rgb(255,255,0)",
       "rgb(204,255,153)",
       "#9aff65",
       "rgb(0,255,0)",
       "rgb(102,153,0)",
    ],
   [
      "rgb(163,255,115)",
      "rgb(217,235,242)",
      "rgb(190,232,255)",
      "rgb(0,197,255)",
      "rgb(0,102,255)",
   ],
   [
      "rgb(255,255,0)",
      "rgb(255,220,185)",
      "rgb(255,192,0)",
      "rgb(192,142,0)",
      "rgb(0,102,255)",
   ],
   [
      "#00FF00",
      "#ffffcc",
      "#FFC000",
      "#FE7676",
      "#CC00CC",
   ],
   [
      "#d9e2f3",
      "#b4c6e7",
      "#8eaadb",
      "#4976c7",
      "#2f5496",
   ],
]

export const recommendedColorInformation = [
   [
      "#fff2cc",
      "#ffe599",
      "#ffd966",
      "#bf8f02",
      "#806000",
   ],
   [

      "#e2f0d9",
      "#c6e0b3",
      "#a8d08d",
      "#548135",
      "#385623",
   ],
   [
      "#e2f0d9",
      "#c6e0b3",
      "#a8d08d",
      "#548135",
      "#385623",
   ],
   [
      "#d9e2f3",
      "#b4c6e7",
      "#8eaadb",
      "#4976c7",
      "#2f5496",
      "#1f3864",
   ],
   [
      "#fff2cc",
      "#ffe599",
      "#ffd966",
      "#bf8f02",
      "#806000",
   ],
]

export const levelTextInformation = [
    [
        "Juda Kam",
        "Kam",
        "O'rtacha",
        "Ko'p",
        "Juda Ko'p",
    ],
   [
      "Juda Kam",
      "Kam",
      "O'rtacha",
      "Ko'p",
      "Juda Ko'p",
   ],
   [
      "Juda Kam",
      "Kam",
      "O'rtacha",
      "Ko'p",
      "Juda Ko'p",
   ],
   [
      "Sho'rlanmagan",
      "Kuchsiz sho'rlangan",
      "O'rtacha sho'rlangan",
      "Kuchli sho'rlangan",
      "Juda kuchli sho'rlangan",
   ],
   [
      "Juda Kam",
      "Kam",
      "O'rtacha",
      "Ko'p",
      "Juda Ko'p",
   ]
]

export const levelTextRecommendation = [
   [
      "5 Tonna/ga",
      "10 Tonna/ga",
      "20 Tonna/ga",
      "25 Tonna/ga",
      "30 Tonna/ga",
   ],
   [
      "<div class='flex-1'> 0 kg/ga </div><div class='flex-1'> 0 kg/ga</div>",
      "<div class='flex-1'> 191 kg/ga </div><div class='flex-1'> 230 kg/ga</div>",
      "<div class='flex-1'>  312 kg/ga </div><div class='flex-1'> 395 kg/ga</div>",
      "<div class='flex-1'>  434 kg/ga </div> <div class='flex-1'> 547 kg/ga </div>",
      "<div class='flex-1'> 562 kg/ga </div><div class='flex-1'> 699 kg/ga </div>",

   ],
   [
      "<div class='flex-1'> 25 kg/ga </div><div class='flex-1'> 30 kg/ga </div>",
      "<div class='flex-1'> 42 kg/ga </div> <div class='flex-1'> 46 kg/ga </div>",
      "<div class='flex-1'>73 kg/ga </div><div class='flex-1'> 60 kg/ga </div>",
      "<div class='flex-1'> 98 kg/ga </div><div class='flex-1'> 93 kg/ga </div>",
      "<div class='flex-1'>123 kg/ga </div><div class='flex-1'> 126 kg/ga </div>",
   ],
   [
      "",
      "",
      "",
      "",
      "",
   ],
   [
      "",
      "",
      "",
      "",
      "",
   ]
]

export let features = null;

export let activeFeaturesNames = null;

export let activeRecommendationModules = null;

export const featureFieldNames = ["gumus", "fosfor", "kaliy", "shorlanish", "namlik"]

let globalModules = null;

const tableTitle = document.querySelector(".table-title")

export function renderModules(modules) {
   const featuresWrapper = document.querySelector(".features")
   const recommendationWrapper = document.querySelector(".recommendationWrapper")
   const recommendationLink = document.querySelector("a.tab-nav-0[href='#recommendation']")
   const searchModule = document.querySelector(".search")
   const monitor = document.querySelector(".monitor")
   const weather = document.querySelector(".weather")
   const suggestions = document.querySelector(".suggestion")

   globalModules = modules
   !modules[5].status&&monitor.classList.add("hidden")

   !modules[6].status&&weather.classList.add("hidden")

   !modules[7].status&&searchModule.classList.add("hidden")

   if(!modules[8].status) {
      recommendationLink.classList.add('hidden')
      suggestions.classList.add("hidden")
   }

   activeFeaturesNames = modules.filter((module, i) => module.status && module.is_feature)

   activeRecommendationModules = modules.filter((module, i) => module.status && module.is_recommendation)

   features = activeFeaturesNames.map(module => module.name)

   renderFeatures(
       activeFeaturesNames,
       featuresWrapper,
       recommendationWrapper,
   )
}

function renderFeatures(modulesArray, wrapper, wrapper2) {

   if(!activeFeaturesNames.length && !activeRecommendationModules.length) return

   const {activeModuleId, recommendation} = firstItemOfActiveModule()

   if(modulesArray.length) {
      wrapper.innerHTML = renderItem(modulesArray, 4, 5, true)
   }

   if(activeRecommendationModules && activeRecommendationModules.length) {
      wrapper2.innerHTML = renderItem(activeRecommendationModules, 14, 15)
   }

   const value = findOutColorInformationIndex(recommendation, activeModuleId)

   if(recommendation) {
      changeColor(value , recommendedColorInformation, true)
      changeText(value, levelTextRecommendation, true)
   } else {
      changeColor(value, colorInformation)
      changeText(value, levelTextInformation, false)
   }

   function renderItem(array, id1, id2, feature = false) {
      return array.map(function(module, index) {
         return (`
            <div class="radiobtn text-sm ${(module.id === id1 || module.id === id2) ? 'mx-2':'mx-8'}">
               <input type="radio" ${+module.id===+activeModuleId&&'checked'} id="${module.name}" name="module" value="${module.id}" />
               <label class="" for="${module.name}">${module.name}</label>
            </div>
         `)
      }).join("")
   }

   handleClickModules()
}

function handleClickModules() {
   document.querySelectorAll("input[name='module']").forEach(function(element) {
      element.addEventListener("change", event => {
         let value = event.target.value;
         if(globalModules) {
            const recommendationModule = globalModules.find(module => +module.id === +value)
            if(recommendationModule.is_recommendation) {
               value = findOutColorInformationIndex(true, value) - 1
               renderColors.changeFeaturesColorsWithRecommendedColors(value)
               changeColor(value + 1, recommendedColorInformation, true)
               changeText(value + 1, levelTextRecommendation, true)
            } else {
               renderColors.changeFeaturesColors(value)
               changeColor(value, colorInformation)
               changeText(value, levelTextInformation, false)
            }
            if(globalMap) clearInput(globalMap)
         }
      })
   })

}

function changeColor(value, obj, recommendation = false) {
   obj[value-1].forEach(function(color, index) {
      const levelIndex = recommendation ? 6 - (index+1) : index+1
      const el = document.querySelector(`.color-information .level_${levelIndex}`)
      if(el) el.style.backgroundColor = color
   })
}

function changeText(value, obj, recommendation) {
   obj[value - 1].forEach(function(text, index) {
      const levelIndex = recommendation ? 6 - (index+1) : index+1
      const el = document.querySelector(`.text_level_${levelIndex}`)
      if(recommendation) {
         if(value === 2 || value === 3) {
            tableTitle.classList.remove("hidden")
         } else tableTitle.classList.add("hidden")
         el.innerHTML = `<div class="flex-1">${levelTextInformation[0][index]}</div>${text}`
      } else {
         tableTitle.classList.add("hidden")
         el.innerText = text
      }
   })
}

export function findOutColorInformationIndex(recommendation, value) {
   if(recommendation) {
      const recommendationModule = globalModules.find(module => +module.id === +value)
      const index = globalModules.filter(module => module.is_recommendation).findIndex(module => module.id === recommendationModule.id)
      const featureModule = globalModules.filter(module => module.is_feature)[index]
      return featureModule.id
   }
   return +value
}

export function firstItemOfActiveModule() {
   const recommendation = !Boolean(activeFeaturesNames.length)
   const activeModuleId = (!recommendation ?
       activeFeaturesNames : activeRecommendationModules)
       [0].id

   return {activeModuleId, recommendation}
}