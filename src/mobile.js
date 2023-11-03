
export function activateMobile() {
   const sideBars = document.querySelectorAll(".sidebar")

   const showFirstSideBar = document.querySelector(".firstSideBarShow")

   const firstSideBarCloseBtn = document.querySelector(".firstSideBarCloseBtn")

   const secondSideBarBtn = document.querySelectorAll(".toggleSecondSideBar")

   const additionalInfo = document.querySelector(".additional_info")

   secondSideBarBtn.forEach(function (element, index) {
      element.addEventListener("click", function (event) {
         toggleBtn()
         if(sideBars[1].classList.contains("active")) hideSideBar(1)
         else showSideBar(1, 0)
      })
   })

   showFirstSideBar.addEventListener("click", () => {
      changeSecondSideBarBtn()
      showSideBar(0, 1)
   })
   firstSideBarCloseBtn.addEventListener("click", () => hideSideBar(0))

   additionalInfo.addEventListener("click", () => hideSideBar(1))

   function toggleBtn() {
      secondSideBarBtn.forEach(element => element.classList.toggle("hidden"))
   }

   function showSideBar(x, y) {
      sideBars[x].classList.add("active")
      sideBars[y].classList.remove("active")
   }

   function hideSideBar(i) {
      changeSecondSideBarBtn()
      sideBars[i].classList.remove("active")
   }

   function changeSecondSideBarBtn() {
      secondSideBarBtn[0].classList.remove("hidden")
      secondSideBarBtn[1].classList.add("hidden")

   }


}
