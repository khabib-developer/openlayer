import {service} from "../service";
import {renderModules} from "./renderModules";
import {activateTabs} from "./tab";
import {selectPeriod} from "./period";

export async function activateModules() {
   const modules = await service("/api/modul/module/")

   renderModules(modules)

   activateTabs()

   selectPeriod()

   return modules
}