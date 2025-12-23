import type { Middleware } from "@reduxjs/toolkit";
import { saveKanbanData } from "../utils/saveToLocalStorage";

export const localStorageMiddleware : Middleware = function(storeAPI) {
  return function wrapperDipatch(next) {
    return function handleAction(action) {
      const result = next(action);
      console.log('result', result)
      const data = storeAPI.getState();
      saveKanbanData(data);
      return result;
    };
  };
}
