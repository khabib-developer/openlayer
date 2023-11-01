import renderColors from "../map/renderColors";
import {clearInput, findOutActiveModule} from "../hooks/search.hook";
import {globalMap} from "../map";

export let months =["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"]

export const seasons = ["Qish", "Bahor", "Yoz", "Kuz"]

const date = new Date()

export function selectPeriod() {

   renderInputs()

   const inputs = document.querySelectorAll("input[name='monitor']")
   inputs.forEach(input => {
      input.addEventListener("click", async  event => {
         const {moduleNumber, recommendation} = findOutActiveModule()
         const name = event.target.getAttribute("id").split("_")[0]
         if(globalMap) clearInput(globalMap)
         await renderColors.changeData(moduleNumber, `?${name}=${event.target.value}`, recommendation)
      })
   })
}

export function renderInputs() {
   const monthWrapper = document.querySelector(".monthWrapper")
   const seasonWrapper = document.querySelector(".seasonWrapper")
   const yearWrapper = document.querySelector(".yearWrapper")

   monthWrapper.innerHTML = renderMonths()
   seasonWrapper.innerHTML = renderSeasons()
   yearWrapper.innerHTML = renderYears()
}

function renderMonths() {
   const currentMonth = date.getMonth()
   const currentYear = date.getFullYear()
   let modifiedMonths = months.map((month, i) => ({id: i + 1, name: month, year:currentYear - 1}))
   modifiedMonths = [...modifiedMonths.slice(currentMonth), ...modifiedMonths.slice(0, currentMonth).map(month => ({...month, year: currentYear})) ]
   return modifiedMonths.map((month, i) => renderInput(`month_${i}`, `${month.name} - ${month.year}`, month.id)).join("")
}

function renderSeasons() {
   let indexes = [1,3,6,9]
   const currentMonth = date.getMonth()
   const currentYear = date.getFullYear()
   const index = Math.floor(currentMonth / 3) % 4
   let modifiedSeasons = seasons.map((season, i) => ({id: i, name: season, year: currentYear }))
   indexes = [
      ...indexes.slice(index),
      ...indexes.slice(0, index),
   ]
   modifiedSeasons = [
      ...modifiedSeasons.slice(index).map(season => ({...season, year: currentYear - 1})),
      ...modifiedSeasons.slice(0, index),
   ]
   return modifiedSeasons.map((season, i) => renderInput(`quarter_${i}`, `${season.name} - ${season.year}`, indexes[i])).join("")
}

function renderYears() {
   const currentYear = new Date().getFullYear()
   const years = []
   for (let i = 2023; i <= currentYear; i++) {
      years.push(i)
   }
   return years.map((season, i) => renderInput(`years_${i}`, season, +season)).join("")
}


function renderInput(id, name, value) {
   return  `
      <div class="radiobtn text-sm">
           <input type="radio" id="${id}" name="monitor" value="${value}"/>
           <label for="${id}">${name}</label>
       </div>
   `
}

