import { PolyMod } from "http://cdn.jsdelivr.net/gh/0rangy/PolyModLoader@0.5.0-beta5/PolyModLoader.js";

class puiMod extends PolyMod {
  createButton = function(class_name, image_src, text) {
    const button = document.createElement("button");
    button.className = class_name;
    button.innerHTML = `<img class="button-icon" src=${image_src}>`;
    button.append(document.createTextNode(text));
    return button;
  };

  pui_createDiv = function(class_name) {
    const div = document.createElement("div");
    div.className = class_name;
    return div;
  };

  pui_insertCSS = function(cssText) {
    const style = document.createElement("style");
    style.textContent = cssText;
    document.head.appendChild(style);
  };

  init = function(polyModLoader) {};
}


export let polyMod = new puiMod();
