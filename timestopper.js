// checks everything is there for lc
export async function check_localstorage () {
    if (localStorage.backgroundImage === undefined) {
        localStorage.backgroundImage = "";
    }

    if (localStorage.backgroundColor === undefined) {
        localStorage.backgroundColor = "#000080";
    }

    if (localStorage.apps === undefined) {
        localStorage.apps = JSON.stringify([
            {url: "apps/settings.js", name: "Settings", icon: "assets/images/settings.png"},
            {url: "apps/store.js", name: "Store", icon: "assets/images/store.png"}
        ]);
    }

    if (localStorage.title === undefined) {
        localStorage.title = "Timestopper \"OS\""
    }
}

// sets background
export async function set_background () {
    var image = localStorage.backgroundImage;
    var color = localStorage.backgroundColor;

    if (image === "") {
        document.body.style.backgroundColor = color;
    } else {
        document.body.style.backgroundImage = `url('${image}')`;
        document.body.style.backgroundSize = "cover";
    }
}

// loads new app
export async function download_app (data) {
    var apps = JSON.parse(localStorage.apps);
    apps.push({
        url: data.url, name: data.name, icon: data.icon
    })
    localStorage.apps = JSON.stringify(apps);
}

// deletes app
export async function delete_app (index) {
    var apps = JSON.parse(localStorage.apps);
    apps.splice(index, 1);
    localStorage.apps = JSON.stringify(apps);
}

// loadnig function
export async function load () {
    await check_localstorage();
    await set_background();
    document.title = localStorage.title;

    document.getElementById("bar").innerHTML = "";
    
    // should be a list of manifests
    var apps = JSON.parse(localStorage.apps);
    for (let a = 0; a < apps.length; a++) {
        try {
            var app = document.createElement("script");
            app.defer = true;
            app.type = "module";
            app.src = apps[a].url;
    
            console.log(a);
            
            document.getElementById("bar").innerHTML += `<button id="${app.src.substring(app.src.lastIndexOf('/') + 1).split('.js')[0]}Button">
        <img src="${apps[a].icon}" height=50px>
    </button>`
        } catch {}

        document.head.appendChild(app);
    }
}

(async () => {
    await load();
})();