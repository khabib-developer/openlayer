import {service} from "../service";
import {renderModules} from "./renderModules";
import {activateTabs} from "./tab";
import {selectPeriod} from "./period";

export async function activateModules() {
   const modules = await service("/api/modul/module/")

   renderModules(modules)

   activateTabs()

   if(modules.length !== 10)
      throw new Error("Modules must be at least 10")

   selectPeriod()

   return modules
}