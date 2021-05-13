class myInput extends HTMLInputElement {

    constructor() {

        super();
        this._tooltipContainer = '<p> tooltip text </p>';

        this.style.background = 'red'
        this.innerHTML = `<h1 id="tooltip" ></h1>`


    }




    connectedCallback(){
        this._tooltipContainer = document.querySelector('#tooltip')
       this.addEventListener('mouseenter', this._showTooltip.bind(this));
       // this.addEventListener('mouseleave', this._hideTooltip.bind(this));
    }

    _showTooltip() {
        const el =  document.createElement('p')
        el.innerText = 'element'
        //.appendChild(el)
        const div = document.getElementById('my-input-div')
        div.appendChild(this._tooltipContainer)
        //this.shadowRoot.querySelector('#hide').style.display = 'flex';
    }

    _hideTooltip(){
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}
customElements.define("my-input", myInput, { extends: "input" });
