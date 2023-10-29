import renderColors from "../map/renderColors";

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

export const recommendationsButtons = ["Mahalliy o'g'itlar", "Fosforli o'g'itlar", "Kaliyli o'g'itlar", "Sho'r yuvish"]

export let featuresNames = null;

export let activeFeaturesNames = null

export const featureFieldNames = ["gumus", "fosfor", "kaliy", "shorlanish", "namlik"]

export function renderModules(modules) {
   const featuresWrapper = document.querySelector(".features")
   const recommendationWrapper = document.querySelector(".recommendationWrapper")
   const recommendationLink = document.querySelector("a.tab-nav-0[href='#recommendation']")
   const searchModule = document.querySelector(".search")
   const monitor = document.querySelector(".monitor")
   const weather = document.querySelector(".weather")
   const suggestions = document.querySelector(".suggestion")

   !modules[5].status&&monitor.classList.add("hidden")

   !modules[6].status&&weather.classList.add("hidden")

   !modules[7].status&&searchModule.classList.add("hidden")

   if(!modules[8].status) {
      recommendationLink.classList.add('hidden')
      suggestions.classList.add("hidden")
   }

   activeFeaturesNames = modules.filter((module, i) => module.status && i < 5)

   featuresNames = activeFeaturesNames.map(module => module.name)

   renderFeatures(
       activeFeaturesNames,
       featuresWrapper,
       recommendationWrapper,
       modules
   )
}

function renderFeatures(modulesArray, wrapper, wrapper2, modules) {

   wrapper.innerHTML = modulesArray.map(function(module, index) {
      return (`
         <div class="radiobtn text-sm">
            <input type="radio" ${+module.id===modulesArray[0].id&&'checked'} id="${module.name}" name="module" value="${module.id}" />
            <label class="" for="${module.name}">${module.name}</label>
         </div>
      `)
   }).join("")

   wrapper2.innerHTML = recommendationsButtons.map(function(text, index) {

      if(modules[index].status)
         return (`
            <div class="radiobtn text-sm">
               <input type="radio" id="${text}" name="module" value="${text}" />
               <label class="" for="${text}">${text}</label>
            </div>
         `)
   }).join("")

   handleClickModules()
}

function handleClickModules() {
   document.querySelectorAll("input[name='module']").forEach(function(element) {
      element.addEventListener("change", event => {
         const value = event.target.value;
         if(isNaN(Number(value))) {
            renderColors.changeFeaturesColorsWithRecommendedColors(recommendationsButtons.findIndex(item => item === value))
            return
         }
         changeColor(value)
         renderColors.changeFeaturesColors(value)
      })
   })
   function changeColor(value) {
      colorInformation[value-1].forEach(function(color, index) {
         document.querySelector(`.color-information .level_${index+1}`).style.backgroundColor = color
      })
   }
}
