class IS {
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
        document.getElementById("app").innerHTML = `<iframe id="is" src="https://interstellars.games/photography" height=${window.screen.availHeight * 0.825} width=${window.screen.availWidth * 0.825}>
</iframe>
<button id="back">Back to home</button>`
        const back = document.getElementById("back");
        back.addEventListener("click", function (event) {
            document.getElementById("is").src = "https://interstellars.games/photography";
        })
    }
}

const is = new IS();
const isB = document.getElementById("isButton");
isB.addEventListener("click", function (event) { is.manager() });