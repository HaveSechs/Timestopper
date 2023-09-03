import { delete_app, set_background, load } from "../timestopper.js"

// example app (settings)
class Settings {
    // icon should be base64 image
    constructor () {
        this.open_ = false;
        this.elems = ["newImage", "color", "hex", "title", "tc", "fav"];
    }

    // 2 methods needed
    install () {
        
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
        
        frame.innerHTML = `<h1>Settings</h1>
<h2>Cloaking</h2>
Title: <input id="title"><button id="tc">Change</button><br>
Favicon: <input type='file' id="fav"><br><br>
<button id="pop">Open popup</button><br>
<button id="new">Open tab</button>
<h2>Theme</h2>
Background Image: <input type='file' id="newImage"><br>
Background Color: <input id="hex"><button id="color">Change</button><br>
<h2>Apps</h2>
<div id="installedApps"></div>
<h2>Danger!!!</h2>
<button id="lsc">Reset</button>`;

        const image = document.getElementById("newImage");
        const title = document.getElementById("tc");
        const color = document.getElementById("color");
        const installed = document.getElementById("installedApps");
        const reset = document.getElementById("lsc");
        const pup = document.getElementById("pop");
        const tab = document.getElementById("new");

        reset.style.color = "white";
        reset.style.backgroundColor = "red";
        
        const apps = JSON.parse(localStorage.apps);

        pup.addEventListener("click", function () {
            var win = window.open("","_blank","popup=yes"); win.document.write(`<!DOCTYPE html> <html> <body> <iframe src="${atob('aHR0cHM6Ly90aW1lc3RvcHBlci5zYWNoc3RoZWJhc2VkLnJlcGwuY28v')}"></iframe> <style>* {margin: 0;padding: 0;overflow-y: hidden;}iframe {width: 100%;height: 100vh;border: none;}</style> </body> </html>`);
        })

        tab.addEventListener("click", function () {
            var win = window.open("","_blank","popup=no"); win.document.write(`<!DOCTYPE html> <html> <body> <iframe src="${atob('aHR0cHM6Ly90aW1lc3RvcHBlci5zYWNoc3RoZWJhc2VkLnJlcGwuY28v')}"></iframe> <style>* {margin: 0;padding: 0;overflow-y: hidden;}iframe {width: 100%;height: 100vh;border: none;}</style> </body> </html>`);
        })
        
        image.addEventListener("change",  function (event) {
            var background = image.files[0];

            const reader = new FileReader();

            reader.onload = async function(event) {
                const b64 = event.target.result;
                localStorage.backgroundImage = b64;
                localStorage.backgroundColor = "";
                await set_background();
            };
            reader.readAsDataURL(background);
        })

        color.addEventListener("click", async function (event) {
            var newColor = document.getElementById("hex").value;

            localStorage.backgroundImage = "";
            localStorage.backgroundColor = newColor;
            await set_background();
        })

        for (let a = 0; a < apps.length; a++) {
            installed.innerHTML += `<button id="app-${a}">
    <img src="${apps[a].icon}" height=50px><br>
    ${apps[a].name}
</button>`
            this.elems.push(`apps-${a}`);
        }

        tc.addEventListener("click", function (event) {
            document.title = document.getElementById("title").value;
            localStorage.title = document.getElementById("title").value;
        })

        reset.addEventListener("click", function (event) {
            localStorage.clear();
            location.reload();
        })

        installed.innerHTML += "<br>";

        for (let a = 0; a < apps.length; a++) {
            installed.innerHTML += `<button id="app-x-${a}">
    Delete ${apps[a].name}
</button>`
            const x = document.getElementById(`app-x-${a}`);
            this.elems.push(`app-x-${a}`);
            x.style.color = "white";
            x.style.backgroundColor = "red";
            x.style.width = document.getElementById(`app-${a}`).offsetWidth;
        }

        frame.addEventListener("click", async function(event) {
            if (event.target.tagName === "BUTTON" && event.target.id.startsWith("app-x-")) {
                var index = parseInt(event.target.id.split('-')[2]);
                await delete_app(index);
                location.reload();
            }
        });
    }
}

const settings = new Settings();

// id will be file name - ".js" (name.js would be name) and then + Button
var sbutton = document.getElementById("settingsButton");
sbutton.addEventListener("click", function (event) { settings.manager() });