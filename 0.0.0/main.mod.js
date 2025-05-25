import { PolyMod, MixinType } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";

class puiMod extends PolyMod {  

  
  init = function(polyModLoader) {

    
    this.uiButtons = [];
    this.uiTabs = [];
    
    this.addMenuButton = function(image_path, text, onClick, order=null) {
        const button = document.createElement("button");
        button.className = "button button-image";
        button.innerHTML = `<img src="${image_path}">`;
    
    
        const w = document.createElement("p");
        w.textContent = text;
        button.appendChild(w);
    
        registerElement("mnu", button, onClick, order);
    };
    
    this.addMenuTab = function(text, image_path, onClick) {
        uiTabs.push([text,image_path,onClick]);  
    };
    
    this.registerElement = function(id, element, onClick, extras=null) {
        uiButtons.push([id, element, onClick, extras]);
        console.log(uiButtons);
    };
    
    
    this.createTabs = function(parent, audio, onclick) {
        for (let i = 0; i < uiTabs.length; i++) {
            const button = document.createElement("button");
            button.className = `button ${uiTabs[i][0].toLowerCase()}`;
            
            button.append(document.createTextNode(`${uiTabs[i][0]} tracks`));
            
            const cover = document.createElement("div");
            cover.className = "cover";
            button.prepend(cover);
    
            const style = document.createElement("style");
            style.textContent = `button.${uiTabs[i][0].toLowerCase()}::before {\n\tbackground-image: url(${uiTabs[i][1]});\n}`;
            document.head.appendChild(style);
    
            uiTabs[i].push(button);
        }
    };
    


      
    polyModLoader.registerFuncMixin("hD", MixinType.TAIL, () => {
      const subdata = uiButtons.filter(arr => arr[0] === "mnu");
      subdata.forEach((item) => {
          console.log(item);

          item[1].addEventListener("click",() => {
              n.playUIClick();
              item[2]();
          });
          
          wD(this, nD, "f").appendChild(item[1]);
          
          if (item[3] && Number.isInteger(item[3])) {
              wD(this, iD, "f").splice(item[3]-1,0,item[1]);
          } else {
              wD(this, iD, "f").push(item[1]);
          };
      });
    });
    polyModLoader.registerFuncMixin("$k", MixinType.INSERT, "Kk(this, Ck, "f").prepend(m),", () => {
      createTabs();
      uiTabs.forEach((item) => {
          const button = item[3];
          button.addEventListener("click", ( () => {
              Kk(this, wk, "f").playUIClick(),
              item[2]();
          }));

         u.appendChild(button);
      });
    };
  });
};


export let polyMod = new puiMod();
