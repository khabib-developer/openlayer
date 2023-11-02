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
      "<div class='flex-1'> 88 kg/ga </div><div class='flex-1'> 106 kg/ga</div>",
      "<div class='flex-1'>  144 kg/ga </div><div class='flex-1'> 182 kg/ga</div>",
      "<div class='flex-1'>  200 kg/ga </div> <div class='flex-1'> 252 kg/ga </div>",
      "<div class='flex-1'> 259 kg/ga </div><div class='flex-1'> 322 kg/ga </div>",

   ],
   [
      "<div class='flex-1'> 15 kg/ga </div><div class='flex-1'> 18 kg/ga </div>",
      "<div class='flex-1'> 29 kg/ga </div> <div class='flex-1'> 28 kg/ga </div>",
      "<div class='flex-1'>44 kg/ga </div><div class='flex-1'> 36 kg/ga </div>",
      "<div class='flex-1'> 59 kg/ga </div><div class='flex-1'> 56 kg/ga </div>",
      "<div class='flex-1'>74 kg/ga </div><div class='flex-1'> 76 kg/ga </div>",
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
       modules
   )
}

function renderFeatures(modulesArray, wrapper, wrapper2) {

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
               renderColors.changeFeaturesColorsWithRecommendedColors(value - 1)
               changeColor(value, recommendedColorInformation)
            } else {
               changeColor(value, colorInformation)
               renderColors.changeFeaturesColors(value)
            }
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
         const el = document.querySelector(`.text_level_${index+1}`)
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
}
