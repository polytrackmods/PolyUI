import { PolyMod, MixinType } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";

class puiMod extends PolyMod {
  PUIRoot = function(div, children) {
    children.forEach((child) => div.appendChild(child));
  }
  applyStyles = function(element, styles = {}) {
    if (!styles) return;
    for (const [key, value] of Object.entries(styles)) {
      element.style[key] = value;
    }
  }
  Column = function(children, styles) {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.gap = "10px";
    this.applyStyles(div, styles);
    children.forEach((child) => div.appendChild(child));
    return div;
  }
  Row = function(children, styles) {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.gap = "10px";
    this.applyStyles(div, styles);
    children.forEach((child) => div.appendChild(child));
    return div;
  }
  
  Button = function(label, onClick, styles) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = onClick;
    this.applyStyles(btn, styles);
    return btn;
  }
  
  Text = function(content, styles) {
    const p = document.createElement("p");
    p.textContent = content;
    this.applyStyles(p, styles);
    return p;
  }
}

export let polyMod = new puiMod();
