import {service} from "../service";


export async function activateModules() {
   const modules = await service("/api/modul/module/")
   console.log(modules)
}