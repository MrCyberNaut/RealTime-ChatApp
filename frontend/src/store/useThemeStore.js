//using zustand
import {create }from "zustand";
//creating a hook for the theme store
export const useThemeStore = create((set) => ({ //returns an object which is the state

  //default theme is light
  theme : localStorage.getItem("chat-theme") || "dark", //get the theme from local storage or set it to light,
  //function to toggle the theme,
  //setTheme : (theme) => set({ theme }), //this doesnt access the local storage   , also converting it to a function,
  setTheme : (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
  

}));