import renderColors from "../map/renderColors";
import {findOutActiveModule} from "../hooks/search.hook";


export function selectPeriod() {
   const inputs = document.querySelectorAll("input[name='monitor']")
   inputs.forEach(input => {
      input.addEventListener("click",async  event => {
         const {moduleNumber, recommendation} = findOutActiveModule()
         await renderColors.changeData(moduleNumber, `?monitor=${event.target.value}`, recommendation)
      })
   })
}