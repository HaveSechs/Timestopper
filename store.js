import { download_app } from "./timestopper.js"

class Store {
    constructor () {
        this.open_ = false;
        this.elems = [];
    }

    async manager () {
        if (this.open_) {
            const frame = document.getElementById("app");
            const evens = ["click", "change"];
            frame.innerHTML = "";
            frame.removeAttribute("style");

            // o(n^3) lmao
            for (let e = 0; e < this.elems.length; e++) {
                for (let t = 0; t < evens.length; t++) {
                    try {
                        const stalkers = getEventListeners(this.elems[e], evens[t]);
    
                        for  (let s = 0; s < stalkers.length; s++) {
                            this.elems[e].removeEventListener(evens[t], s.listener);
                        }
                    } catch {}
                }
            }
            
            this.open_ = false;
        } else {
            this.open_ = true;
            this.open();
        }
    }

    async open () {
        const frame = document.getElementById("app");
        frame.style.height = document.body.scrollHeight - 50;
        frame.style.padding = "10px";
        frame.style.color = "white";
        frame.style.fontFamily = "monospace";
        frame.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        
        frame.innerHTML = `<h1>Store</h1>`;

        const res = await fetch("/apps.json");
        const data = await res.json();

        for (let i = 0; i < data.apps.length; i++) {
            frame.innerHTML += `<button id="app-${i}"><img src="${data.apps[i].manifest.icon}" height=75px><br><b>${data.apps[i].name}</b><br>${data.apps[i].desc}</button>`;
            this.elems.push(`app-${i}`);
            document.getElementById(`app-${i}`).onclick = async function (event) {
                alert(data.apps[i].name);
                await download_app(data.apps[i].manifest);
                location.reload();
            }
            alert(document.getElementById(`app-0`).onclick);
        }
    }
}

const store = new Store();
var sbutton = document.getElementById("storeButton");
sbutton.addEventListener("click", function (event) { store.manager() });