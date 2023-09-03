class RH {
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
        document.getElementById("app").innerHTML = `<iframe id="rh" src="https://edu.kolody.net/" height=${window.screen.availHeight * 0.825} width=${window.screen.availWidth * 0.825}>
</iframe>`
    }
}

const rh = new RH();
const rhB = document.getElementById("rhButton");
rhB.addEventListener("click", function (event) { rh.manager() });