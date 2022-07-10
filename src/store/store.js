import { createStore } from "vuex";
import { setModule } from "./modules/setModule";
import { elevatorsModule } from "./modules/elevatorsModule";
export default createStore({
  modules: {
    setModule,
    elevatorsModule
  }
})