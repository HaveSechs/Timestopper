// https://www.gpt-ua.click/
class GPT {
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

const gpt = new GPT();
const gptB = document.getElementById("gptButton");
gptB.addEventListener("click", function (event) { gpt.manager() });