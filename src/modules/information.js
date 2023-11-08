import {
   activeFeaturesNames,
   activeRecommendationModules,
   colorInformation,
   featureFieldNames,
   levelTextRecommendation,
} from "./renderModules";

export const textInformation = ["Juda Kam", "Kam", "O'rtacha", "Ko'p", "Juda Ko'p"]

export const recommendationText = [
   [
      "30",
      "25",
      "20",
      "10",
      "5",
   ],
   [
       ...levelTextRecommendation[1]
   ],
   [
      ...levelTextRecommendation[2]
   ],
   [
      ["", "", "", "", "", ""],
      ["2,0-2,5 m<sup>3</sup>", "2,5-3,0 m<sup>3</sup>", "3,0-3,5 m<sup>3</sup>", "3,5-4,0 m<sup>3</sup>", "4,0-4,5 m<sup>3</sup>", "4,5-5,0 m<sup>3</sup>"],
      ["2,5-3,0 m<sup>3</sup>", "3,0-3,5 m<sup>3</sup>", "3,5-4,0 m<sup>3</sup>", "4,0-4,5 m<sup>3</sup>", "4,5-5,0 m<sup>3</sup>", "5,0-5,5 m<sup>3</sup>"],
      ["3,0-3,5 m<sup>3</sup>", "3,5-4,0 m<sup>3</sup>", "4,0-4,5 m<sup>3</sup>", "4,5-5,0 m<sup>3</sup>", "5,0-5,5 m<sup>3</sup>", "5,5-6,0 m<sup>3</sup>"],
      ["3,5-4,0 m<sup>3</sup>", "4,0-4,5 m<sup>3</sup>", "4,5-5,0 m<sup>3</sup>", "5,0-5,5 m<sup>3</sup>", "5,5-6,5 m<sup>3</sup>", "6,5-7,5 m<sup>3</sup>"],

   ],
   [
      "30",
      "25",
      "20",
      "10",
      "5",
   ],
]

export function renderInformation(item, massive, area) {
   const wrapper = document.querySelector(".information-wrapper")

   const massiveNameContainer = document.querySelector(".selectedMassivName")
   const sectionId = document.querySelector(".selectedSectionNumber")

   massiveNameContainer.innerHTML = massive

   sectionId.innerHTML = item.counter_id

   wrapper.innerHTML = activeFeaturesNames.map((module, index) => {
      const colorIndex = item[featureFieldNames[index]] - 1
      return (
          `<div class="flex capitalize justify-between">
              <div>${module.name}:</div>
              <div class="feature_1 border-2 ${colorIndex === 4 && "text-white"} rounded-md text-[8px] mx-2 flex items-center px-2" 
                    style="background: ${colorInformation[index][colorIndex]}">
                  ${textInformation[colorIndex]}
              </div>
          </div>`
      )
   }).join("")

   giveRecommendations(item, area)
}

function giveRecommendations(item, area) {
   const wrapper = document.querySelector(".recommendation-wrapper")

   const left = [95, 73, 48, 23, 0]

   wrapper.innerHTML = activeRecommendationModules.map((module, index) => {
      const level = item[featureFieldNames[index]]

      let suggestion = index === 3 ? recommendationText[index][level - 1][+item['mex'] - 1] : recommendationText[index][level - 1]


      if (index === 0) {
         suggestion = Math.floor(+suggestion * +area) + " t"
      } else if(index === 1 || index === 2) {

         suggestion = suggestion.replace(/\d+/g, function (match) {
            return (Math.floor(parseInt(match, 10) * +area)).toString();
         })

      }
      else if (index === 3) {
         const txtArray = suggestion.split("-").
                           map(el => el.slice(0, 3)).
                           map(el => el.replace(",", ".")).
                           map(el => Number(el))

         const text = `${Math.floor(txtArray[0] * +area)} - ${Math.floor(txtArray[1] * +area)}`
         suggestion = text + suggestion.slice(7)
      }


      return (
          `<div class="flex justify-between">
              <div class="capitalize w-1/4 md:text-xs text-sm">${module.name}: </div>
              <div class="lowercase flex-1 ${(index===1 || index === 2) && 'flex'} text-center justify-between text-xs"> ${suggestion} </div>
              <div class="relative ml-2 w-1/5 xl:my-1 my-0.5 rounded-md h-[8px] border-2 border-black recommendation">
                  <div class="absolute transition-all w-[5px] h-full  bg-black" style="left:${left[level - 1]}%; width: 5%"></div>
              </div>
          </div>`
      )
   }).join("")
}