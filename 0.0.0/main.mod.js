import { PolyMod, MixinType } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";

class puiMod extends PolyMod {  

  init = function(polyModLoader) {

    this.uiButtons = [];
    this.uiTabs = [];
    
    this.addMenuButton = function(image_path, text, onClick, order = null) {
      const button = document.createElement("button");
      button.className = "button button-image";
      button.innerHTML = `<img src="${image_path}">`;
  
      const w = document.createElement("p");
      w.textContent = text;
      button.appendChild(w);
  
      this.registerElement("mnu", button, onClick, order);
    };
    
    this.addMenuTab = function(text, image_path, onClick) {
      this.uiTabs.push([text, image_path, onClick]);  
    };
    
    this.registerElement = function(id, element, onClick, extras = null) {
      this.uiButtons.push([id, element, onClick, extras]);
      console.log(this.uiButtons);
    };
    
    this.createTabs = function(parent, audio, onclick) {
      for (let i = 0; i < this.uiTabs.length; i++) {
        const button = document.createElement("button");
        button.className = `button ${this.uiTabs[i][0].toLowerCase()}`;
        
        button.append(document.createTextNode(`${this.uiTabs[i][0]} tracks`));
        
        const cover = document.createElement("div");
        cover.className = "cover";
        button.prepend(cover);
  
        const style = document.createElement("style");
        style.textContent = `button.${this.uiTabs[i][0].toLowerCase()}::before {\n\tbackground-image: url(${this.uiTabs[i][1]});\n}`;
        document.head.appendChild(style);
  
        this.uiTabs[i].push(button);
      }
    };

    polyModLoader.registerFuncMixin("hD.prototype", MixinType.TAIL, () => {
      const subdata = this.uiButtons.filter(arr => arr[0] === "mnu");
      subdata.forEach((item) => {
        item[1].addEventListener("click",() => {
            n.playUIClick();
            item[2]();
        });

        
        if (Number.isInteger(item[3]) && wD(this, iD, "f").length == item[3]) {
            wD(this, nD, "f").appendChild(item[1]);
        } else {
            wD(this, nD, "f").insertBefore(item[1], wD(this, nD, "f").children[item[3]-1]);
        }
        
        if (item[3] && Number.isInteger(item[3])) {
            wD(this, iD, "f").splice(item[3]-1,0,item[1]);
        } else {
            wD(this, iD, "f").push(item[1]);
        }

        
    });
    });
    
    polyModLoader.registerFuncMixin("$k.prototype", MixinType.INSERT, 'Kk(this, Ck, "f").prepend(m);', () => {
      this.createTabs();
      this.uiTabs.forEach((item) => {
        const button = item[3];
        button.addEventListener("click", () => {
          Kk(this, wk, "f").playUIClick();
          item[2]();
        });
        u.appendChild(button);
      });
    });

  }

}

export let polyMod = new puiMod();
