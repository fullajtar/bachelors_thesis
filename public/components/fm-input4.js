class FmInput4 extends HTMLInputElement {
    constructor() {
        // Always call super first in constructor
        super();
        //this.attachShadow({ mode: 'open' }); //does not support
        this.innerHTML = ` 
        <style>      
            @import "/tailwind.css";
            input{
            position: relative;
            color: red;
            background-color: red;
            }
            
            label{
            position: absolute;
            z-index: 10;
            left: 0;
            top: 0;
            }
        </style>
        <label for="">test label</label>
`;

        // Element functionality written in here
        this.addEventListener("click", () => {
        });
    }

    connectedCallback() {
        this.classList = "relative pl-1.5 py-1.5 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border border-red-700"
    }
}customElements.define('fm-input4', FmInput4, {extends: "input"});