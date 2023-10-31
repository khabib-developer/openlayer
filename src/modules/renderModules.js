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
      "rgb(255,255,0)",
      "rgb(204,255,153)",
      "rgb(255,255,255)",
      "rgb(0,255,0)",
      "rgb(102,153,0)",
   ],
]

export const recommendedColorInformation = [
   [
      "#806000",
      "#bf8f02",
      "#ffd966",
      "#ffd966",
      "#ffd966",
   ],
   [
      "#385623",
      "#548135",
      "#a8d08d",
      "#c6e0b3",
      "#e2f0d9",
   ],
   [
      "#385623",
      "#548135",
      "#a8d08d",
      "#c6e0b3",
      "#e2f0d9",
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
      "#806000",
      "#bf8f02",
      "#ffd966",
      "#ffd966",
      "#ffd966",
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
      "30 Tonna/ga",
      "25 Tonna/ga",
      "20 Tonna/ga",
      "10 Tonna/ga",
      "5 Tonna/ga",
   ],
   [
      "G'o'za: 7,4 kg/ga - Bug'doy: 4.6 kg/ga",
      "G'o'za: 5,7 kg/ga - Bug'doy: 3.6 kg/ga",
      "G'o'za: 4,1 kg/ga - Bug'doy: 2.6 kg/ga",
      "G'o'za: 2,5 kg/ga - Bug'doy: 1.5 kg/ga",
      "G'o'za: 0,0 kg/ga - Bug'doy: 0.0 kg/ga",
   ],
   [
      "G'o'za: 2,11 kg/ga - Bug'doy: 1.08 kg/ga",
      "G'o'za: 1,67 kg/ga - Bug'doy: 0.79 kg/ga",
      "G'o'za: 1,25 kg/ga - Bug'doy: 0.52 kg/ga",
      "G'o'za: 0,83 kg/ga - Bug'doy: 0.39 kg/ga",
      "G'o'za: 0,42 kg/ga - Bug'doy: 0.26 kg/ga",
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
       modules
   )
}

function renderFeatures(modulesArray, wrapper, wrapper2, modules) {

   wrapper.innerHTML = renderItem(modulesArray, 4, 5, true)

   wrapper2.innerHTML = renderItem(activeRecommendationModules, 14, 15)

   function renderItem(array, id1, id2, feature = false) {
      return array.map(function(module, index) {
         return (`
            <div class="radiobtn text-sm ${(module.id === id1 || module.id === id2) ? 'mx-2':'mx-8'}">
               <input type="radio" ${+module.id===modulesArray[0].id&&feature&&'checked'} id="${module.name}" name="module" value="${module.id}" />
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
               const index = globalModules.filter(module => module.is_recommendation).findIndex(module => module.id === recommendationModule.id)
               const featureModule = globalModules.filter(module => module.is_feature)[index]
               value = featureModule.id
               renderColors.changeFeaturesColorsWithRecommendedColors(value)
            } else renderColors.changeFeaturesColors(value)
            changeColor(value, colorInformation)
            changeText(value, recommendationModule.is_recommendation?levelTextRecommendation:levelTextInformation, recommendationModule.is_recommendation)
            if(globalMap) clearInput(globalMap)
         }
      })
   })
   function changeColor(value, obj) {
      obj[value-1].forEach(function(color, index) {
         const el = document.querySelector(`.color-information .level_${index+1}`)
         if(el) el.style.backgroundColor = color
      })
   }
   function changeText(value, obj, recommendation) {
      obj[value - 1].forEach(function(text, index) {
         const el = document.querySelectorAll(`.text_level_${index+1} span`)
         if(recommendation) {
            el[0].innerText = levelTextInformation[0][index]
            el[1].innerText = text
         } else {
            el[0].innerText = text
            el[1].innerText = ''
         }
         el.innerHTML = text
      })
   }
}
