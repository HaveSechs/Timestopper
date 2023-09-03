class UV {
    constructor () {
        this.open_ = false;
    }

    manager () {
        if (this._open) {
            document.getElementById("app").innerHTML = "";
            this._open = false;
        } else {
            this.open();
            this._open = true;
        }
    }

    open () {
        document.getElementById("app").innerHTML = `<iframe id="uv" src="https://69.eightgrade.com/" height=${window.screen.availHeight * 0.825} width=${window.screen.availWidth * 0.825}>
</iframe>`
// <button id="back">Back to home</button>`
        // const back = document.getElementById("back");
        // back.addEventListener("click", function (event) {
            //document.getElementById("uv").src = "https://69.eightgrade.com/";
        // })
    }
}

const uv = new UV();
const uvB = document.getElementById("uvButton");
uvB.addEventListener("click", function (event) { uv.manager() });