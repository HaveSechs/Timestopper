// https://www.gpt-ua.click/
class CGPT {
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
        document.getElementById("app").innerHTML = `<iframe id="uv" src="https://www.gpt-ua.click/" height=${window.screen.availHeight * 0.825} width=${window.screen.availWidth * 0.825}>
</iframe>`
    }
}

const cgpt = new CGPT();
const cgptB = document.getElementById("cgptButton");
cgptB.addEventListener("click", function (event) { cgpt.manager() });