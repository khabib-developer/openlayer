
export async function delay(time) {
   return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), time)
   })
}

export function chooseTextColor(value, recommendation = false) {
   if(value === 5 || recommendation) return 'rgba(255,255,255,1)'
   return 'rgba(0,0,0,1)'
}