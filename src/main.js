import "../styles/style.css";
import { drawMap } from "./map";
import {weather} from "./weather/weather";
import {activateModules} from "./modules";
import {Tab,initTE,Collapse, Modal, Ripple} from "tw-elements";
import {activateMobile} from "./mobile";
import {removeLoader} from "./utils";

const download = document.querySelector("#download");
const error = document.querySelector(".error");


initTE({ Tab, Collapse, Modal, Ripple });

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
