import renderColors from "../map/renderColors";

export const colorInformation = [
    [
       "rgb(255,255,0)",
       "rgb(204,255,153)",
       "rgb(255,255,255)",
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

export let featuresNames = null;

export const featureFieldNames = ["gumus", "fosfor", "kaliy", "shorlanish", "namlik"]

export function renderModules(modules) {
   const featuresWrapper = document.querySelector(".features")
   const searchModule = document.querySelector(".search")
   const monitor = document.querySelector(".monitor")
   const weather = document.querySelector(".weather")
   const suggestions = document.querySelector(".suggestions")

   !modules[5].status&&monitor.classList.add("hidden")

   !modules[6].status&&weather.classList.add("hidden")

   !modules[7].status&&searchModule.classList.add("hidden")

   !modules[8].status&&suggestions.classList.add("hidden")

   featuresNames = modules.filter((module, i) => module.status && i < 5).map(module => module.name)

   renderFeatures(modules.filter((module, i) => module.status && i < 5), featuresWrapper)
}

function renderFeatures(modules, wrapper) {

   wrapper.innerHTML = modules.map(function(module, index) {
      return (`
         <div class="radiobtn text-sm">
            <input type="radio" ${+module.id===1&&'checked'} id="${module.name}" name="module" value="${module.id}" />
            <label class="" for="${module.name}">${module.name}</label>
         </div>
      `)
   }).join("")

   handleClickModules()

}

function handleClickModules() {
   document.querySelectorAll("input[name='module']").forEach(function(element) {
      element.addEventListener("change", event => {
         const value = event.target.value;
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
