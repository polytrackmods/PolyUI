import { PolyMod, MixinType } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";

class puiMod extends PolyMod {
  const menuButtons = [];
  
  
  const addMenuButton = function(image_path, text, onClick, order=null) {
      const button = document.createElement("button");
      button.className = "button button-image";
      button.innerHTML = `<img src="${image_path}">`;
  
  
      const w = document.createElement("p");
      w.textContent = text;
      button.appendChild(w);
  
      registerElement("mnu", button, onClick, order);
  };
  
  const registerElement = function(id, element, onClick, extras=null) {
      menuButtons.push([id, element, onClick, extras])
      console.log(menuButtons);
  };
  
  init = function(polyModLoader) {};
}


export let polyMod = new puiMod();
