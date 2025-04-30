import { PolyMod, MixinType } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";

class puiMod extends PolyMod {
  const createButton = function(class_name, image_src, text) {
      const button = document.createElement("button");
      button.className = class_name;
      button.innerHTML = `<img class="button-icon" src=${image_src}>`;
      button.append(document.createTextNode(text));
      return button;
  };
  
  const createDiv = function(class_name) {
      const div = document.createElement("div");
      div.className = class_name;
      return div;
  };
  
  const insertCSS = function(cssText) {
      const style = document.createElement("style");
      style.textContent = cssText;
      document.head.appendChild(style);
  };
  
  const removeElement = function(className){
      const elements = document.getElementsByClassName(className);
      while(elements.length > 0){
          elements[0].parentNode.removeChild(elements[0]);
      }
  }
  
  const hideElement = function(className) {
      const elements = document.getElementsByClassName(className);
      for (let el of elements) {
          el.classList.add("hidden");
      }
  };
  
  const createInput = function(class_name, placeholder) {
      const input = document.createElement("input");
      input.className = class_name;
      input.type = "text",
      input.spellcheck = !1;
      input.autocomplete = "off";
      input.autocapitalize = "off";
      input.enterKeyHint = "search";
      input.placeholder = placeholder;
      return input;
  };
  
  const cssTemplate = function(class_name, template_type, options = {}) {
      const defaultConfigs = {
          menu_button: {
              base: {
                  display: "inline-block",
                  margin: "10px 0",
                  width: "200px",
                  height: "200px",
                  "pointer-events": "auto",
                  "background-color": "#112052",
                  border: "none",
                  position: "relative",
                  "clip-path": "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                  color: "white",
                  "font-size": "27px",
              },
              nested: {
                  img: {
                      margin: "40px 40px 0 40px",
                      width: "96px",
                      height: "96px",
                      transition: "transform 0.2s ease-in-out",
                  },
              },
              hover: {
                  "__CLASS__:not(:disabled):hover > img": {
                      transform: "translateY(-10px)",
                  },
                  "__CLASS__::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      width: "0",
                      "border-bottom": "2px solid white",
                      height: "100%",
                      "background-color": "#334b77",
                      transition: "width 0.1s ease-in-out",
                      "z-index": "-1",
                  },
                  "__CLASS__:not(:disabled):hover::after": {
                      width: "100%",
                  },
              },
          },
          menu_button_small: {
              base: {
                  padding: "6px 12px",
                  margin: "0",
                  "pointer-events": "auto",
                  "background-color": "#112052",
                  border: "none",
                  position: "relative",
                  "clip-path": "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
                  color: "white",
                  "font-size": "22px",
              },
              nested: {
                  img: {
                      "vertical-align": "middle",
                      width: "24px",
                      height: "24px",
                  },
              },
              hover: {
                  "__CLASS__::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      width: "0",
                      "border-bottom": "2px solid white",
                      height: "100%",
                      "background-color": "#334b77",
                      transition: "width 0.1s ease-in-out",
                      "z-index": "-1",
                  },
                  "__CLASS__:not(:disabled):hover::after": {
                      width: "100%",
                  },
              },
          },
          nickname_input: {
              base: {
                  display: "block",
                  margin: "0",
                  padding: "0.25em",
                  "box-sizing": "border-box",
                  width: "100%",
                  color: "white",
                  "font-size": "36px",
                  "font-weight": "normal",
                  "clip-path": "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                  border: "none",
                  "background-color": "#192042",
              },
          },
          search_input: {
              base: {
                  margin: "8px -10px",
                  padding: "0 20px",
                  "text-indent": "2px",
                  width: "100%",
                  color: "white",
                  "font-size": "24px",
                  "font-weight": "bold",
                  "clip-path": "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                  border: "none",
                  "background-color": "#192042",
                  "flex-grow": "1",
              },
          },
      };
  
      const config = defaultConfigs[template_type];
      if (!config) throw new Error(`Unknown template: ${template_type}`);
      
      const hasExplicitSections = "base" in options || "nested" in options || "hover" in options;
  
  
      const userBase = hasExplicitSections ? options.base || {} : options;
      const userNested = hasExplicitSections ? options.nested || {} : {};
      const userHover = hasExplicitSections ? options.hover || {} : {};
      
      const mergedBase = { ...config.base, ...userBase };
      const mergedNested = { ...config.nested, ...userNested };
      const mergedHover = { ...config.hover, ...userHover };
  
       const toCSS = (selector, styles) =>
      `${selector} {\n${Object.entries(styles)
        .map(([key, value]) => {
          const kebab = key.includes("-")
            ? key
            : key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
          return `  ${kebab}: ${value};`;
        })
        .join("\n")}\n}`;
  
      // Helper function to resolve dynamic class name in hover selectors
      const resolveSelectors = (selectorsObj, className) => {
        const resolved = {};
        for (const [selector, styles] of Object.entries(selectorsObj)) {
          const newSelector = selector.replace(/__CLASS__/g, `.${className}`);
          resolved[newSelector] = styles;
        }
        return resolved;
      };
  
      // Apply class name to hover selectors
      const resolvedHover = resolveSelectors(mergedHover, class_name);
  
      // Generate CSS for base, nested, and hover sections
      const cssChunks = [toCSS(`.${class_name}`, mergedBase)];
  
      for (const [subSelector, styles] of Object.entries(mergedNested)) {
          cssChunks.push(toCSS(`.${class_name} ${subSelector}`, styles));
      }
  
      for (const [selector, styles] of Object.entries(resolvedHover)) {
          if (selector.startsWith("@media")) {
            const mediaContent = Object.entries(styles)
              .map(([innerSel, innerStyles]) => toCSS(innerSel, innerStyles))
              .join("\n\n");
            cssChunks.push(`${selector} {\n${mediaContent.replace(/^/gm, "  ")}\n}`);
          } else {
            cssChunks.push(toCSS(selector, styles));
          }
      }
  
      
      return cssChunks.join("\n\n");
  };

  init = function(polyModLoader) {};
}


export let polyMod = new puiMod();
