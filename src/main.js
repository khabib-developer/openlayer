import "../styles/style.css";
import { drawMap } from "./map";
import {weather} from "./weather/weather";
import {activateModules} from "./modules";
import {Tab,initTE,Collapse} from "tw-elements";
import {activateMobile} from "./mobile";

const download = document.querySelector("#download");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

initTE({ Tab, Collapse });

function removeLoader() {
  loader.classList.add("opacity-0");
  loader.classList.add("-z-10");
}

function errorMessage() {
  error.classList.remove("hidden")
}

(async function () {
  try {

    activateMobile()
    const modules = await activateModules();

    if(modules[6].status) await weather();

    await drawMap( download, modules[9].status);
  } catch (e) {
    console.log(e);
    errorMessage()
  } finally {
    removeLoader();
  }
})();
