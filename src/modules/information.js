import {colorInformation, featureFieldNames} from "./renderModules";

export const textInformation = ["Juda Kam", "Kam", "O'rtacha", "Ko'p", "Juda Ko'p"]

export const recommendationText = [
   [
      "30 tonna/ga",
      "25 tonna/ga",
      "20 tonna/ga",
      "10 tonna/ga",
      "5 tonna/ga",
   ],
   [
      "30 tonna/ga",
      "25 tonna/ga",
      "20 tonna/ga",
      "10 tonna/ga",
      "5 tonna/ga",
   ],
   [
      "30 tonna/ga",
      "25 tonna/ga",
      "20 tonna/ga",
      "10 tonna/ga",
      "5 tonna/ga",
   ],
   [
      ["", "", "", "", "", ""],
      ["2,0-2,5 m3", "2,5-3,0 m3", "3,0-3,5 m3","3,5-4,0 m3", "4,0-4,5 m3", "4,5-5,0 m3"],
      ["2,5-3,0 m3", "3,0-3,5 m3","3,5-4,0 m3", "4,0-4,5 m3", "4,5-5,0 m3", "5,0-5,5 m3"],
      ["3,0-3,5 m3","3,5-4,0 m3", "4,0-4,5 m3", "4,5-5,0 m3", "5,0-5,5 m3", "5,5-6,0 m3"],
      ["3,5-4,0 m3", "4,0-4,5 m3", "4,5-5,0 m3", "5,0-5,5 m3", "5,5-6,5 m3", "6,5-7,5 m3"],

   ],
   [
      "30 tonna/ga",
      "25 tonna/ga",
      "20 tonna/ga",
      "10 tonna/ga",
      "5 tonna/ga",
   ],
]

export function renderInformation(modules, item, massive) {
   const wrapper = document.querySelector(".information-wrapper")

   const massiveNameContainer = document.querySelector(".selectedMassivName")
   const sectionId = document.querySelector(".selectedSectionNumber")

   massiveNameContainer.innerHTML = massive

   sectionId.innerHTML = item.counter_id

   wrapper.innerHTML = modules.map((module, index) => {
      const colorIndex = item[featureFieldNames[index]] - 1
      return (
          `<div class="flex capitalize">
              <div>${module}:</div>
              <div class="feature_1 border-2 ${colorIndex === 4 && "text-white"} rounded-md text-[8px] mx-2 flex items-center px-2" 
                    style="background: ${colorInformation[index][colorIndex]}">
                  ${textInformation[item[featureFieldNames[index]] - 1]}
              </div>
          </div>`
      )
   }).join("")

   giveRecommendations(modules, item)
}

function giveRecommendations(modules, item) {
   const wrapper = document.querySelector(".recommendation-wrapper")

   wrapper.innerHTML = modules.map((module, index) => {
      const level = item[featureFieldNames[index]]

      const suggestion = index === 3 ? recommendationText[index][level-1][+item['mex'] - 1] : recommendationText[index][level-1]

      return (
          `<div class="flex gap-3">
              <div class="capitalize text-xs">${module}: <span class="pl-2"> ${suggestion} </span></div>
              <div class="relative xl:my-1 my-0.5 w-1/3 rounded-md border-2 border-black recommendation">
                  <div class="absolute transition-all w-[5px] h-full bg-black" style="left:${20*level - 5}%"></div>
              </div>
          </div>`
      )
   }).join("")
}