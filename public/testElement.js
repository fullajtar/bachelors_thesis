class PlasticButton extends HTMLButtonElement {
    constructor() {
        super();

        this.addEventListener("click", () => {
            const el = document.createElement('p')
            el.innerText = 'tooltip'
            document.getElementById('test').appendChild(el)
        });

    }

    connectedCallback(){
    }
}customElements.define("plastic-button", PlasticButton, { extends: "button" });
