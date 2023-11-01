
export async function delay(time) {
   return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), time)
   })
}

export function chooseTextColor(value, recommendation = false) {
   if(value === 5 || recommendation) return 'rgba(255,255,255,1)'
   return 'rgba(0,0,0,1)'
}

export function removeLoader() {
   const loader = document.querySelector(".loader");
   loader.classList.remove("!opacity-50");
   loader.classList.add("!opacity-0");
   loader.classList.add("-z-10");
}

export function showLoader() {
   const loader = document.querySelector(".loader");
   loader.classList.add("!opacity-50");
   loader.classList.remove("!opacity-0");
   loader.classList.remove("-z-10");
}

