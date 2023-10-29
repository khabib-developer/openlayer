

export function activateTabs() {
   const tabNavs = document.querySelectorAll(".tab-nav")

   tabNavs.forEach(function (element, index) {
      element.addEventListener("click", function() {
         tabNavs.forEach(tabNav => hideTabs(tabNav))
         showTabs(tabNavs[index])
      })
   })


   function hideTabs(tabNav) {
      tabNav.classList.remove("bg-[#4267B2]")
      tabNav.classList.remove("text-white")
      tabNav.classList.add("bg-transparent")
      tabNav.classList.add("text-neutral-500")
   }

   function showTabs(tabNav) {
      tabNav.classList.add("bg-[#4267B2]")
      tabNav.classList.add("text-white")
      tabNav.classList.remove("bg-transparent")
      tabNav.classList.remove("text-neutral-500")
   }
}